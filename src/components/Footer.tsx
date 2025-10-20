import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/create-media-logo.png";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="CREATE MEDIA" className="h-10 w-10 rounded-full" />
              <span className="text-lg font-bold">CREATE MEDIA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Creating, repurposing, and automating content for real estate brands.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/create-suite" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  CineFlow
                </Link>
              </li>
              <li>
                <Link to="/create-suite" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  BrandSync
                </Link>
              </li>
              <li>
                <Link to="/create-suite" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ReachLift
                </Link>
              </li>
              <li>
                <Link to="/create-suite" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  AdPulse
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/core-story" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/trust-frame" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/visionlab" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Custom Projects
                </Link>
              </li>
              <li>
                <Link to="/connect" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <a href="mailto:hello@createmedia.com" className="hover:text-primary transition-colors">
                  hello@createmedia.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CREATE MEDIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
