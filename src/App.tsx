import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import Home from "./pages/Home";
import Features from "./pages/Features";
import DownloadPage from "./pages/Download";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Eula from "./pages/Eula";
import InstallApk from "./pages/InstallApk";
import Roadmap from "./pages/Roadmap";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Stats from "./pages/Stats";
import StatsUsers from "./pages/StatsUsers";
import StatsTransactions from "./pages/StatsTransactions";
import StatsFinance from "./pages/StatsFinance";
import StatsHealth from "./pages/StatsHealth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SmoothScroll />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/eula" element={<Eula />} />
          <Route path="/how-to-install-apk" element={<InstallApk />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* Stats Routes (Admin Only) */}
          <Route path="/stats" element={<Stats />} />
          <Route path="/stats/users" element={<StatsUsers />} />
          <Route path="/stats/transactions" element={<StatsTransactions />} />
          <Route path="/stats/finance" element={<StatsFinance />} />
          <Route path="/stats/health" element={<StatsHealth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
