import { Link } from "react-router-dom";
import { Mail, ExternalLink, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Features", path: "/features" },
  { name: "Download", path: "/download" },
  { name: "Compare", path: "/compare" },
  { name: "Blog", path: "/blog" },
  { name: "Roadmap", path: "/roadmap" },
  { name: "Release Notes", path: "/release-notes" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Help & Support", path: "/help" },
];

const legalLinks = [
  { name: "Terms & Conditions", path: "/terms" },
  { name: "EULA", path: "/eula" },
  { name: "Privacy Policy", path: "/privacy" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 focus-ring rounded-lg">
              <img src="/img/logo.webp" alt="DhanDiary" className="w-10 h-10 rounded-xl object-contain" loading="lazy" />
              <span className="font-display font-bold text-xl text-foreground">DhanDiary</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Simple, secure personal finance tracking. No ads, no trackers — just clean money management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-5 text-xs uppercase tracking-[0.15em]">
              Product
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-5 text-xs uppercase tracking-[0.15em]">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display font-semibold text-foreground mb-5 text-xs uppercase tracking-[0.15em]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a href="mailto:sarwanyadav6174@gmail.com" className="hover:text-foreground transition-colors truncate">
                  sarwanyadav6174@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </div>
                <a href="https://ellowdigital.space" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  ellowdigital.space
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} DhanDiary · Built by{" "}
              <a href="https://ellowdigital.space" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">
                EllowDigital
              </a>
            </p>
            <p className="text-muted-foreground text-sm">
              Made with ❤️ by Sarwan Yadav
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
