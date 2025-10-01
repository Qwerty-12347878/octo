import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Building } from "lucide-react"
import { setEmployees } from "@/store/slices/employeeSlice"  // <-- make sure you have this action

const Dashboard = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const employees = useSelector((state: RootState) => state.employee.employees)

  // fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees") // update with your API base
        const data = await res.json()
        dispatch(setEmployees(data))
      } catch (error) {
        console.error("Failed to fetch employees:", error)
      }
    }

    fetchEmployees()
  }, [dispatch])

  // ✅ match schema (your schema had "active" and "banned")
  const activeEmployees = employees.filter(emp => emp.status === "active").length
  const bannedEmployees = employees.filter(emp => emp.status === "banned").length

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      description: "All registered employees",
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      icon: UserCheck,
      description: "Currently active staff",
    },
    {
      title: "Inactive Employees",
      value: bannedEmployees,
      icon: UserX,
      description: "Suspended accounts",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName}! Here's what's happening at Octopus Technologies.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Octopus Technologies</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="bg-gradient-card hover:shadow-brand transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
