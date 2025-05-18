
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";
import { HealthcareProvider } from "@/contexts/HealthcareContext";
import { AIProvider } from "@/contexts/AIContext";

import DashboardLayout from "@/components/DashboardLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Prescriptions from "@/pages/Prescriptions";
import Appointments from "@/pages/Appointments";
import Documents from "@/pages/Documents";
import Chat from "@/pages/Chat";
import Patients from "@/pages/Patients";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <HealthcareProvider>
          <AIProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected Routes */}
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/prescriptions" element={<Prescriptions />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/chat" element={<Chat />} />
                  
                  {/* Patient-specific routes */}
                  <Route path="/documents" element={<Documents />} />
                  
                  {/* Doctor-specific routes */}
                  <Route path="/patients" element={<Patients />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AIProvider>
        </HealthcareProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
