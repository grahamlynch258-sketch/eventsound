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
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import HealthAndSafety from "./pages/HealthAndSafety";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCategories from "./pages/admin/Categories";
import AdminContent from "./pages/admin/Content";
import AdminImages from "./pages/admin/Images";
import AdminLibrary from "./pages/admin/Library";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSeo from "./pages/admin/AdminSeo";
import AdminRoute from "./components/admin/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
          <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                        <Routes>
                                  <Route path="/" element={<Index />} />
                                  <Route path="/about" element={<About />} />
                                  <Route path="/services" element={<Services />} />
                                  <Route path="/contact" element={<Contact />} />
                                  <Route path="/gallery" element={<Gallery />} />
                                  <Route path="/faq" element={<FAQ />} />
                                  <Route path="/reviews" element={<Reviews />} />
                                  <Route path="/health-and-safety" element={<HealthAndSafety />} />
                          {/* Legacy route redirect */}
                                  <Route path="/av-production" element={<Services />} />
                                  <Route path="/admin/login" element={<AdminLogin />} />
                                  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>AdminRoute>} />
                                            <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>AdminRoute>} />
                                                      <Route path="/admin/content" element={<AdminRoute><AdminContent /></AdminRoute>AdminRoute>} />
                                                                <Route path="/admin/images" element={<AdminRoute><AdminImages /></AdminRoute>AdminRoute>} />
                                                                          <Route path="/admin/library" element={<AdminRoute><AdminLibrary /></AdminRoute>AdminRoute>} />
                                                                                    <Route path="/admin/testimonials" element={<AdminRoute><AdminTestimonials /></AdminRoute>AdminRoute>} />
                                                                                              <Route path="/admin/gallery" element={<AdminRoute><AdminGallery /></AdminRoute>AdminRoute>} />
                                                                                                        <Route path="/admin/seo" element={<AdminRoute><AdminSeo /></AdminRoute>AdminRoute>} />
                                                                                                          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                                                                                                  <Route path="*" element={<NotFound />} />
                                                                                                          </Route>Routes>
                                                                                                </Route>BrowserRouter>
                                                                                    </Route>TooltipProvider>
                                                                          </Route>QueryClientProvider>
                                                                );
                                                                
                                                                export default App;</TooltipProvider>
