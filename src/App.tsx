import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoreStory from "./pages/CoreStory";
import CreateSuite from "./pages/CreateSuite";
import VisionLab from "./pages/VisionLab";
import TrustFrame from "./pages/TrustFrame";
import AIEngine from "./pages/AIEngine";
import Connect from "./pages/Connect";
import SnapCuts from "./pages/SnapCuts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/core-story" element={<CoreStory />} />
          <Route path="/create-suite" element={<CreateSuite />} />
          <Route path="/visionlab" element={<VisionLab />} />
          <Route path="/trust-frame" element={<TrustFrame />} />
          <Route path="/ai-engine" element={<AIEngine />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/snapcuts" element={<SnapCuts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
