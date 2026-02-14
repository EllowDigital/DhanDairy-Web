import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <motion.div
            className="h-12 w-12 rounded-full border-4 border-muted"
            style={{ borderTopColor: "hsl(var(--primary))" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent"
            style={{ borderBottomColor: "hsl(var(--primary) / 0.3)" }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Loading text with pulse */}
        <motion.p
          className="text-sm font-medium text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PageLoader;
