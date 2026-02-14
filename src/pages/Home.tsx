import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Shield,
  Wifi,
  WifiOff,
  BarChart3,
  Lock,
  Star,
  Download,
  Users,
  TrendingUp,
  Sparkles,
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
import FloatingParticles from "@/components/home/FloatingParticles";
import TypewriterEffect from "@/components/home/TypewriterEffect";
import { APP_CONFIG } from "@/lib/appConfig";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const features = [
  {
    icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Track Income & Expenses",
    description:
      "Log your daily transactions with ease. Clean, simple, and fast.",
  },
  {
    icon: <WifiOff className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Works Offline",
    description:
      "Full functionality without internet. Auto-syncs when you're back online.",
  },
  {
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Privacy First",
    description:
      "No ads, no trackers. Your financial data stays private and secure.",
  },
  {
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Secure Login",
    description: "Email verification and OAuth support with Google & GitHub.",
  },
];

const stats = [
  {
    icon: <Download className="w-4 h-4" />,
    value: "1K+",
    label: "Downloads",
  },
  {
    icon: <Star className="w-4 h-4" />,
    value: "4.8",
    label: "Rating",
  },
  {
    icon: <Users className="w-4 h-4" />,
    value: "5K+",
    label: "Active Users",
  },
];

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <Layout>
      <SEOHead {...pageSEO.home} />
      {/* Hero Section - Enhanced with Parallax */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-mesh-gradient min-h-[100dvh] lg:min-h-[calc(100vh-5rem)] flex items-center pt-16 lg:pt-20"
      >
        {/* Floating Particles */}
        <FloatingParticles />

        {/* Parallax Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: y1, scale: scale1, rotate: rotate1, opacity: opacity1 }}
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2, scale: scale2, rotate: rotate2, opacity: opacity1 }}
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-52 sm:w-96 h-52 sm:h-96 bg-accent/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y3, opacity: opacity1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full"
          />
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -80]),
              opacity: opacity1,
            }}
            className="absolute top-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-full blur-2xl"
          />
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, 120]),
              opacity: opacity1,
            }}
            className="absolute bottom-1/3 left-1/4 w-32 sm:w-40 h-32 sm:h-40 bg-accent/10 rounded-full blur-2xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16 relative w-full">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 space-y-4 sm:space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="truncate">
                  Version {APP_CONFIG.version} — Now Available
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-1 text-foreground text-balance"
              >
                Your Personal
                <span className="text-gradient block mt-1 sm:mt-2">
                  <TypewriterEffect
                    words={[
                      "Finance Companion",
                      "Money Manager",
                      "Budget Tracker",
                      "Expense Logger",
                    ]}
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseDuration={2500}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="body-large max-w-lg mx-auto lg:mx-0 text-balance"
              >
                Track income and expenses effortlessly. DhanDiary is fast,
                secure, offline-first, and designed for simplicity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2"
              >
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="w-full xs:w-auto shadow-glow"
                >
                  <Link to="/download">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Download Free
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="heroOutline"
                  size="lg"
                  className="w-full xs:w-auto"
                >
                  <Link to="/features">Explore Features</Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-6 sm:gap-8 pt-4 sm:pt-6 justify-center lg:justify-start"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-primary mb-0.5">
                      {stat.icon}
                      <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-foreground">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 justify-center lg:justify-start"
              >
                {[
                  {
                    icon: <Shield className="w-3.5 h-3.5 text-primary" />,
                    label: "No Ads",
                  },
                  {
                    icon: <Wifi className="w-3.5 h-3.5 text-primary" />,
                    label: "Offline First",
                  },
                  {
                    icon: <Lock className="w-3.5 h-3.5 text-primary" />,
                    label: "Secure",
                  },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm px-3 py-1.5 rounded-full bg-card/80 border border-border backdrop-blur-sm"
                  >
                    {badge.icon}
                    {badge.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-hero-gradient opacity-20 sm:opacity-30 blur-3xl rounded-full scale-110 sm:scale-125" />

                {/* Phone Frame */}
                <div className="relative animate-float">
                  <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] p-1.5 sm:p-2 lg:p-3 shadow-elevated">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 lg:w-28 h-4 sm:h-5 lg:h-7 bg-zinc-900 rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl z-10 flex items-center justify-center">
                      <div className="w-10 sm:w-12 lg:w-16 h-2 sm:h-3 lg:h-4 bg-zinc-800 rounded-full" />
                    </div>
                    {/* Screen */}
                    <div className="relative bg-black rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden pt-5 sm:pt-6 lg:pt-7">
                      <img
                        src="/img/Screenshot/1s.jpg"
                        alt="DhanDiary App Dashboard"
                        className="block w-44 xs:w-52 sm:w-64 md:w-72 lg:w-80 h-auto object-cover"
                        loading="eager"
                      />
                    </div>
                    {/* Home Indicator */}
                    <div className="absolute bottom-1 sm:bottom-1.5 lg:bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 lg:w-28 h-1 sm:h-1.5 bg-zinc-600 rounded-full" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -top-2 sm:-top-3 lg:-top-4 -right-1 sm:-right-2 lg:-right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-2.5 lg:p-3 shadow-elevated hidden xs:block"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground">
                          Income
                        </p>
                        <p className="font-semibold text-green-500 text-[10px] sm:text-xs lg:text-sm">
                          +₹25,000
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 -left-1 sm:-left-2 lg:-left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-2.5 lg:p-3 shadow-elevated hidden xs:block"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground">
                          Savings
                        </p>
                        <p className="font-semibold text-primary text-[10px] sm:text-xs lg:text-sm">
                          ₹12,500
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal
            animation="fadeUp"
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
              Why Choose DhanDiary?
            </h2>
            <p className="body-default">
              Built with simplicity and privacy at its core. Everything you
              need, nothing you don't.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="group h-full p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-card-gradient border border-border hover:border-primary/30 hover:shadow-card hover-lift">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-accent flex items-center justify-center text-primary mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1.5 sm:mb-2 text-sm sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal
            animation="fadeUp"
            delay={0.4}
            className="text-center mt-6 sm:mt-10 lg:mt-12"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full xs:w-auto"
            >
              <Link to="/features">
                View All Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works Section */}
      <ScrollReveal animation="fadeUp">
        <HowItWorks />
      </ScrollReveal>

      {/* Stats Counter Section */}
      <ScrollReveal animation="fadeUp">
        <StatsCounter />
      </ScrollReveal>

      {/* Partners/Featured Section */}
      <ScrollReveal animation="fadeUp">
        <PartnersSection />
      </ScrollReveal>

      {/* Screenshots Section */}
      <ScrollReveal animation="fadeUp">
        <ScreenshotCarousel />
      </ScrollReveal>

      {/* Comparison Table Section */}
      <ScrollReveal animation="fadeUp">
        <ComparisonTable />
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal animation="fadeUp">
        <Testimonials />
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal animation="fadeUp">
        <FAQ />
      </ScrollReveal>

      {/* CTA Section */}
      <section className="section-padding bg-mesh-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal animation="scale">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="body-default mb-6 sm:mb-8 max-w-xl mx-auto">
                Download DhanDiary today and start your journey to better money
                management. Free, secure, and private.
              </p>
              <Button
                asChild
                variant="hero"
                size="lg"
                className="w-full xs:w-auto shadow-glow"
              >
                <Link to="/download">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Get DhanDiary Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
