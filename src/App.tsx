import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegisterForm from "./components/RegisterForm";
import Login from "./pages/Login";
import MBTITest from "./components/MBTITest";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Majors from "./pages/Majors";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageToggle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={
              <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
                <RegisterForm />
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/mbti-test" element={<MBTITest />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/majors" element={<Majors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;