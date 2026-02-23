import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Admin route guard — kept static (small, needed immediately for auth check)
import AdminRoute from "./components/admin/AdminRoute";

// Admin pages — lazy loaded so they are excluded from the public bundle
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminSeo = lazy(() => import("./pages/admin/AdminSeo"));
const AdminContent = lazy(() => import("./pages/admin/Content"));
const AdminTestimonials = lazy(() => import("./pages/admin/Testimonials"));
const AdminLibrary = lazy(() => import("./pages/admin/Library"));
const AdminCategories = lazy(() => import("./pages/admin/Categories"));
const AdminImages = lazy(() => import("./pages/admin/Images"));
const AdminCaseStudies = lazy(() => import("./pages/admin/AdminCaseStudies"));
const AdminCaseStudyEdit = lazy(() => import("./pages/admin/AdminCaseStudyEdit"));

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

      {/* Legacy route redirect */}
      <Route path="/av-production" element={<Services />} />

      {/* Admin routes — wrapped in Suspense so the lazy chunks load on demand */}
      <Route path="/admin/login" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
      <Route path="/admin" element={<AdminRoute><Suspense fallback={null}><Dashboard /></Suspense></AdminRoute>} />
      <Route path="/admin/gallery" element={<AdminRoute><Suspense fallback={null}><AdminGallery /></Suspense></AdminRoute>} />
      <Route path="/admin/seo" element={<AdminRoute><Suspense fallback={null}><AdminSeo /></Suspense></AdminRoute>} />
      <Route path="/admin/content" element={<AdminRoute><Suspense fallback={null}><AdminContent /></Suspense></AdminRoute>} />
      <Route path="/admin/testimonials" element={<AdminRoute><Suspense fallback={null}><AdminTestimonials /></Suspense></AdminRoute>} />
      <Route path="/admin/library" element={<AdminRoute><Suspense fallback={null}><AdminLibrary /></Suspense></AdminRoute>} />
      <Route path="/admin/categories" element={<AdminRoute><Suspense fallback={null}><AdminCategories /></Suspense></AdminRoute>} />
      <Route path="/admin/images" element={<AdminRoute><Suspense fallback={null}><AdminImages /></Suspense></AdminRoute>} />
      <Route path="/admin/case-studies" element={<AdminRoute><Suspense fallback={null}><AdminCaseStudies /></Suspense></AdminRoute>} />
      <Route path="/admin/case-studies/:id" element={<AdminRoute><Suspense fallback={null}><AdminCaseStudyEdit /></Suspense></AdminRoute>} />

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
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
