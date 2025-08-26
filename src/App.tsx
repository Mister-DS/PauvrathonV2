import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import Decouverte from "./pages/Decouverte";
import Suivis from "./pages/Suivis";
import Profil from "./pages/Profil";
import DemandeStreamer from "./pages/DemandeStreamer";
import StreamerPanel from "./pages/StreamerPanel";
import AdminPanel from "./pages/AdminPanel";
import StreamerPage from "./pages/StreamerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/decouverte" element={<Decouverte />} />
            <Route path="/suivis" element={<Suivis />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/demande-streamer" element={<DemandeStreamer />} />
            <Route path="/streamer" element={<StreamerPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/streamer/:id" element={<StreamerPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
