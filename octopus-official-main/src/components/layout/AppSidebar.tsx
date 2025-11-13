// import {
//   Users,
//   ChevronRight,
//   Book,
//   LogOut,
//   LayoutDashboard,
// } from "lucide-react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/store/store";
// import { logout } from "@/store/slices/authSlice";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import logo from "@/assets/logo-light.png";

// const menuItems = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Employee Details",
//     url: "/dashboard/employees",
//     icon: Users,
//   },
// ];

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const dispatch = useDispatch();
//   const isCollapsed = state === "collapsed";

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const getUserInitials = () => {
//     if (!user || !user.firstName) return "U";
//     const firstChar = user.firstName.charAt(0) || "U";
//     const lastChar = user.lastName ? user.lastName.charAt(0) : "";
//     return `${firstChar}${lastChar}`.toUpperCase();
//   };

//   const getUserDisplayName = () => {
//     if (!user || !user.firstName) return "User Profile";
//     return `${user.firstName} ${user.lastName || ""}`.trim();
//   };

//   const getUserDesignation = () => {
//     if (!user || !user.designation) return "Admin";
//     return user.designation;
//   };

//   return (
//     <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
//       <SidebarHeader className="p-4">
//         <div className="flex items-center space-x-3">
//           <img
//             src={logo}
//             alt="Octopus Technologies"
//             className="h-8 w-auto flex-shrink-0 mx-auto"
//           />
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         {/* User Info */}
//         {!isCollapsed && (
//           <div className="p-4">
//             <div className="flex items-center space-x-3 bg-muted/30 rounded-lg p-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarFallback className="bg-orange-500 text-white text-sm font-medium">
//                   {getUserInitials()}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-foreground truncate">
//                   {getUserDisplayName()}
//                 </p>
//                 <p className="text-xs text-muted-foreground truncate">
//                   {getUserDesignation()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation Menu */}
//         <SidebarGroup>
//           {!isCollapsed && (
//             <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
//               MAIN NAVIGATION
//             </SidebarGroupLabel>
//           )}
//           <SidebarGroupContent>
//             <SidebarMenu className="px-2">
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <NavLink
//                       to={item.url}
//                       className={({ isActive }) => `
//                         flex items-center justify-between px-3 py-2 rounded-md text-sm
//                         ${
//                           isActive
//                             ? "bg-accent/10 text-accent font-medium border-r-2 border-accent"
//                             : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
//                         }
//                       `}
//                     >
//                       <div className="flex items-center">
//                         {/* <div
//                           className={`w-2 h-2 rounded-full bg-accent ${
//                             isCollapsed ? "mx-auto" : "mr-3"
//                           }`}
//                         ></div> */}
//                         {!isCollapsed && <span>{item.title}</span>}
//                       </div>
//                       {/* {!isCollapsed && <ChevronRight className="h-4 w-4" />} */}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="p-4 space-y-2">
//         {/* Documentation Button */}
//         {!isCollapsed && (
//           <Button
//             variant="outline"
//             className="w-full"
//             onClick={() => window.open("/docs", "_blank")}
//           >
//             <Book className="mr-2 h-4 w-4" />
//             Documentation
//           </Button>
//         )}

//         {/* Logout Button */}
//         <Button
//           variant={isCollapsed ? "ghost" : "outline"}
//           size={isCollapsed ? "icon" : "default"}
//           className={`${
//             isCollapsed ? "w-8 h-8" : "w-full"
//           } text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200`}
//           onClick={handleLogout}
//           title="Logout"
//         >
//           <LogOut className="h-4 w-4" />
//           {!isCollapsed && <span className="ml-2">Logout</span>}
//         </Button>

//         {/* Help text */}
//         {!isCollapsed && (
//           <div className="text-center pt-2">
//             <p className="text-muted-foreground text-xs">
//               Need help? Contact support
//             </p>
//           </div>
//         )}
//       </SidebarFooter>
//     </Sidebar>
//   );
// }






import {
  Users,
 
  Book,
  LogOut,
  LayoutDashboard,
  Link as LinkIcon, // Add this import
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authSlice";
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logo from "@/assets/logo-light.png";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employee Details",
    url: "/dashboard/employees",
    icon: Users,
  },
  // Add this new item for Admin Generate URL
  {
    title: "Generate URLs",
    url: "/dashboard/AdminGenerateLink",
    icon: LinkIcon,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getUserInitials = () => {
    if (!user || !user.firstName) return "U";
    const firstChar = user.firstName.charAt(0) || "U";
    const lastChar = user.lastName ? user.lastName.charAt(0) : "";
    return `${firstChar}${lastChar}`.toUpperCase();
  };

  const getUserDisplayName = () => {
    if (!user || !user.firstName) return "User Profile";
    return `${user.firstName} ${user.lastName || ""}`.trim();
  };

  const getUserDesignation = () => {
    if (!user || !user.designation) return "Admin";
    return user.designation;
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Octopus Technologies"
            className="h-8 w-auto flex-shrink-0 mx-auto"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* User Info */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="flex items-center space-x-3 bg-muted/30 rounded-lg p-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-orange-500 text-white text-sm font-medium">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {getUserDesignation()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              MAIN NAVIGATION
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => `
                        flex items-center justify-between px-3 py-2 rounded-md text-sm
                        ${
                          isActive
                            ? "bg-accent/10 text-accent font-medium border-r-2 border-accent"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }
                      `}
                    >
                      <div className="flex items-center">
                        {/* <div
                          className={`w-2 h-2 rounded-full bg-accent ${
                            isCollapsed ? "mx-auto" : "mr-3"
                          }`}
                        ></div> */}
                        {!isCollapsed && <span>{item.title}</span>}
                      </div>
                      {/* {!isCollapsed && <ChevronRight className="h-4 w-4" />} */}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        {/* Documentation Button */}
        {!isCollapsed && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open("/docs", "_blank")}
          >
            <Book className="mr-2 h-4 w-4" />
            Documentation
          </Button>
        )}

        {/* Logout Button */}
        <Button
          variant={isCollapsed ? "ghost" : "outline"}
          size={isCollapsed ? "icon" : "default"}
          className={`${
            isCollapsed ? "w-8 h-8" : "w-full"
          } text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200`}
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>

        {/* Help text */}
        {!isCollapsed && (
          <div className="text-center pt-2">
            <p className="text-muted-foreground text-xs">
              Need help? Contact support
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}