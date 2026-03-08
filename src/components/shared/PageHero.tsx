import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  badge?: {
    icon: ReactNode;
    text: string;
  };
  title: string;
  titleGradient?: string;
  description: string;
  children?: ReactNode;
}

const PageHero = ({ badge, title, titleGradient, description, children }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.08] border border-primary/15 text-primary text-sm font-medium mb-6"
            >
              {badge.icon}
              {badge.text}
            </motion.div>
          )}

          <h1 className="heading-1 text-foreground mb-6 text-balance">
            {title}
            {titleGradient && (
              <span className="text-gradient block mt-2">{titleGradient}</span>
            )}
          </h1>

          <p className="body-large max-w-xl mx-auto">
            {description}
          </p>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
