import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "@/assets/create-media-logo.png";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateSuiteOpen, setIsCreateSuiteOpen] = useState(false);
  const [isMobileCreateSuiteOpen, setIsMobileCreateSuiteOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Core Story", path: "/core-story" },
  ];

  const navLinksAfterDropdown = [
    { name: "SnapCuts", path: "/snapcuts" },
    { name: "Trust Frame", path: "/trust-frame" },
    { name: "AI Engine", path: "/ai-engine" },
    { name: "Connect Line", path: "/connect" },
  ];

  const createSuiteDropdown = [
    { name: "Create Suite", path: "/create-suite" },
    { name: "VisionLab", path: "/visionlab" },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="container mx-auto px-6 py-3 navbar-pill">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover-lift">
            <img src={logo} alt="CREATE MEDIA" className="h-12 w-12 rounded-full" />
            <span className="text-xl font-bold nav-brand whitespace-nowrap">CREATE MEDIA</span>
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
            
            {/* Create Suite Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCreateSuiteOpen(true)}
              onMouseLeave={() => setIsCreateSuiteOpen(false)}
            >
              <button
                className="text-sm font-medium nav-link-liquid px-4 py-2 rounded-xl flex items-center gap-1"
                onClick={() => setIsCreateSuiteOpen(!isCreateSuiteOpen)}
              >
                Create Suite
                <ChevronRight size={14} className={`transition-transform ${isCreateSuiteOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {isCreateSuiteOpen && (
                <div className="absolute top-full left-0 pt-2 min-w-[160px] z-50">
                  <div className="rounded-xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden">
                    {createSuiteDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors"
                        onClick={() => setIsCreateSuiteOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinksAfterDropdown.map((link) => (
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
              className="text-sm font-semibold px-5 py-2 rounded-xl liquid-glass-element liquid-glass-element--blue border border-primary/20 hover:bg-primary/30 transition-all"
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
              
              {/* Mobile Create Suite Dropdown */}
              <div>
                <button
                  className="text-sm font-medium nav-link-liquid px-4 py-2 rounded-xl flex items-center gap-1 w-full text-left"
                  onClick={() => setIsMobileCreateSuiteOpen(!isMobileCreateSuiteOpen)}
                >
                  Create Suite
                  <ChevronRight size={14} className={`transition-transform ${isMobileCreateSuiteOpen ? 'rotate-90' : ''}`} />
                </button>
                {isMobileCreateSuiteOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {createSuiteDropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsMobileCreateSuiteOpen(false);
                        }}
                        className="text-sm font-medium nav-link-liquid px-4 py-2 rounded-xl"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinksAfterDropdown.map((link) => (
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
                className="text-sm font-semibold px-5 py-2 rounded-xl text-center liquid-glass-element liquid-glass-element--blue border border-primary/20 hover:bg-primary/30 transition-all"
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
