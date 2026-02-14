import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Download", path: "/download" },
  { name: "Install APK", path: "/how-to-install-apk" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 focus-ring rounded-lg"
            >
              <img
                src="/img/logo.png"
                alt="DhanDiary"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain shadow-soft"
                loading="eager"
              />
              <span className="font-display font-bold text-lg sm:text-xl text-foreground">
                DhanDiary
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                    isActive(link.path)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-muted transition-all duration-200 focus-ring touch-target"
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* CTA Button - Desktop */}
              <div className="hidden lg:block">
                <Button
                  asChild
                  variant="hero"
                  size="default"
                  className="shadow-glow"
                >
                  <Link to="/download">Get the App</Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2.5 rounded-xl hover:bg-muted transition-colors focus-ring touch-target"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border z-50 lg:hidden safe-top safe-bottom overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <Link to="/" className="flex items-center gap-2.5">
                    <img
                      src="/img/logo.png"
                      alt="DhanDiary"
                      className="w-9 h-9 rounded-xl object-contain shadow-soft"
                    />
                    <span className="font-display font-bold text-lg text-foreground">
                      DhanDiary
                    </span>
                  </Link>
                  <button
                    className="p-2.5 rounded-xl hover:bg-muted transition-colors touch-target"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 p-4">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 touch-target ${
                            isActive(link.path)
                              ? "text-primary bg-accent"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Theme toggle in mobile menu */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 touch-target"
                    >
                      {isDark ? (
                        <>
                          <Sun className="w-5 h-5" />
                          Switch to Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5" />
                          Switch to Dark Mode
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>

                {/* CTA */}
                <div className="p-4 border-t border-border">
                  <Button
                    asChild
                    variant="hero"
                    size="lg"
                    className="w-full shadow-glow"
                  >
                    <Link to="/download" onClick={() => setIsMenuOpen(false)}>
                      Get the App
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
