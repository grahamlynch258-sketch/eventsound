import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteSchema } from "@/components/site/SiteSchema";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import HealthAndSafety from "./pages/HealthAndSafety";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import NotFound from "./pages/NotFound";

// Admin imports - using capital A for Admin folder
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/admin/AdminRoute";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSeo from "./pages/admin/AdminSeo";
import AdminContent from "./pages/admin/AdminContent";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminLibrary from "./pages/admin/AdminLibrary";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminImages from "./pages/admin/AdminImages";
import AdminCaseStudies from "./pages/admin/AdminCaseStudies";
import AdminCaseStudyEdit from "./pages/admin/AdminCaseStudyEdit";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/health-and-safety" element={<HealthAndSafety />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
      
      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/gallery" element={<AdminRoute><AdminGallery /></AdminRoute>} />
      <Route path="/admin/seo" element={<AdminRoute><AdminSeo /></AdminRoute>} />
      <Route path="/admin/content" element={<AdminRoute><AdminContent /></AdminRoute>} />
      <Route path="/admin/testimonials" element={<AdminRoute><AdminTestimonials /></AdminRoute>} />
      <Route path="/admin/library" element={<AdminRoute><AdminLibrary /></AdminRoute>} />
      <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
      <Route path="/admin/images" element={<AdminRoute><AdminImages /></AdminRoute>} />
      <Route path="/admin/case-studies" element={<AdminRoute><AdminCaseStudies /></AdminRoute>} />
      <Route path="/admin/case-studies/:id" element={<AdminRoute><AdminCaseStudyEdit /></AdminRoute>} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteSchema />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;