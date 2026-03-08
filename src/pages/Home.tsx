import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Shield,
  WifiOff,
  BarChart3,
  Lock,
  Star,
  Download,
  Users,
  Sparkles,
  ChevronDown,
  Zap,
  Eye,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ScreenshotCarousel from "@/components/home/ScreenshotCarousel";
import FAQ from "@/components/home/FAQ";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import StatsCounter from "@/components/home/StatsCounter";
import ComparisonTable from "@/components/home/ComparisonTable";
import PartnersSection from "@/components/home/PartnersSection";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/home/ScrollReveal";
import NarrativeSection from "@/components/home/NarrativeSection";
import TypewriterEffect from "@/components/home/TypewriterEffect";
import { APP_CONFIG } from "@/lib/appConfig";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Smart Tracking",
    description: "Log income & expenses effortlessly. Clean interface, instant insights.",
  },
  {
    icon: <WifiOff className="w-6 h-6" />,
    title: "Offline First",
    description: "Full functionality without internet. Auto-syncs when you reconnect.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Zero Ads, Zero Tracking",
    description: "No ads, no trackers, no data selling. Your finances stay private.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Bank-Grade Security",
    description: "Encrypted storage with email verification and OAuth authentication.",
  },
];

const narrativeBlocks = [
  {
    icon: <Eye className="w-5 h-5" />,
    label: "The Problem",
    title: "Most finance apps are cluttered, ad-heavy, and invasive.",
    description: "They track your data, bombard you with ads, and make simple tasks complicated. You deserve better.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "The Solution",
    title: "DhanDiary strips away everything unnecessary.",
    description: "Pure, focused expense tracking. No distractions. No compromises. Just you and your money.",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    label: "The Result",
    title: "Complete financial clarity in under 30 seconds a day.",
    description: "Track, analyze, and understand your spending patterns — all from a beautifully simple app.",
  },
];

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);

  return (
    <Layout>
      <SEOHead {...pageSEO.home} />

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[100dvh] flex items-center"
      >
        {/* Subtle ambient gradient */}
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY, willChange: "transform, opacity" }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative w-full"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-6"
              >
                {APP_CONFIG.version && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.08] border border-primary/15 text-primary text-sm font-medium">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    v{APP_CONFIG.version} — Now Available
                  </div>
                )}

                <h1 className="heading-1 text-foreground">
                  Your Personal{" "}
                  <span className="text-gradient">
                    <TypewriterEffect
                      words={["Finance Companion", "Money Manager", "Budget Tracker", "Expense Logger"]}
                      typingSpeed={80}
                      deletingSpeed={40}
                      pauseDuration={2500}
                    />
                  </span>
                </h1>

                <p className="body-large max-w-xl mx-auto lg:mx-0 text-balance">
                  Track income and expenses effortlessly. Fast, secure, offline-first, and designed for simplicity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button asChild variant="hero" size="lg" className="shadow-glow">
                  <Link to="/download">
                    <Sparkles className="w-4 h-4" />
                    Download Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="lg">
                  <Link to="/features">Explore Features</Link>
                </Button>
              </motion.div>

              {/* Social proof strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex items-center gap-8 pt-4 justify-center lg:justify-start"
              >
                {[
                  { icon: <Download className="w-4 h-4" />, value: "1K+", label: "Downloads" },
                  { icon: <Star className="w-4 h-4" />, value: "4.8", label: "Rating" },
                  { icon: <Users className="w-4 h-4" />, value: "5K+", label: "Users" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-primary mb-0.5">
                      {stat.icon}
                      <span className="font-display font-bold text-xl text-foreground">{stat.value}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-110" aria-hidden="true" />

                <div className="relative animate-float">
                  {/* Phone frame */}
                  <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2.5rem] lg:rounded-[3rem] p-2 lg:p-3 shadow-elevated">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 lg:w-28 h-5 lg:h-7 bg-zinc-900 rounded-b-xl lg:rounded-b-2xl z-10 flex items-center justify-center">
                      <div className="w-12 lg:w-16 h-2.5 lg:h-4 bg-zinc-800 rounded-full" />
                    </div>
                    <div className="relative bg-black rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden pt-6 lg:pt-7">
                      <img
                        src="/img/Screenshot/1s.jpg"
                        alt="DhanDiary App Dashboard showing expense tracking"
                        className="block w-56 sm:w-64 lg:w-80 h-auto"
                        loading="eager"
                      />
                    </div>
                    <div className="absolute bottom-1.5 lg:bottom-2 left-1/2 -translate-x-1/2 w-20 lg:w-28 h-1 sm:h-1.5 bg-zinc-600 rounded-full" />
                  </div>

                  {/* Floating cards */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="absolute -top-4 -right-4 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-3 shadow-elevated hidden sm:block"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Income</p>
                        <p className="font-semibold text-green-500 text-sm">+₹25,000</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="absolute -bottom-4 -left-4 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-3 shadow-elevated hidden sm:block"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Savings</p>
                        <p className="font-semibold text-primary text-sm">₹12,500</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ NARRATIVE / STORYTELLING ============ */}
      <NarrativeSection narrativeBlocks={narrativeBlocks} />

      {/* ============ FEATURES ============ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeUp" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Features</p>
            <h2 className="heading-2 text-foreground text-balance">
              Everything you need. Nothing you don't.
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="group h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-base lg:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal animation="fadeUp" delay={0.4} className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/features">
                View All Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* How It Works */}
      <ScrollReveal animation="fadeUp">
        <HowItWorks />
      </ScrollReveal>

      <div className="section-divider" />

      {/* Stats */}
      <ScrollReveal animation="fadeUp">
        <StatsCounter />
      </ScrollReveal>

      {/* Partners */}
      <ScrollReveal animation="fadeUp">
        <PartnersSection />
      </ScrollReveal>

      <div className="section-divider" />

      {/* Screenshots */}
      <ScrollReveal animation="fadeUp">
        <ScreenshotCarousel />
      </ScrollReveal>

      <div className="section-divider" />

      {/* Comparison */}
      <ScrollReveal animation="fadeUp">
        <ComparisonTable />
      </ScrollReveal>

      <div className="section-divider" />

      {/* Testimonials */}
      <ScrollReveal animation="fadeUp">
        <Testimonials />
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal animation="fadeUp">
        <FAQ />
      </ScrollReveal>

      {/* ============ COMPARE CTA ============ */}
      <section className="section-padding bg-section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fadeUp">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="heading-2 text-foreground text-balance">
                See how DhanDiary stacks up
              </h2>
              <p className="body-large max-w-xl mx-auto">
                Compare DhanDiary with Walnut, Money Manager, Monefy and other popular expense trackers in India.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link to="/compare">
                  Compare Expense Trackers
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal animation="scale">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="heading-2 text-foreground text-balance">
                Ready to take control of your finances?
              </h2>
              <p className="body-large max-w-xl mx-auto">
                Download DhanDiary today. Free, secure, and private — forever.
              </p>
              <div className="pt-2">
                <Button asChild variant="hero" size="lg" className="shadow-glow">
                  <Link to="/download">
                    <Sparkles className="w-4 h-4" />
                    Get DhanDiary Now
                    <ArrowRight className="w-5 h-5" />
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

export default Home;
