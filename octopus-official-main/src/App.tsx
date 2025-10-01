import { Provider } from 'react-redux'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />
}

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/create" element={<CreateEmployee />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
