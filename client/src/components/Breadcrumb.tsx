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
    <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 overflow-x-auto scrollbar-hide pb-1" data-testid="breadcrumb-nav">
      <Link href="/" data-testid="breadcrumb-home">
        <span className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap">
          <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Home</span>
        </span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} data-testid={`breadcrumb-item-${index}`}>
              <span className="hover:text-foreground transition-colors cursor-pointer whitespace-nowrap max-w-[120px] sm:max-w-none truncate inline-block">
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="text-foreground font-medium whitespace-nowrap max-w-[150px] sm:max-w-none truncate inline-block" data-testid={`breadcrumb-current-${index}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
