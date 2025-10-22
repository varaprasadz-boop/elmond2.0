import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumb-nav">
      <Link href="/" data-testid="breadcrumb-home">
        <span className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} data-testid={`breadcrumb-item-${index}`}>
              <span className="hover:text-foreground transition-colors cursor-pointer">
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="text-foreground font-medium" data-testid={`breadcrumb-current-${index}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
