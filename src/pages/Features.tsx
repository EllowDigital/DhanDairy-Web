import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  BarChart3,
  WifiOff,
  Shield,
  Lock,
  TrendingUp,
  Database,
  Eye,
  Zap,
  Download,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/home/ScrollReveal";

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Income & Expense Tracking",
    description:
      "Log your daily income and expenses with just a few taps. Categorize transactions and keep a clear record of where your money goes.",
    highlight: true,
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Charts & Insights",
    description:
      "Visualize your spending patterns with clean, intuitive charts. Get meaningful insights into your financial habits at a glance.",
    highlight: true,
  },
  {
    icon: <WifiOff className="w-6 h-6" />,
    title: "Offline-First Database",
    description:
      "DhanDiary works fully offline. Your data is stored locally on your device and syncs automatically when you're back online.",
    highlight: true,
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure Authentication",
    description:
      "Sign in securely with email verification or use Google/GitHub OAuth. Your account is protected with modern security standards.",
    highlight: true,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy-Focused Design",
    description:
      "No ads, no trackers, no selling your data. DhanDiary respects your privacy and keeps your financial information confidential.",
    highlight: false,
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Local Data Storage",
    description:
      "All your data is stored securely on your device. You're always in control of your information.",
    highlight: false,
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Clean, Simple Interface",
    description:
      "No clutter, no distractions. DhanDiary features a minimal UI that focuses on what matters most – your finances.",
    highlight: false,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightweight & Fast",
    description:
      "Optimized for performance. DhanDiary is lightweight, uses minimal resources, and runs smoothly on any device.",
    highlight: false,
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Export Data",
    description:
      "Export your transactions to PDF, CSV, or Excel. Choose ranges — Today, Weekly, Monthly, Yearly or Custom — and include notes or group by category for flexible reporting.",
    highlight: true,
  },
  {
    icon: <Tag className="w-6 h-6" />,
    title: "Categories",
    description:
      "Create and manage categories to organize transactions. Group reports and exports by category for clearer insights.",
    highlight: false,
  },
];

const Features = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);

  return (
    <Layout>
      <SEOHead {...pageSEO.features} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
      >
        <div
          className="absolute inset-0 bg-mesh-gradient pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.08] border border-primary/15 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powerful Yet Simple
            </div>
            <h1 className="heading-1 text-foreground">
              Powerful Features,{" "}
              <span className="text-gradient">Simple Experience</span>
            </h1>
            <p className="body-large max-w-2xl mx-auto text-balance">
              Everything you need to manage your personal finances, without the
              complexity. Built for speed, security, and simplicity.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`group p-6 sm:p-8 rounded-2xl border transition-all duration-500 h-full hover-lift ${
                    feature.highlight
                      ? "bg-accent/40 border-primary/15 hover:border-primary/30"
                      : "bg-card border-border hover:border-primary/20"
                  }`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                      feature.highlight
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal animation="scale">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="heading-2 text-foreground text-balance">
                Experience These Features Today
              </h2>
              <p className="body-large max-w-xl mx-auto">
                Download DhanDiary and start managing your finances the smart
                way.
              </p>
              <div className="pt-2">
                <Button
                  asChild
                  variant="hero"
                  size="xl"
                  className="shadow-glow"
                >
                  <Link to="/download">
                    <Sparkles className="w-4 h-4" />
                    Download Now
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
