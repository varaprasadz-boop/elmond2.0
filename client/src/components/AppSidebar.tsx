import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  CreditCard, 
  User, 
  LogOut,
  GraduationCap,
  Library,
  UserPlus,
  HelpCircle,
  Wallet,
  Receipt,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/logo_1761063658577.png";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Courses",
    url: "/all-courses",
    icon: Library,
  },
  {
    title: "Enroll Courses",
    url: "/enroll-courses",
    icon: UserPlus,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: HelpCircle,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: Wallet,
  },
  {
    title: "Account",
    url: "/profile",
    icon: User,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: Receipt,
  },
  {
    title: "Support Ticket",
    url: "/support-ticket",
    icon: MessageSquare,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();

  const handleLogout = () => {
    logout(() => {
      navigate("/");
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Link href="/dashboard">
          <div className="flex items-center justify-center hover-elevate rounded-md p-2">
            <img 
              src={logoImage} 
              alt="Elmond - The Learning Revolution" 
              className="h-12 w-auto"
            />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={isActive ? "bg-sidebar-accent" : ""}
                      data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name.split(" ").map(n => n[0]).join("") || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-medium text-sm truncate">{user?.name}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
