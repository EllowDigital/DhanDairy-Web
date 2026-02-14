import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Users, Receipt, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: <Download className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />,
    value: 1000,
    suffix: "+",
    label: "Downloads",
    description: "Happy users worldwide",
  },
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />,
    value: 5000,
    suffix: "+",
    label: "Active Users",
    description: "Managing finances daily",
  },
  {
    icon: <Receipt className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />,
    value: 500000,
    suffix: "+",
    label: "Transactions",
    description: "Tracked and organized",
  },
  {
    icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />,
    value: 98,
    suffix: "%",
    label: "Satisfaction",
    description: "User satisfaction rate",
  },
];

const AnimatedCounter = ({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-padding bg-mesh-gradient relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 sm:w-48 h-32 sm:h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 sm:w-64 h-40 sm:h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
            Trusted by Thousands
          </h2>
          <p className="body-default">
            Join our growing community of smart money managers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-card-gradient border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-8 text-center group hover:border-primary/30 hover:shadow-card transition-all duration-300 hover-lift"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto rounded-lg sm:rounded-xl lg:rounded-2xl bg-accent flex items-center justify-center text-primary mb-2 sm:mb-3 lg:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {stat.icon}
              </div>

              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={isInView}
              />

              <h3 className="font-display font-semibold text-foreground text-xs sm:text-sm lg:text-base mt-1.5 sm:mt-2 mb-0.5 sm:mb-1">
                {stat.label}
              </h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm hidden xs:block">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
