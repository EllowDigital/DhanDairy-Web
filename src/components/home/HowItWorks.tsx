import { motion } from "framer-motion";
import { Download, UserPlus, Wallet, PieChart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Download className="w-6 h-6" />,
    title: "Download",
    description: "Get DhanDiary free from our website. Quick install, no bloatware.",
  },
  {
    number: "02",
    icon: <UserPlus className="w-6 h-6" />,
    title: "Sign Up",
    description: "Create an account with email or Google. Takes under a minute.",
  },
  {
    number: "03",
    icon: <Wallet className="w-6 h-6" />,
    title: "Track",
    description: "Log income and expenses with just a few taps. Fast and intuitive.",
  },
  {
    number: "04",
    icon: <PieChart className="w-6 h-6" />,
    title: "Analyze",
    description: "View beautiful charts and insights to understand your spending.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Getting Started</p>
          <h2 className="heading-2 text-foreground text-balance">
            Up and running in 4 simple steps
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative"
              >
                <div className="relative bg-background border border-border rounded-2xl p-6 lg:p-8 text-center group hover:border-primary/20 transition-all duration-500 h-full hover-lift">
                  {/* Step pill */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full tracking-wide">
                    {step.number}
                  </div>

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {step.icon}
                  </div>

                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
