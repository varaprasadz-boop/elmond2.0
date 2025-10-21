import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">E</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">Elmond</span>
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
            <Link href="/login" data-testid="link-login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup" data-testid="link-signup">
              <Button variant="default">Sign Up</Button>
            </Link>
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
