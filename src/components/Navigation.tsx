import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Shield, LogOut, LayoutDashboard, Heart, BookOpen, 
  Tv, MessageSquare, Compass, MapPin, Calculator, Users, HelpCircle, ChevronDown 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/red-hope-logo.jpg";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, isVolunteer, signOut } = useAuth();
  const hubPath = isVolunteer ? "/volunteer/dashboard" : "/dashboard";
  const hubLabel = isVolunteer ? "Volunteer Hub" : "Patient Hub";
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-2" 
          : "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Title */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img 
              src={logo} 
              alt="Red Hope Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl border border-primary/20 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                  Sickle Aid Hub
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap hidden sm:inline-block">
                Powered by Red Hope Initiative
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Large Screens) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            <Link
              to="/"
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                isActive("/") ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              Home
            </Link>

            {/* Learn & Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap flex items-center gap-1 ${
                    isActive("/resources") || isActive("/media") ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  Education & Media <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-2xl p-2 w-48 shadow-lg border-border">
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link to="/resources" className="flex items-center gap-2 text-xs py-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Educational Hub
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link to="/media" className="flex items-center gap-2 text-xs py-2">
                    <Tv className="w-4 h-4 text-purple-500" />
                    Media & Learning
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Community & Stories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap flex items-center gap-1 ${
                    isActive("/stories") || isActive("/outreach") ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  Community <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-2xl p-2 w-48 shadow-lg border-border">
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link to="/stories" className="flex items-center gap-2 text-xs py-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    Patient Stories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link to="/outreach" className="flex items-center gap-2 text-xs py-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    Outreach & Events
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools Links */}
            <Link
              to="/testing-centers"
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                isActive("/testing-centers") ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              Testing Centres
            </Link>

            <Link
              to="/genotype-checker"
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                isActive("/genotype-checker") ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              Compatibility
            </Link>

            <Link
              to="/about"
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                isActive("/about") ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              About Red Hope
            </Link>

          </div>

          {/* Right Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Patient Hub Button */}
            <Button
              variant={isActive(hubPath) ? "default" : "outline"}
              size="sm"
              asChild
              className="rounded-full text-xs font-semibold px-3 gap-1.5 border-primary/30"
            >
              <Link to={hubPath}>
                <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                {hubLabel}
              </Link>
            </Button>

            {/* Volunteer & Donate */}
            <Button variant="ghost" size="sm" asChild className="text-xs px-2.5 rounded-full">
              <Link to="/volunteer">Volunteer</Link>
            </Button>

            <Button variant="hero" size="sm" asChild className="rounded-full bg-primary text-primary-foreground text-xs font-semibold px-4 shadow-sm hover:shadow-md">
              <Link to="/donate" className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 fill-current" />
                Donate
              </Link>
            </Button>

            {isAdmin && (
              <Link
                to="/admin"
                className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
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
                className="text-xs text-muted-foreground hover:text-foreground rounded-full px-2"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild className="rounded-full text-xs px-3">
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Right Bar (Theme toggle + Hamburger trigger) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="lg:hidden mt-3 py-4 px-2 border-t border-border bg-background/98 rounded-b-3xl shadow-xl max-h-[85vh] overflow-y-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase px-3 py-1 tracking-wider">
                  Navigation Menu
                </div>

                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Compass className="w-4 h-4 text-primary" /> Home
                </Link>

                <Link
                  to="/resources"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/resources") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-primary" /> Educational Resources
                </Link>

                <Link
                  to="/media"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/media") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Tv className="w-4 h-4 text-purple-500" /> Media & Learning
                </Link>

                <Link
                  to="/stories"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/stories") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-amber-500" /> Patient Stories
                </Link>

                <Link
                  to="/outreach"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/outreach") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Users className="w-4 h-4 text-blue-500" /> Outreach & Events
                </Link>

                <Link
                  to="/testing-centers"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/testing-centers") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-emerald-500" /> Find Testing Centres
                </Link>

                <Link
                  to="/genotype-checker"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/genotype-checker") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Calculator className="w-4 h-4 text-rose-500" /> Compatibility Checker
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl flex items-center gap-3 ${
                    isActive("/about") ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-muted-foreground" /> About Red Hope
                </Link>

                <div className="my-2 border-t border-border/60" />
                <div className="text-[10px] font-bold text-muted-foreground uppercase px-3 py-1 tracking-wider">
                  Patient Services & Support
                </div>

                <Link
                  to={hubPath}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between ${
                    isActive(hubPath) ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    {hubLabel}
                  </span>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    Auth Required
                  </span>
                </Link>

                <Link
                  to="/volunteer"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/60 rounded-xl"
                >
                  Become a Volunteer
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/60 rounded-xl flex items-center gap-3"
                  >
                    <Shield className="w-4 h-4 text-primary" /> Admin Panel
                  </Link>
                )}

                <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                  <Button variant="hero" size="sm" asChild className="w-full rounded-xl bg-primary">
                    <Link to="/donate" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-1">
                      <Heart className="h-4 w-4" /> Donate
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
