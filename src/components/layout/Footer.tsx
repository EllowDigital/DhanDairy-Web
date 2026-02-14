import { Link } from "react-router-dom";
import { Mail, ExternalLink, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-4 focus-ring rounded-lg"
            >
              <img
                src="/img/logo.png"
                alt="DhanDiary"
                className="w-10 h-10 rounded-xl object-contain shadow-soft"
                loading="lazy"
              />
              <span className="font-display font-bold text-xl text-foreground">
                DhanDiary
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Simple, secure personal finance tracking for everyone. No ads, no
              trackers, just clean money management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Features", path: "/features" },
                { name: "Download", path: "/download" },
                { name: "How to Install APK", path: "/how-to-install-apk" },
                { name: "Roadmap", path: "/roadmap" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Terms & Conditions", path: "/terms" },
                { name: "EULA", path: "/eula" },
                { name: "Privacy Policy", path: "/privacy" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-muted-foreground text-sm">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a
                  href="mailto:sarwanyadav6174@gmail.com"
                  className="hover:text-primary transition-colors truncate"
                >
                  sarwanyadav6174@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground text-sm">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </div>
                <a
                  href="https://ellowdigital.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  ellowdigital.space
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-muted-foreground text-xs sm:text-sm">
              © {new Date().getFullYear()} DhanDiary. Built &amp; Developed by{" "}
              <a
                href="https://ellowdigital.space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                EllowDigital
              </a>
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Made with ❤️ by Sarwan Yadav
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
