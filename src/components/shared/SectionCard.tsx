import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionCardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  variant?: "default" | "highlighted" | "glass";
  className?: string;
  delay?: number;
}

const SectionCard = ({
  icon,
  title,
  children,
  variant = "default",
  className = "",
  delay = 0,
}: SectionCardProps) => {
  const variants = {
    default: "bg-card border-border hover:border-primary/30",
    highlighted: "bg-accent/50 border-primary/20 hover:border-primary/40",
    glass:
      "bg-glass-gradient backdrop-blur-sm border-border/50 hover:border-primary/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-card ${variants[variant]} ${className}`}
    >
      {icon && (
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent flex items-center justify-center text-primary flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2">
              {title}
            </h3>
            <div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      )}
      {!icon && (
        <>
          <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
            {title}
          </h3>
          <div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {children}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SectionCard;
