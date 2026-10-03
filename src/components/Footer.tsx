import { Link } from "react-router-dom";
import { Mail, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

const studioServices = [
  "Guest Sourcing",
  "Guest Research",
  "Podcast Production",
  "Short Form",
  "Trailers",
  "Thumbnails",
  "Writing",
  "Distribution",
];

const brands = [
  { name: "SnapCuts", path: "/snapcuts" },
  { name: "VisionLab", path: "/visionlab" },
  { name: "Trust", path: "/trust" },
  { name: "Connect", path: "/connect" },
];

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.15fr_2fr_0.8fr_1.2fr] md:gap-10">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-primary/35 bg-primary/20">
                <img src="/create-media-logo.webp" alt="CREATE MEDIA" width="256" height="256" loading="eager" decoding="async" className="h-full w-full rounded-full object-cover" />
              </span>
              <span className="text-lg font-bold">CREATE MEDIA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Creating, repurposing, and distributing content for ambitious companies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Studio</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {studioServices.map((service) => (
                <li key={service}>
                  <Link to="/studio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Brand</h3>
            <ul className="space-y-2">
              {brands.map((brand) => (
                <li key={brand.name}>
                  <Link to={brand.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <a href="mailto:vansh@createmedia.pro" className="hover:text-primary transition-colors">
                  vansh@createmedia.pro
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="https://www.linkedin.com/company/createmedia-pro/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/CREATEMEDIA225" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/createmedia22?igsh=MThnemR0MTV5bTNrdQ==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@CREATEMEDIA-cd6wx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
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
