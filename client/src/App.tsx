import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Categories from "@/pages/Categories";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Enroll from "@/pages/Enroll";
import Dashboard from "@/pages/Dashboard";
import MyCourses from "@/pages/MyCourses";
import Learn from "@/pages/Learn";
import UserProfile from "@/pages/UserProfile";
import Certificates from "@/pages/Certificates";
import MyPurchases from "@/pages/MyPurchases";
import PolicyPage from "@/pages/PolicyPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/course" component={Courses} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/categories" component={Categories} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/enroll/:id" component={Enroll} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/my-courses" component={MyCourses} />
      <Route path="/learn/:id" component={Learn} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/certificates" component={Certificates} />
      <Route path="/my-purchases" component={MyPurchases} />
      <Route path="/privacy-policy" component={PolicyPage} />
      <Route path="/terms-of-service" component={PolicyPage} />
      <Route path="/cookie-policy" component={PolicyPage} />
      <Route path="/become-instructor" component={PolicyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const { isAuthenticated, isInitialized } = useAuth();

  const isAuthenticatedRoute = (path: string): boolean => {
    const authenticatedRoutePatterns = [
      /^\/dashboard$/,
      /^\/my-courses$/,
      /^\/learn(\/[^/]+)?$/,
      /^\/profile$/,
      /^\/certificates$/,
      /^\/my-purchases$/,
    ];
    
    return authenticatedRoutePatterns.some(pattern => pattern.test(path));
  };

  if (!isInitialized) {
    return null;
  }

  const showSidebar = isAuthenticated && isAuthenticatedRoute(location);

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (showSidebar) {
    return (
      <SidebarProvider style={sidebarStyle as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="flex items-center justify-between p-4 border-b bg-background">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="flex items-center gap-2">
                <WhatsAppButton />
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              <Router />
            </main>
          </div>
        </div>
        <Toaster />
        <CookieConsent />
      </SidebarProvider>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
