import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollArrow from "@/components/ScrollArrow";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import VisionLab from "./pages/VisionLab";
import Discover from "./pages/Discover";
import Trust from "./pages/Trust";
import Connect from "./pages/Connect";
import SnapCuts from "./pages/SnapCuts";
import NotFound from "./pages/NotFound";
import AdminAssets from "./pages/AdminAssets";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollArrow />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/visionlab" element={<VisionLab />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/snapcuts" element={<SnapCuts />} />
            <Route path="/admin-assets" element={<AdminAssets />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
