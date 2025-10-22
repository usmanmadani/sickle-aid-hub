import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-gradient">Red Hope</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering communities through sickle cell awareness and support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span>info@redhope.org</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-background border border-border hover:border-primary hover:shadow-[var(--shadow-soft)] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background border border-border hover:border-primary hover:shadow-[var(--shadow-soft)] transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background border border-border hover:border-primary hover:shadow-[var(--shadow-soft)] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Red Hope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
