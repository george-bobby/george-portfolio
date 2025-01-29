import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/Cursor";
import Navigation from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import ResearchPaper from "./pages/ResearchPost";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProjectDetails from "./pages/ProjectPost";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Research from "./pages/Papers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:slug" element={<ResearchPaper />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/certifications" element={<Certifications />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;