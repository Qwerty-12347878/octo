import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { addEmployee } from '@/store/slices/employeeSlice'
import { ArrowLeft, UserPlus, Save } from 'lucide-react'

const CreateEmployee = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    uniqueId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    dateOfJoining: '',
    state: '',
    city: '',
    status: 'active' as 'active' | 'banned',
    totalExperience: 0,
    gender: '' as 'male' | 'female' | 'other' | '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    currentAddress: '',
    permanentAddress: '',
    currentSalary: 0,
    highestQualification: '',
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    designation: '',
    technologies: '',
    note: '',
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.uniqueId) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      })
      return
    }

    if (!formData.gender) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select a gender.",
      })
      return
    }

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Account numbers do not match.",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newEmployee = {
        id: Date.now().toString(),
        ...formData,
        gender: formData.gender as 'male' | 'female' | 'other',
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      }
      
      dispatch(addEmployee(newEmployee))
      toast({
        title: "Employee Created",
        description: `${formData.firstName} ${formData.lastName} has been added successfully.`,
      })
      navigate('/dashboard/employees')
      setLoading(false)
    }, 1000)
  }

  const formSections = [
    {
      title: "Personal Information",
      fields: [
        { id: 'uniqueId', label: 'Unique ID', type: 'text', required: true },
        { id: 'firstName', label: 'First Name', type: 'text', required: true },
        { id: 'middleName', label: 'Middle Name', type: 'text' },
        { id: 'lastName', label: 'Last Name', type: 'text', required: true },
        { id: 'email', label: 'Email Address', type: 'email', required: true },
        { id: 'phoneNumber', label: 'Phone Number', type: 'tel' },
        { id: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
        { id: 'gender', label: 'Gender', type: 'select', options: ['male', 'female', 'other'], required: true },
      ]
    },
    {
      title: "Employment Details",
      fields: [
        { id: 'dateOfJoining', label: 'Date of Joining', type: 'date' },
        { id: 'designation', label: 'Designation', type: 'text' },
        { id: 'totalExperience', label: 'Total Years of Experience', type: 'number' },
        { id: 'currentSalary', label: 'Current Salary', type: 'number' },
        { id: 'highestQualification', label: 'Highest Qualification', type: 'text' },
        { id: 'technologies', label: 'Technologies (comma-separated)', type: 'text' },
        { id: 'status', label: 'Status', type: 'select', options: ['active', 'banned'] },
      ]
    },
    {
      title: "Contact Information",
      fields: [
        { id: 'state', label: 'State', type: 'text' },
        { id: 'city', label: 'City', type: 'text' },
        { id: 'currentAddress', label: 'Current Address', type: 'textarea' },
        { id: 'permanentAddress', label: 'Permanent Address', type: 'textarea' },
        { id: 'emergencyContactName', label: 'Emergency Contact Name', type: 'text' },
        { id: 'emergencyContactNumber', label: 'Emergency Contact Number', type: 'tel' },
      ]
    },
    {
      title: "Bank Details",
      fields: [
        { id: 'accountHolderName', label: 'Account Holder Name', type: 'text' },
        { id: 'bankName', label: 'Bank Name', type: 'text' },
        { id: 'accountNumber', label: 'Account Number', type: 'text' },
        { id: 'confirmAccountNumber', label: 'Confirm Account Number', type: 'text' },
        { id: 'ifscCode', label: 'IFSC Code', type: 'text' },
      ]
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/employees')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Employees
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <UserPlus className="h-8 w-8 text-primary" />
            Create a New Employee
          </h1>
          <p className="text-muted-foreground">
            Fill in all the required information to add a new team member
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {formSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="bg-gradient-card">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>
                  Enter the {section.title.toLowerCase()} for the new employee
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>
                      {field.label} {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    
                    {field.type === 'select' ? (
                      <Select
                        onValueChange={(value) => handleInputChange(field.id, value)}
                        value={formData[field.id as keyof typeof formData] as string}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        value={formData[field.id as keyof typeof formData] as string}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        rows={3}
                        required={field.required}
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note Section */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>
              Any additional information about the employee
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                rows={4}
                placeholder="Enter any additional notes about the employee..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/dashboard/employees')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-brand hover:shadow-glow transition-all duration-300"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Creating User...' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateEmployee