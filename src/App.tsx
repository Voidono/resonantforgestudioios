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
import Dashboard from "./pages/Dashboard";
import AssetProduction from "./pages/AssetProduction";
import AssetClassification from "./pages/AssetClassification";
import DeveloperHub from "./pages/DeveloperHub";
import DeveloperRoster from "./pages/DeveloperRoster";
import AssetIntake from "./pages/AssetIntake";
import SubmissionConfirmation from "./pages/SubmissionConfirmation";
import OperationsHub from "./pages/OperationsHub";
import ContactTerminal from "./pages/ContactTerminal";
import AssetFinalReview from "./pages/AssetFinalReview";
import UnderConstruction from "./pages/UnderConstruction";
import CommunityHub from "./pages/CommunityHub";
import SystemsAnalysisHub from "./pages/SystemsAnalysisHub";
import SystemsAnalysisConfirmation from "./pages/SystemsAnalysisConfirmation";
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/principles" element={<Principles />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/asset-production" element={<AssetProduction />} />
            <Route path="/developer-hub" element={<DeveloperHub />} />
            <Route path="/developer-roster" element={<DeveloperRoster />} />
            <Route path="/asset-classification" element={<AssetClassification />} />
            <Route path="/asset-intake" element={<AssetIntake />} />
            <Route path="/submission-confirmation" element={<SubmissionConfirmation />} />
            <Route path="/operations-hub" element={<OperationsHub />} />
            <Route path="/contact-terminal" element={<ContactTerminal />} />
            <Route path="/asset-final-review" element={<AssetFinalReview />} />
            <Route path="/under-construction" element={<UnderConstruction />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/systems-analysis" element={<SystemsAnalysisHub />} />
            <Route path="/systems-analysis-confirmation" element={<SystemsAnalysisConfirmation />} />
            <Route path="/vessel" element={<Vessel />} />
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
