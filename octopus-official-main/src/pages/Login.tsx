import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { loginStart, loginSuccess } from '@/store/slices/authSlice'
import logo from '@/assets/logo-light.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      })
      return
    }

    setLoading(true)
    dispatch(loginStart())

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: email,
        designation: 'HR Manager'
      }
      
      dispatch(loginSuccess(mockUser))
      toast({
        title: "Login Successful",
        description: "Welcome back to Octopus Technologies!",
      })
      navigate('/dashboard')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img 
            src={logo} 
            alt="Octopus Technologies" 
            className="mx-auto h-16 w-auto mb-6"
          />
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>

        <Card className="shadow-brand border-0 bg-gradient-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@octopus.tech"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-brand hover:shadow-glow transition-all duration-300" 
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login