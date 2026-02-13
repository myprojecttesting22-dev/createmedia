import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "@/assets/create-media-logo.png";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "@/contexts/ThemeContext";

const Navigation = () => {
  const { isDark, toggle: onToggleTheme } = useThemeContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateSuiteOpen, setIsCreateSuiteOpen] = useState(false);
  const [isMobileCreateSuiteOpen, setIsMobileCreateSuiteOpen] = useState(false);
  const [navMode, setNavMode] = useState<"dark" | "light">("dark");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinels: HTMLDivElement[] = [];
    const sections = document.querySelectorAll("main > section, main > div, section, .hero-section, [data-section]");

    sections.forEach((section) => {
      const sentinel = document.createElement("div");
      sentinel.style.cssText = "position:absolute;top:0;left:0;width:100%;height:1px;pointer-events:none;";
      (section as HTMLElement).style.position = (section as HTMLElement).style.position || "relative";
      section.prepend(sentinel);
      sentinels.push(sentinel);
    });

    const getLuminance = (el: Element): number => {
      const style = getComputedStyle(el);
      const bg = style.backgroundColor;
      const match = bg.match(/\d+/g);
      if (!match || match.length < 3) return isDark ? 0 : 1;
      const [r, g, b] = match.map(Number);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let topEntry: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topEntry || entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
              topEntry = entry;
            }
          }
        });

        if (topEntry) {
          const parent = (topEntry as IntersectionObserverEntry).target.parentElement;
          if (parent) {
            const lum = getLuminance(parent);
            setNavMode(lum > 0.5 ? "light" : "dark");
          }
        }
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );

    sentinels.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      sentinels.forEach((s) => s.remove());
    };
  }, [isDark]);

  const effectiveNavMode = isDark ? navMode : "light";

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

  const pillClass = effectiveNavMode === "light" ? "navbar-pill navbar-pill--light" : "navbar-pill navbar-pill--dark";
  const linkClass = effectiveNavMode === "light" ? "nav-link--light" : "nav-link-liquid";
  const brandClass = effectiveNavMode === "light" ? "nav-brand--light" : "nav-brand";
  const mobileMenuClass = isDark ? "navbar-mobile-panel" : "navbar-mobile-panel--light";
  const mobileLinkClass = isDark ? "nav-link-liquid" : "nav-link--light";

  return (
    <nav className="fixed top-4 left-4 right-4 z-50" ref={navRef}>
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

            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

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

            <div className="flex items-center justify-center py-2">
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>

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
