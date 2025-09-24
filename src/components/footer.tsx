import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed successfully!", {
        description: "You'll receive updates about upcoming tournaments.",
      });
      setEmail("");
    }
  };

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-3">PickleBall Pro</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The premier platform for discovering and managing pickleball tournaments. 
                Connect with players, track rankings, and compete at your level.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>(555) 123-PICK</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@pickleballpro.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Austin, Texas</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation("tournaments")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Browse Tournaments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("rankings")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Player Rankings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("schedule")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tournament Schedule
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("results")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Match Results
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("players")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Player Profiles
                </button>
              </li>
            </ul>
          </div>

          {/* For Players */}
          <div>
            <h4 className="font-semibold mb-3">For Players</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How to Register
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tournament Rules
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Skill Level Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Equipment Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Training Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified about new tournaments, results, and ranking updates.
            </p>
            
            <form onSubmit={handleNewsletterSignup} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" size="sm" className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-sm">Follow Us</h5>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} PickleBall Pro. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Made with ❤️ for the pickleball community
          </div>
        </div>
      </div>
    </footer>
  );
}