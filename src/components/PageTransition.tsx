import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect, forwardRef, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const LoadingSpinner = forwardRef<HTMLDivElement>((_, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <motion.div
          className="h-10 w-10 rounded-full border-3 border-muted"
          style={{ borderTopColor: "hsl(var(--primary))" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  </motion.div>
));
LoadingSpinner.displayName = "LoadingSpinner";

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const latestChildrenRef = useRef(children);

  useEffect(() => {
    latestChildrenRef.current = children;
  }, [children]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDisplayChildren(latestChildrenRef.current);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoading) {
      setDisplayChildren(children);
    }
  }, [children, isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingSpinner key="loader" />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
