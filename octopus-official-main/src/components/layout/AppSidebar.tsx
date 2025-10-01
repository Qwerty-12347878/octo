import { Users, ChevronRight, HelpCircle, Book } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import logo from '@/assets/logo-light.png'

const menuItems = [
  { title: "Employee Details", url: "/dashboard/employees", icon: Users },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const currentPath = location.pathname
  const isCollapsed = state === 'collapsed'

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/')
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent/10 text-accent font-medium border-r-2 border-accent" : "hover:bg-muted/50"

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <img 
            src={logo} 
            alt="Octopus Technologies" 
            className="h-8 w-auto flex-shrink-0"
          />
          {!isCollapsed && (
            <span className="font-semibold text-lg text-primary">Octopus</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {user && !isCollapsed && (
          <div className="p-4">
            <div className="flex items-center space-x-3 bg-muted/30 rounded-lg p-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-orange-500 text-white text-sm font-medium">
                  M
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: linkIsActive }) => `
                        flex items-center justify-between px-3 py-2 rounded-md text-sm
                        ${linkIsActive || isActive(item.url) ? 
                          "bg-accent/10 text-accent font-medium border-r-2 border-accent" : 
                          "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                        {!isCollapsed && <span>{item.title}</span>}
                      </div>
                      {!isCollapsed && <ChevronRight className="h-4 w-4" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-4">
        {!isCollapsed && user && (
          <div className="text-sm">
            <p className="font-medium text-foreground">Hi, {user.firstName} {user.lastName}</p>
            <p className="text-muted-foreground text-xs mt-1">Need help?</p>
            <p className="text-muted-foreground text-xs">Please check our docs</p>
          </div>
        )}
        
        {!isCollapsed && (
          <Button 
            variant="outline" 
            className="w-full bg-accent hover:bg-accent/90 text-white border-accent"
          >
            <Book className="mr-2 h-4 w-4" />
            Documentation
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}