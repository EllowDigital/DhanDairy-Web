import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const screenshots = [
  { id: 1, image: "/img/Screenshot/1s.jpg", title: "Dashboard Overview", description: "Complete view of your finances at a glance" },
  { id: 2, image: "/img/Screenshot/2s.jpg", title: "Transaction History", description: "Track all income and expenses with detailed logs" },
  { id: 3, image: "/img/Screenshot/3s.jpg", title: "Add Transaction", description: "Quick transaction entry with smart categories" },
  { id: 4, image: "/img/Screenshot/4s.jpg", title: "Charts & Analytics", description: "Visualize spending with beautiful charts" },
  { id: 5, image: "/img/Screenshot/5s.jpg", title: "Budget Planning", description: "Set and track budgets per category" },
  { id: 6, image: "/img/Screenshot/6s.jpg", title: "Category Management", description: "Organize with custom categories" },
  { id: 7, image: "/img/Screenshot/7s.jpg", title: "Reports & Insights", description: "Generate detailed financial reports" },
  { id: 8, image: "/img/Screenshot/8s.jpg", title: "Settings & Security", description: "Customize and secure your app" },
  { id: 9, image: "/img/Screenshot/9s.jpg", title: "Account Overview", description: "Manage multiple accounts in one place" },
];

const ScreenshotCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = useCallback((dir: -1 | 1) => {
    setActiveIndex((prev) => (prev + dir + screenshots.length) % screenshots.length);
  }, []);

  const getVisible = () => {
    if (isMobile) return [activeIndex];
    const prev = (activeIndex - 1 + screenshots.length) % screenshots.length;
    const next = (activeIndex + 1) % screenshots.length;
    return [prev, activeIndex, next];
  };

  return (
    <section className="section-padding bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Preview</p>
          <h2 className="heading-2 text-foreground text-balance">
            See DhanDiary in action
          </h2>
          <p className="body-default mt-4 max-w-lg mx-auto">
            Clean, intuitive interface designed for effortless money management.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 lg:gap-8">
            <button
              onClick={() => goTo(-1)}
              className="flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 z-20 touch-target"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 lg:gap-8 py-8 overflow-hidden min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]">
              <AnimatePresence mode="popLayout">
                {getVisible().map((index) => {
                  const shot = screenshots[index];
                  const isActive = index === activeIndex;
                  return (
                    <motion.div
                      key={shot.id}
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.85, zIndex: isActive ? 10 : 0 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                      className={`cursor-pointer flex-shrink-0 ${!isActive ? "hidden sm:block" : ""}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className={`relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2rem] lg:rounded-[2.5rem] p-1.5 lg:p-2 shadow-elevated ${isActive ? "ring-2 ring-primary/15" : ""}`}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 lg:w-20 h-3 lg:h-5 bg-zinc-900 rounded-b-lg lg:rounded-b-xl z-10 flex items-center justify-center">
                          <div className="w-8 lg:w-12 h-1 lg:h-2 bg-zinc-800 rounded-full" />
                        </div>
                        <div className="relative bg-black rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden">
                          <img
                            src={shot.image}
                            alt={shot.title}
                            className={`object-cover transition-all duration-500 ${isActive ? "w-48 sm:w-52 lg:w-60" : "w-36 sm:w-40 lg:w-48"}`}
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute bottom-1 lg:bottom-1.5 left-1/2 -translate-x-1/2 w-14 lg:w-20 h-0.5 lg:h-1 bg-zinc-600 rounded-full" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <button
              onClick={() => goTo(1)}
              className="flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 z-20 touch-target"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Caption */}
          <motion.div key={activeIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center mt-6 lg:mt-8">
            <h3 className="font-display font-semibold text-foreground text-base lg:text-lg mb-1">
              {screenshots[activeIndex].title}
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {screenshots[activeIndex].description}
            </p>
          </motion.div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex ? "w-7 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-primary/40"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotCarousel;
