import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Shield, LogOut, LayoutDashboard, Heart, BookOpen, 
  Tv, MessageSquare, Compass, MapPin, Calculator, Users, HelpCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/red-hope-logo.jpg";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryNavLinks = [
    { name: "Home", path: "/", icon: Compass },
    { name: "Educational Resources", path: "/resources", icon: BookOpen },
    { name: "Media & Learning", path: "/media", icon: Tv },
    { name: "Patient Stories", path: "/stories", icon: MessageSquare },
    { name: "Outreach", path: "/outreach", icon: Users },
    { name: "Testing Centres", path: "/testing-centers", icon: MapPin },
    { name: "Compatibility", path: "/genotype-checker", icon: Calculator },
    { name: "About Red Hope", path: "/about", icon: HelpCircle },
  ];

  const secondaryNavLinks = [
    { name: "Volunteer", path: "/volunteer" },
    { name: "Donate", path: "/donate" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 border-border shadow-[var(--shadow-card)]" 
          : "bg-background/80 border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Ecosystem Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={logo} 
              alt="Red Hope Logo" 
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105 rounded-xl border border-primary/20"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  Sickle Aid Hub
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  Digital Health
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground hidden lg:inline-block">
                Powered by Red Hope Initiative • Partner: ZannaTech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-medium transition-colors hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary font-semibold border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Patient Hub (Auth Guarded link) */}
            <Button
              variant={isActive("/dashboard") ? "default" : "outline"}
              size="sm"
              asChild
              className="rounded-full gap-1.5 font-medium text-xs border-primary/30"
            >
              <Link to="/dashboard">
                <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                Patient Hub
              </Link>
            </Button>

            {/* Volunteer & Donate */}
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <Link to="/volunteer">Volunteer</Link>
            </Button>

            <Button variant="hero" size="sm" asChild className="rounded-full bg-primary text-primary-foreground text-xs shadow-sm hover:shadow-md">
              <Link to="/donate" className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 fill-current" />
                Donate
              </Link>
            </Button>

            {isAdmin && (
              <Link
                to="/admin"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title="Admin Dashboard"
              >
                <Shield className="h-4 w-4 text-primary" />
              </Link>
            )}

            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut} 
                className="text-xs text-muted-foreground hover:text-foreground"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild className="rounded-full text-xs">
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Right Bar (Theme toggle + Hamburger) */}
          <div className="flex xl:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="xl:hidden py-4 border-t border-border/80 bg-background/98 rounded-b-2xl shadow-xl max-h-[85vh] overflow-y-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-1 px-2">
                <div className="text-[11px] font-bold text-muted-foreground uppercase px-3 py-1 tracking-wider">
                  Platform Navigation
                </div>
                {primaryNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2.5 text-sm font-medium transition-colors rounded-xl flex items-center gap-3 ${
                        isActive(link.path)
                          ? "text-primary bg-primary/10 font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {link.name}
                    </Link>
                  );
                })}

                <div className="my-2 border-t border-border/60" />
                <div className="text-[11px] font-bold text-muted-foreground uppercase px-3 py-1 tracking-wider">
                  Patient Services & Support
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2.5 text-sm font-medium transition-colors rounded-xl flex items-center justify-between ${
                    isActive("/dashboard")
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    Patient Hub
                  </span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    Auth
                  </span>
                </Link>

                {secondaryNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-xl"
                  >
                    {link.name}
                  </Link>
                ))}

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-xl flex items-center gap-3"
                  >
                    <Shield className="w-4 h-4 text-primary" />
                    Admin Panel
                  </Link>
                )}

                <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                  <Button variant="hero" size="sm" asChild className="w-full rounded-xl bg-primary">
                    <Link to="/donate" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-1">
                      <Heart className="h-4 w-4" />
                      Donate
                    </Link>
                  </Button>

                  {user ? (
                    <Button variant="outline" size="sm" onClick={() => { signOut(); setIsOpen(false); }} className="w-full rounded-xl">
                      <LogOut className="h-4 w-4 mr-1" /> Logout
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" asChild className="w-full rounded-xl">
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
