import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Home, UserPlus, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/register", label: "Register", icon: UserPlus },
    { path: "/queue", label: "Queue Status", icon: BarChart3 },
    { path: "/admin/login", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      {/* Desktop Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 hidden md:block">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-foreground tracking-tight">SmartOPD</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
              Register
            </Link>
            <Link to="/queue" className="text-muted-foreground hover:text-primary transition-colors">
              Live Queue
            </Link>
            <Button asChild variant="default" size="sm" className="ml-2 gap-2 shadow-lg shadow-primary/20">
              <Link to="/admin/login">
                <ShieldCheck className="w-4 h-4" />
                Staff / Admin
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="bg-card/90 backdrop-blur-md sticky top-0 z-50 md:hidden border-b">
        <div className="container flex items-center justify-center h-14">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-foreground tracking-tight">SmartOPD</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card py-10 hidden md:block">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Activity className="w-4 h-4 text-primary" />
              <span>SmartOPD — Trusted Digital Clinic Queue Management</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around items-center h-16 px-2 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <link.icon className={`w-5 h-5 ${isActive ? "fill-primary/10" : ""}`} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default PublicLayout;
