import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TopProgressBar = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const progress = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  const width = useTransform(progress, [0, 100], ["0%", "100%"]);
  const opacity = useTransform(progress, [0, 90, 100], [1, 1, 0]);

  useEffect(() => {
    // Start loading
    setIsLoading(true);
    progress.set(0);

    // Animate to 30% quickly
    const timer1 = setTimeout(() => {
      progress.set(30);
    }, 50);

    // Animate to 60%
    const timer2 = setTimeout(() => {
      progress.set(60);
    }, 150);

    // Animate to 90%
    const timer3 = setTimeout(() => {
      progress.set(90);
    }, 250);

    // Complete
    const timer4 = setTimeout(() => {
      progress.set(100);
      setTimeout(() => {
        setIsLoading(false);
        progress.set(0);
      }, 300);
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [location.pathname, progress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1"
      style={{ opacity: isLoading ? 1 : 0, pointerEvents: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary to-primary/50"
        style={{ width }}
      />
      {/* Glow effect */}
      <motion.div
        className="absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent to-primary/50 blur-sm"
        style={{ opacity }}
      />
    </motion.div>
  );
};

export default TopProgressBar;
