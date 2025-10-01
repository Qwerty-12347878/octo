import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'
import logo from '@/assets/logo-light.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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

    try {
      setLoading(true)
      dispatch(loginStart())

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      console.log('Login API Response:', data)

      // Enhanced response handling for different backend structures
      let userData, tokens;

      // Handle different response structures
      if (data.user) {
        // Structure: { user: {...}, tokens: {...} }
        userData = data.user;
        tokens = data.tokens || data.token;
      } else if (data.data) {
        // Structure: { data: { user: {...}, tokens: {...} } }
        userData = data.data.user;
        tokens = data.data.tokens || data.data.token;
      } else {
        // Structure: { ...userFields, ...tokenFields }
        userData = data;
        tokens = {
          accessToken: data.accessToken || data.token,
          refreshToken: data.refreshToken
        };
      }

      // Extract user information with fallbacks
      const userName = userData.name || userData.firstName + ' ' + userData.lastName || 'User';
      const userEmail = userData.email || email;
      const userId = userData._id || userData.id;

      const accessToken = tokens?.accessToken || tokens?.token || data.accessToken || data.token;
      const refreshToken = tokens?.refreshToken || data.refreshToken;

      if (!accessToken) {
        throw new Error("No access token received from server")
      }

      if (!userId) {
        throw new Error("No user ID received from server")
      }

      // Safely extract first and last names
      let firstName = 'User';
      let lastName = '';

      if (userData.firstName && userData.lastName) {
        firstName = userData.firstName;
        lastName = userData.lastName;
      } else if (userData.name) {
        const nameParts = userName.split(' ');
        firstName = nameParts[0] || 'User';
        lastName = nameParts.slice(1).join(' ') || '';
      } else {
        firstName = 'User';
        lastName = '';
      }

      const user = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        email: userEmail,
        designation: userData.designation || userData.role || "Employee"
      }

      dispatch(loginSuccess({
        user,
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken || ''
        }
      }))

      toast({
        title: "Login Successful",
        description: "Welcome back to Octopus Technologies!",
      })

      navigate('/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      dispatch(loginFailure(error.message || "Login failed"))
      
      // More specific error messages
      let errorMessage = error.message || "Invalid email or password";
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.message?.includes('token')) {
        errorMessage = "Authentication error. Please try again.";
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address.",
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotPasswordEmail)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      })
      return
    }

    try {
      setForgotPasswordLoading(true)

      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email")
      }

      toast({
        title: "Reset Email Sent",
        description: "If an account exists with this email, you will receive password reset instructions.",
      })

      setIsDialogOpen(false)
      setForgotPasswordEmail('')
    } catch (error: any) {
      console.error('Forgot password error:', error)
      toast({
        variant: "destructive",
        title: "Failed to Send Reset Email",
        description: error.message || "Please try again later.",
      })
    } finally {
      setForgotPasswordLoading(false)
    }
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
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-primary font-medium hover:underline"
                        type="button"
                        disabled={loading}
                      >
                        Forgot Password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Reset Your Password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you instructions to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="forgot-password-email">Email Address</Label>
                          <Input
                            id="forgot-password-email"
                            type="email"
                            placeholder="john@octopus.tech"
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            required
                            disabled={forgotPasswordLoading}
                          />
                        </div>
                        <Button 
                          type="button"
                          className="w-full"
                          onClick={handleForgotPassword}
                          disabled={forgotPasswordLoading}
                        >
                          {forgotPasswordLoading ? 'Sending...' : 'Send Reset Instructions'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
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

            {/* Register link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link 
                to="/register" 
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login  