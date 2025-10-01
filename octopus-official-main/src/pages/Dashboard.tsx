import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, UserX, Building } from 'lucide-react'

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const employees = useSelector((state: RootState) => state.employee.employees)
  
  const activeEmployees = employees.filter(emp => emp.status === 'active').length
  const bannedEmployees = employees.filter(emp => emp.status === 'banned').length

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      description: "All registered employees"
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      icon: UserCheck,
      description: "Currently active staff"
    },
    {
      title: "Banned Employees",
      value: bannedEmployees,
      icon: UserX,
      description: "Suspended accounts"
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
            <Card key={index} className="bg-gradient-card hover:shadow-brand transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-accent rounded-full" />
                <p className="text-sm">System initialized successfully</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <p className="text-sm">Dashboard loaded</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                • Manage employee records
              </p>
              <p className="text-sm text-muted-foreground">
                • View detailed employee information
              </p>
              <p className="text-sm text-muted-foreground">
                • Add new team members
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard