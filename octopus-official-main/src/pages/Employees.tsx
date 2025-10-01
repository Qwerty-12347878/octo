import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { RootState } from '@/store/store'
import { setFilter, setCurrentPage, setEmployees } from '@/store/slices/employeeSlice'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Plus, Search, Users, Filter, MoreVertical, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Employee } from '@/store/slices/employeeSlice'
import { useNavigate } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const mockEmployees: Employee[] = [
  {
    id: '1',
    uniqueId: 'EMP001',
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    email: 'john.doe@octopus.tech',
    phoneNumber: '+1234567890',
    dateOfBirth: '1990-05-15',
    dateOfJoining: '2023-01-15',
    state: 'California',
    city: 'San Francisco',
    status: 'active',
    totalExperience: 5,
    gender: 'male',
    emergencyContactName: 'Jane Doe',
    emergencyContactNumber: '+1234567891',
    currentAddress: '123 Main St, San Francisco, CA',
    permanentAddress: '123 Main St, San Francisco, CA',
    currentSalary: 75000,
    highestQualification: 'Bachelor of Science',
    accountHolderName: 'John Michael Doe',
    bankName: 'Chase Bank',
    accountNumber: '1234567890',
    ifscCode: 'CHAS0001',
    designation: 'Software Developer',
    technologies: ['React', 'TypeScript', 'Node.js'],
    note: 'Excellent performer'
  },
  {
    id: '2',
    uniqueId: 'EMP002',
    firstName: 'Sarah',
    middleName: 'Jane',
    lastName: 'Smith',
    email: 'sarah.smith@octopus.tech',
    phoneNumber: '+1234567892',
    dateOfBirth: '1988-08-22',
    dateOfJoining: '2022-06-10',
    state: 'New York',
    city: 'New York',
    status: 'active',
    totalExperience: 7,
    gender: 'female',
    emergencyContactName: 'Robert Smith',
    emergencyContactNumber: '+1234567893',
    currentAddress: '456 Broadway, New York, NY',
    permanentAddress: '456 Broadway, New York, NY',
    currentSalary: 85000,
    highestQualification: 'Master of Science',
    accountHolderName: 'Sarah Jane Smith',
    bankName: 'Bank of America',
    accountNumber: '2345678901',
    ifscCode: 'BOFA0001',
    designation: 'Senior Developer',
    technologies: ['React', 'Python', 'AWS'],
    note: 'Team lead material'
  },
  {
    id: '3',
    uniqueId: 'EMP003',
    firstName: 'Mike',
    middleName: 'David',
    lastName: 'Johnson',
    email: 'mike.johnson@octopus.tech',
    phoneNumber: '+1234567894',
    dateOfBirth: '1985-12-03',
    dateOfJoining: '2021-03-20',
    state: 'Texas',
    city: 'Austin',
    status: 'banned',
    totalExperience: 10,
    gender: 'male',
    emergencyContactName: 'Linda Johnson',
    emergencyContactNumber: '+1234567895',
    currentAddress: '789 Oak St, Austin, TX',
    permanentAddress: '789 Oak St, Austin, TX',
    currentSalary: 95000,
    highestQualification: 'Master of Engineering',
    accountHolderName: 'Mike David Johnson',
    bankName: 'Wells Fargo',
    accountNumber: '3456789012',
    ifscCode: 'WELL0001',
    designation: 'DevOps Engineer',
    technologies: ['Docker', 'Kubernetes', 'AWS'],
    note: 'Currently suspended'
  }
]

const Employees = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { filteredEmployees, currentFilter, currentPage, pageSize } = useSelector(
    (state: RootState) => state.employee
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [designationFilter, setDesignationFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    // Initialize with mock data
    dispatch(setEmployees(mockEmployees))
  }, [dispatch])

  const handleFilterChange = (filter: 'all' | 'active' | 'banned') => {
    dispatch(setFilter(filter))
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const handleCreateEmployee = () => {
    navigate('/dashboard/employees/create')
  }

  const handleRowSelect = (employeeId: string) => {
    setSelectedRows(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
  }

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedEmployees.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedEmployees.map(emp => emp.id))
    }
  }

  // Filter employees based on search term and designation
  const searchFilteredEmployees = filteredEmployees.filter(employee => {
    const matchesSearch = employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.uniqueId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDesignation = designationFilter === 'all' || 
      employee.designation.toLowerCase().includes(designationFilter.toLowerCase())
    
    return matchesSearch && matchesDesignation
  })

  // Paginate employees
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedEmployees = searchFilteredEmployees.slice(startIndex, endIndex)
  const totalPages = Math.ceil(searchFilteredEmployees.length / rowsPerPage)

  const filterCounts = {
    all: mockEmployees.length,
    active: mockEmployees.filter(emp => emp.status === 'active').length,
    banned: mockEmployees.filter(emp => emp.status === 'banned').length,
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/employees">User</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee List</h1>
        </div>
        <Button 
          onClick={handleCreateEmployee}
          className="bg-accent hover:bg-accent/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New User
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 border-b">
        <Button
          variant={currentFilter === 'all' ? 'default' : 'ghost'}
          onClick={() => handleFilterChange('all')}
          className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
          data-active={currentFilter === 'all'}
        >
          All
        </Button>
        <Button
          variant={currentFilter === 'active' ? 'default' : 'ghost'}
          onClick={() => handleFilterChange('active')}
          className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
          data-active={currentFilter === 'active'}
        >
          Active
        </Button>
        <Button
          variant={currentFilter === 'banned' ? 'default' : 'ghost'}
          onClick={() => handleFilterChange('banned')}
          className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
          data-active={currentFilter === 'banned'}
        >
          Banned
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Designation</span>
            <Select value={designationFilter} onValueChange={setDesignationFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="software">Software Developer</SelectItem>
                <SelectItem value="senior">Senior Developer</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative w-full sm:w-64 ml-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Employee Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer">
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Technologies</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(employee.id)}
                    onCheckedChange={() => handleRowSelect(employee.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-xs">
                        {getInitials(employee.firstName, employee.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">
                      {employee.firstName} {employee.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {employee.technologies.slice(0, 2).map((tech, index) => (
                      <span key={index} className="text-sm text-muted-foreground">
                        {tech}{index < employee.technologies.slice(0, 2).length - 1 ? ',' : ''}
                      </span>
                    ))}
                    {employee.technologies.length > 2 && (
                      <span className="text-sm text-muted-foreground">...</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={employee.status === 'active' ? 'default' : 'destructive'}
                    className={employee.status === 'active' ? 'bg-accent hover:bg-accent' : ''}
                  >
                    {employee.status === 'active' ? 'Active' : 'Banned'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {searchFilteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No employees found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'No employees match your search criteria.' : 'No employees in this category.'}
          </p>
        </div>
      )}

      {/* Pagination */}
      {searchFilteredEmployees.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {startIndex + 1}-{Math.min(endIndex, searchFilteredEmployees.length)} of {searchFilteredEmployees.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees