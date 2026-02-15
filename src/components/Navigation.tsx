import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "@/assets/create-media-logo.png";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateSuiteOpen, setIsCreateSuiteOpen] = useState(false);
  const [isMobileCreateSuiteOpen, setIsMobileCreateSuiteOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Dark mode only — no section detection needed

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

  const pillClass = "navbar-pill navbar-pill--dark";
  const linkClass = "nav-link-liquid";
  const brandClass = "nav-brand";
  const mobileMenuClass = "navbar-mobile-panel";
  const mobileLinkClass = "nav-link-liquid";

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`} ref={navRef}>
      <div className={`container mx-auto px-6 py-3 ${pillClass}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover-lift shrink-0">
            <img src={logo} alt="CREATE MEDIA" className="h-12 w-12 rounded-full" />
            <span className={`text-xl font-bold whitespace-nowrap ${brandClass}`}>CREATE MEDIA</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 nav-scroll-container">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium px-3 lg:px-4 py-2 rounded-xl whitespace-nowrap ${linkClass}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div 
              className="relative group"
              onMouseEnter={() => setIsCreateSuiteOpen(true)}
              onMouseLeave={() => setIsCreateSuiteOpen(false)}
            >
              <button
                className={`text-sm font-medium px-3 lg:px-4 py-2 rounded-xl flex items-center gap-1 whitespace-nowrap ${linkClass}`}
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
                className={`text-sm font-medium px-3 lg:px-4 py-2 rounded-xl whitespace-nowrap ${linkClass}`}
              >
                {link.name}
              </Link>
            ))}

            <Link 
              to="/visionlab" 
              className="text-sm font-semibold px-5 py-2 rounded-xl whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden mt-2 mx-2 ${mobileMenuClass} animate-fade-in`}>
          <div className="flex flex-col gap-2 p-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium ${mobileLinkClass} px-4 py-3 rounded-xl`}
              >
                {link.name}
              </Link>
            ))}
            
            <div>
              <button
                className={`text-sm font-medium ${mobileLinkClass} px-4 py-3 rounded-xl flex items-center gap-1 w-full text-left`}
                onClick={() => setIsMobileCreateSuiteOpen(!isMobileCreateSuiteOpen)}
              >
                Create Suite
                <ChevronRight size={14} className={`transition-transform ${isMobileCreateSuiteOpen ? 'rotate-90' : ''}`} />
              </button>
              {isMobileCreateSuiteOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {createSuiteDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileCreateSuiteOpen(false);
                      }}
                      className={`text-sm font-medium ${mobileLinkClass} px-4 py-3 rounded-xl`}
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
                className={`text-sm font-medium ${mobileLinkClass} px-4 py-3 rounded-xl`}
              >
                {link.name}
              </Link>
            ))}

            <Link 
              to="/visionlab" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold px-5 py-3 rounded-xl text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all mt-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
