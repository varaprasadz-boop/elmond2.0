import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, ChevronDown, ShoppingCart, User, BookOpen, Award, CreditCard, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import logoImage from "@assets/logo_1761063658577.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const categories = [
    "Digital Marketing",
    "Medical Coding",
    "Programming",
    "Design",
    "Finance",
    "Data and Analytics",
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
              <img 
                src={logoImage} 
                alt="Elmond - The Learning Revolution" 
                className="h-10"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" data-testid="link-nav-home">
              <Button variant="ghost" className="text-base">
                Home
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base" data-testid="button-categories-dropdown">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link href={`/categories?filter=${encodeURIComponent(category)}`} data-testid={`link-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/course" data-testid="link-nav-courses">
              <Button variant="ghost" className="text-base">
                Courses
              </Button>
            </Link>
            <Link href="/bundled-courses" data-testid="link-nav-bundled-courses">
              <Button variant="ghost" className="text-base">
                Bundled Courses
              </Button>
            </Link>
            <Link href="/blog" data-testid="link-nav-blog">
              <Button variant="ghost" className="text-base">
                Blog
              </Button>
            </Link>
            <Link href="/contact" data-testid="link-nav-contact">
              <Button variant="ghost" className="text-base">
                Contact
              </Button>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    data-testid="badge-cart-count"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.name.split(" ").map(n => n[0]).join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{user?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" data-testid="link-dashboard">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-courses" data-testid="link-my-courses">
                      <BookOpen className="h-4 w-4 mr-2" />
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/certificates" data-testid="link-certificates">
                      <Award className="h-4 w-4 mr-2" />
                      Certificates
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-purchases" data-testid="link-my-purchases">
                      <CreditCard className="h-4 w-4 mr-2" />
                      My Purchases
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" data-testid="link-profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logout(() => {
                        navigate("/");
                      });
                    }}
                    data-testid="button-logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" data-testid="link-login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup" data-testid="link-signup">
                  <Button variant="default">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t" data-testid="menu-mobile">
            <nav className="flex flex-col gap-2">
              <Link href="/" data-testid="link-mobile-home">
                <Button variant="ghost" className="w-full justify-start">
                  Home
                </Button>
              </Link>
              <Link href="/categories" data-testid="link-mobile-categories">
                <Button variant="ghost" className="w-full justify-start">
                  Categories
                </Button>
              </Link>
              <Link href="/course" data-testid="link-mobile-courses">
                <Button variant="ghost" className="w-full justify-start">
                  Courses
                </Button>
              </Link>
              <Link href="/bundled-courses" data-testid="link-mobile-bundled-courses">
                <Button variant="ghost" className="w-full justify-start">
                  Bundled Courses
                </Button>
              </Link>
              <Link href="/blog" data-testid="link-mobile-blog">
                <Button variant="ghost" className="w-full justify-start">
                  Blog
                </Button>
              </Link>
              <Link href="/contact" data-testid="link-mobile-contact">
                <Button variant="ghost" className="w-full justify-start">
                  Contact
                </Button>
              </Link>
              <div className="pt-4 flex flex-col gap-2">
                <Link href="/login" data-testid="link-mobile-login">
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" data-testid="link-mobile-signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
