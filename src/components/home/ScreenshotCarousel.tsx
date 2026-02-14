import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";

const screenshots = [
  {
    id: 1,
    image: "/img/Screenshot/1s.jpg",
    title: "Dashboard Overview",
    description: "Get a complete view of your finances at a glance",
  },
  {
    id: 2,
    image: "/img/Screenshot/2s.jpg",
    title: "Transaction History",
    description: "Track all your income and expenses with detailed logs",
  },
  {
    id: 3,
    image: "/img/Screenshot/3s.jpg",
    title: "Add Transaction",
    description: "Quick and easy transaction entry with categories",
  },
  {
    id: 4,
    image: "/img/Screenshot/4s.jpg",
    title: "Charts & Analytics",
    description: "Visualize spending patterns with beautiful charts",
  },
  {
    id: 5,
    image: "/img/Screenshot/5s.jpg",
    title: "Budget Planning",
    description: "Set and track budgets for different categories",
  },
  {
    id: 6,
    image: "/img/Screenshot/6s.jpg",
    title: "Category Management",
    description: "Organize transactions with custom categories",
  },
  {
    id: 7,
    image: "/img/Screenshot/7s.jpg",
    title: "Reports & Insights",
    description: "Generate detailed financial reports",
  },
  {
    id: 8,
    image: "/img/Screenshot/8s.jpg",
    title: "Settings & Security",
    description: "Customize app and manage security settings",
  },
  {
    id: 9,
    image: "/img/Screenshot/9s.jpg",
    title: "Account Overview",
    description: "Manage multiple accounts in one place",
  },
];

const ScreenshotCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length,
    );
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  }, []);

  const getVisibleIndexes = () => {
    if (isMobile) {
      // On mobile, only show the active screenshot
      return [activeIndex];
    }
    // On tablet/desktop, show 3 screenshots
    const prev = (activeIndex - 1 + screenshots.length) % screenshots.length;
    const next = (activeIndex + 1) % screenshots.length;
    return [prev, activeIndex, next];
  };

  return (
    <section className="section-padding bg-mesh-gradient overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            App Preview
          </div>
          <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
            See DhanDiary in Action
          </h2>
          <p className="body-default max-w-lg mx-auto">
            Clean, intuitive interface designed for effortless money management
            on your Android device.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all shadow-soft z-20 touch-target"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>

            {/* Screenshots */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 py-4 sm:py-6 lg:py-8 overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
              <AnimatePresence mode="popLayout">
                {getVisibleIndexes().map((index, i) => {
                  const screenshot = screenshots[index];
                  const isActive = index === activeIndex;
                  const visibleCount = getVisibleIndexes().length;

                  return (
                    <motion.div
                      key={screenshot.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isActive ? 1 : 0.5,
                        scale: isActive ? 1 : 0.8,
                        zIndex: isActive ? 10 : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`cursor-pointer flex-shrink-0 ${
                        visibleCount === 1
                          ? ""
                          : !isActive
                            ? "hidden sm:block"
                            : ""
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {/* Phone Frame */}
                      <div
                        className={`relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] p-1 sm:p-1.5 lg:p-2 shadow-elevated ${
                          isActive ? "ring-2 ring-primary/20" : ""
                        }`}
                      >
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 lg:w-20 h-3 sm:h-4 lg:h-5 bg-zinc-900 rounded-b-lg lg:rounded-b-xl z-10 flex items-center justify-center">
                          <div className="w-6 sm:w-10 lg:w-12 h-1 sm:h-1.5 lg:h-2 bg-zinc-800 rounded-full" />
                        </div>
                        {/* Screen */}
                        <div className="relative bg-black rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden">
                          <img
                            src={screenshot.image}
                            alt={screenshot.title}
                            className={`object-cover transition-all duration-500 ${
                              isActive
                                ? "w-40 xs:w-48 sm:w-44 md:w-52 lg:w-56"
                                : "w-32 xs:w-36 sm:w-36 md:w-40 lg:w-44"
                            }`}
                            loading="lazy"
                          />
                        </div>
                        {/* Home Indicator */}
                        <div className="absolute bottom-1 sm:bottom-1 lg:bottom-1.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 lg:w-20 h-0.5 sm:h-0.5 lg:h-1 bg-zinc-600 rounded-full" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all shadow-soft z-20 touch-target"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
          </div>

          {/* Caption */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-4 sm:mt-6 lg:mt-8"
          >
            <h3 className="font-display font-semibold text-foreground text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1">
              {screenshots[activeIndex].title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm lg:text-base max-w-md mx-auto px-4">
              {screenshots[activeIndex].description}
            </p>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 lg:mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-6 sm:w-7 lg:w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-primary/50"
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
