import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Heart,
  Target,
  Shield,
  ArrowRight,
  Users,
  Sparkles,
  Code,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/home/ScrollReveal";

const values = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Privacy First",
    description: "Your data is yours. We don't track, collect, or sell it.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Simplicity",
    description: "Clean design that gets out of your way.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Reliability",
    description: "Works offline, syncs seamlessly, never loses your data.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Accessibility",
    description: "Free for everyone, no hidden costs.",
  },
];

const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);

  return (
    <Layout>
      <SEOHead {...pageSEO.about} />

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
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
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
            <h1 className="heading-1 text-foreground">
              About <span className="text-gradient">DhanDiary</span>
            </h1>
            <p className="body-large max-w-2xl mx-auto text-balance">
              Built with passion for simple, secure personal finance management.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12 lg:space-y-20">
          {/* Our Story */}
          <ScrollReveal animation="fadeUp">
            <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    DhanDiary was born from a simple frustration – most finance
                    apps are bloated with features, filled with ads, and often
                    compromise on privacy. We wanted something different: a
                    clean, fast, and secure way to track daily income and
                    expenses without the noise.
                  </p>
                  <p>
                    Built and maintained independently by{" "}
                    <a
                      href="https://ellowdigital.space"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      EllowDigital
                    </a>
                    , DhanDiary is crafted with care for people who value
                    simplicity and privacy in their personal finance journey.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="section-divider" />

          {/* Our Mission */}
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10 shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    To provide everyone with a simple, secure, and reliable tool
                    for personal finance management – regardless of their
                    technical expertise or financial background.
                  </p>
                  <p>
                    We believe that tracking your money should be as natural as
                    checking the time. No learning curve, no subscriptions, no
                    compromises.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="section-divider" />

          {/* Our Values */}
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-accent/30 border border-primary/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-glow">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Our Values
                </h2>
              </div>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-primary/20 transition-all duration-300 hover-lift">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          <div className="section-divider" />

          {/* Team */}
          <ScrollReveal animation="fadeUp" delay={0.3}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              Meet the Team
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <Code className="w-6 h-6" />,
                  role: "Developer",
                  name: "Sarwan Yadav",
                  href: "",
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  role: "Company",
                  name: "EllowDigital",
                  href: "https://ellowdigital.space",
                },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {member.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                    {member.href ? (
                      <a
                        href={member.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {member.name}
                      </a>
                    ) : (
                      <p className="font-semibold text-foreground">
                        {member.name}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal animation="scale">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <p className="body-large">
                Ready to start your journey with DhanDiary?
              </p>
              <Button asChild variant="hero" size="lg" className="shadow-glow">
                <Link to="/download">
                  <Sparkles className="w-4 h-4" />
                  Download Free
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

export default About;
