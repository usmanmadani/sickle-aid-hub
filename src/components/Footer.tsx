import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ShieldCheck } from "lucide-react";
import logo from "@/assets/red-hope-logo.jpg";
import zannatechLogo from "@/assets/zannatech-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20 text-card-foreground">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Red Hope Logo" 
                className="w-11 h-11 object-contain rounded-xl border border-primary/30" 
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-foreground block">
                  Sickle Aid Hub
                </span>
                <span className="text-xs text-primary font-medium">
                  Powered by Red Hope Initiative
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              A comprehensive digital health platform dedicated to sickle cell disease education, 
              genotype awareness, patient care management, and community engagement across Nigeria.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-muted-foreground bg-secondary/60 p-3 rounded-2xl border border-border/60 max-w-md">
              <img src={zannatechLogo} alt="ZannaTech Innovations Ltd Logo" className="w-9 h-9 object-contain rounded-lg bg-white p-0.5 border" />
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Technology Partner</span>
                <strong className="text-foreground text-sm">ZannaTech Innovations Ltd</strong>
              </div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-foreground mb-4">
              Ecosystem
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Educational Resources
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-muted-foreground hover:text-primary transition-colors">
                  Media & Learning
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-muted-foreground hover:text-primary transition-colors">
                  Patient Stories
                </Link>
              </li>
              <li>
                <Link to="/outreach" className="text-muted-foreground hover:text-primary transition-colors">
                  Outreach Programs
                </Link>
              </li>
              <li>
                <Link to="/testing-centers" className="text-muted-foreground hover:text-primary transition-colors">
                  Testing Centres
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Services */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-foreground mb-4">
              Patient Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/genotype-checker" className="text-muted-foreground hover:text-primary transition-colors">
                  Compatibility Checker
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                  Patient Hub Dashboard
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-muted-foreground hover:text-primary transition-colors">
                  Volunteer Application
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-primary transition-colors font-medium text-primary">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Red Hope
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm tracking-wider uppercase text-foreground mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:Redhopeinitiatives@gmail.com" className="hover:text-primary transition-colors break-all">
                  Redhopeinitiatives@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:+2348130852118" className="hover:text-primary transition-colors">
                  +234 813 085 2118
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Keffi, Nasarawa State, Nigeria</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-xs text-muted-foreground block mb-2 font-medium">Follow Our Journey</span>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61582870881250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary border border-border transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/_red_hope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary border border-border transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/red-hope-initiatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary border border-border transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© 2026 Sickle Aid Hub. Powered by Red Hope Initiative. Developed with ZannaTech Innovations Ltd.</p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Medical Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
