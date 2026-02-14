import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import PageHero from "@/components/shared/PageHero";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const features = [
  {
    icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Income & Expense Tracking",
    description:
      "Log your daily income and expenses with just a few taps. Categorize transactions and keep a clear record of where your money goes.",
    highlight: true,
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Charts & Insights",
    description:
      "Visualize your spending patterns with clean, intuitive charts. Get meaningful insights into your financial habits at a glance.",
    highlight: true,
  },
  {
    icon: <WifiOff className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Offline-First Database",
    description:
      "DhanDiary works fully offline. Your data is stored locally on your device and syncs automatically when you're back online.",
    highlight: true,
  },
  {
    icon: <Lock className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Secure Authentication",
    description:
      "Sign in securely with email verification or use Google/GitHub OAuth. Your account is protected with modern security standards.",
    highlight: true,
  },
  {
    icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Privacy-Focused Design",
    description:
      "No ads, no trackers, no selling your data. DhanDiary respects your privacy and keeps your financial information confidential.",
    highlight: false,
  },
  {
    icon: <Database className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Local Data Storage",
    description:
      "All your data is stored securely on your device. You're always in control of your information.",
    highlight: false,
  },
  {
    icon: <Eye className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Clean, Simple Interface",
    description:
      "No clutter, no distractions. DhanDiary features a minimal UI that focuses on what matters most – your finances.",
    highlight: false,
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Lightweight & Fast",
    description:
      "Optimized for performance. DhanDiary is lightweight, uses minimal resources, and runs smoothly on any device.",
    highlight: false,
  },
  {
    icon: <Download className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Export Data",
    description:
      "Export your transactions to PDF, CSV, or Excel. Choose ranges — Today, Weekly, Monthly, Yearly or Custom — and include notes or group by category for flexible reporting.",
    highlight: true,
  },
  {
    icon: <Tag className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Categories",
    description:
      "Create and manage categories to organize transactions. Group reports and exports by category for clearer insights.",
    highlight: false,
  },
];

const Features = () => {
  return (
    <Layout>
      <SEOHead {...pageSEO.features} />
      <PageHero
        badge={{
          icon: <Sparkles className="w-4 h-4" />,
          text: "Powerful Yet Simple",
        }}
        title="Powerful Features,"
        titleGradient="Simple Experience"
        description="Everything you need to manage your personal finances, without the complexity. Built for speed, security, and simplicity."
      />

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 h-full ${
                    feature.highlight
                      ? "bg-accent/50 border-primary/20 hover:border-primary/40"
                      : "bg-card border-border hover:border-primary/30"
                  } hover:shadow-card`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-colors ${
                      feature.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground"
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
      <section className="py-12 sm:py-16 lg:py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Experience These Features Today
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              Download DhanDiary and start managing your finances the smart way.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/download">
                Download Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
