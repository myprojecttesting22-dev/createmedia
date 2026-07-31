import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/create-media-logo.png";
import NavSlider from "@/components/NavSlider";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Auto-hide on scroll down, reappear on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Core Story", path: "/core-story" },
    { name: "Create Suite", path: "/create-suite" },
    { name: "VisionLab", path: "/visionlab" },
    { name: "SnapCuts", path: "/snapcuts" },
    { name: "Trust Frame", path: "/trust-frame" },
    { name: "Connect Line", path: "/connect" },
  ];

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-400 ease-in-out ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`}
      ref={navRef}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 navbar-pill navbar-pill--dark">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover-lift shrink-0">
            <img src={logo} alt="CREATE MEDIA" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
            <span className="text-lg sm:text-xl font-bold whitespace-nowrap nav-brand">CREATE MEDIA</span>
          </Link>

          {/* Desktop slider nav */}
          <NavSlider />

          <Link
            to="/visionlab"
            className="hidden lg:inline-flex text-sm font-semibold px-5 py-2 rounded-xl whitespace-nowrap shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 mx-2 navbar-mobile-panel animate-fade-in">
          <div className="flex flex-col gap-1 p-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium nav-link-liquid px-4 py-3 rounded-xl"
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
