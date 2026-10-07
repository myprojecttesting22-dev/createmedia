import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
    { name: "Studio", path: "/studio" },
    { name: "SnapCuts", path: "/snapcuts" },
    { name: "VisionLab", path: "/visionlab" },
    { name: "Trust", path: "/trust" },
    { name: "Connect", path: "/connect" },
  ];

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-400 ease-in-out ${navVisible ? 'navbar-visible' : 'navbar-hidden'}`}
      ref={navRef}
    >
      <div className="flex justify-center px-3 sm:px-4">
        <div className="navbar-pill navbar-pill--dark flex items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 md:py-2.5 lg:gap-4 lg:px-5 lg:py-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 hover-lift shrink-0">
            <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-primary/35 bg-primary/20 shadow-[0_0_18px_hsl(var(--primary)/0.18)] lg:h-12 lg:w-12">
              <img src="/create-media-logo.webp" alt="CREATE MEDIA" width="256" height="256" loading="eager" decoding="async" className="h-full w-full rounded-full object-cover" />
            </span>
            <span className="text-base sm:text-lg lg:text-xl font-bold whitespace-nowrap nav-brand">CREATE MEDIA</span>
          </Link>

          {/* Desktop slider nav */}
          <NavSlider />

          <Link
            to="/discover"
            className="hidden lg:inline-flex text-sm lg:text-base font-semibold px-4 lg:px-5 py-1.5 lg:py-2.5 rounded-full whitespace-nowrap shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
                className="text-sm font-medium nav-link-liquid px-4 py-3 rounded-full"
              >
                {link.name}
              </Link>
            ))}

            <Link 
              to="/discover" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold px-5 py-3 rounded-full text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all mt-2"
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
