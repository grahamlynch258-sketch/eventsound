import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/site/ScrollToTop";
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

// Landing pages — Google Ads only, noindex
const CorporateAVHireDublin = lazy(() => import("@/pages/landing/CorporateAVHireDublin"));
const LEDWallHireIreland = lazy(() => import("@/pages/landing/LEDWallHireIreland"));

// Service sub-pages — lazy loaded for code splitting
const LEDVideoWalls = lazy(() => import("@/pages/services/LEDVideoWalls"));
const AVProduction = lazy(() => import("@/pages/services/AVProduction"));
const LightingDesign = lazy(() => import("@/pages/services/LightingDesign"));
const StagingPipeDrape = lazy(() => import("@/pages/services/StagingPipeDrape"));
const EventProduction = lazy(() => import("@/pages/services/EventProduction"));
const VideoProduction = lazy(() => import("@/pages/services/VideoProduction"));
const VirtualEvents = lazy(() => import("@/pages/services/VirtualEvents"));

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
    <>
      <ScrollToTop />
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

      {/* Service sub-pages */}
      <Route path="/services/led-video-walls" element={<Suspense fallback={null}><LEDVideoWalls /></Suspense>} />
      <Route path="/services/av-production" element={<Suspense fallback={null}><AVProduction /></Suspense>} />
      <Route path="/services/lighting-design" element={<Suspense fallback={null}><LightingDesign /></Suspense>} />
      <Route path="/services/staging-pipe-drape" element={<Suspense fallback={null}><StagingPipeDrape /></Suspense>} />
      <Route path="/services/event-production" element={<Suspense fallback={null}><EventProduction /></Suspense>} />
      <Route path="/services/video-production" element={<Suspense fallback={null}><VideoProduction /></Suspense>} />
      <Route path="/services/virtual-events" element={<Suspense fallback={null}><VirtualEvents /></Suspense>} />

      {/* Landing pages — Google Ads only, noindex */}
      <Route path="/landing/corporate-av-hire-dublin" element={<Suspense fallback={null}><CorporateAVHireDublin /></Suspense>} />
      <Route path="/landing/led-wall-hire-ireland" element={<Suspense fallback={null}><LEDWallHireIreland /></Suspense>} />

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
    </>
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
