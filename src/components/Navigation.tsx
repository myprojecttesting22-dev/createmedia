import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/create-media-logo.png";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Core Story", path: "/core-story" },
    { name: "Create Suite", path: "/create-suite" },
    { name: "VisionLab", path: "/visionlab" },
    { name: "Trust Frame", path: "/trust-frame" },
    { name: "AI Engine", path: "/ai-engine" },
    { name: "Connect Line", path: "/connect" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-liquid navbar-wrapper">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover-lift">
            <img src={logo} alt="CREATE MEDIA" className="h-12 w-12 rounded-full" />
            <span className="text-xl font-bold nav-brand">CREATE MEDIA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium nav-link-liquid px-4 py-2 rounded-xl"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/visionlab" 
              className="text-sm font-semibold px-5 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium nav-link-liquid px-4 py-2 rounded-xl"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/visionlab" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold px-5 py-2 rounded-xl bg-primary text-primary-foreground text-center hover:bg-primary/90 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
