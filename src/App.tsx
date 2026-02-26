import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Principles from "./pages/Principles";
import FAQ from "./pages/FAQ";
import Transaction from "./pages/Transaction";
import Auth from "./pages/Auth";
import Vote from "./pages/Vote";
import Vessel from "./pages/Vessel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/principles" element={<Principles />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
