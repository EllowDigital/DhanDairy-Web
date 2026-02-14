import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import PageHero from "@/components/shared/PageHero";
import SectionCard from "@/components/shared/SectionCard";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

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
  return (
    <Layout>
      <SEOHead {...pageSEO.about} />
      <PageHero
        title="About DhanDiary"
        description="Built with passion for simple, secure personal finance management."
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            {/* Our Story */}
            <SectionCard
              icon={<Heart className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Our Story"
            >
              <div className="space-y-3 sm:space-y-4">
                <p>
                  DhanDiary was born from a simple frustration – most finance
                  apps are bloated with features, filled with ads, and often
                  compromise on privacy. We wanted something different: a clean,
                  fast, and secure way to track daily income and expenses
                  without the noise.
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
            </SectionCard>

            {/* Our Mission */}
            <SectionCard
              icon={<Target className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Our Mission"
              delay={0.1}
            >
              <div className="space-y-3 sm:space-y-4">
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
            </SectionCard>

            {/* Our Values */}
            <AnimatedSection delay={0.2}>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-primary/20">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Our Values
                  </h2>
                </div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {values.map((value, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent flex items-center justify-center text-primary shrink-0">
                          {value.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">
                            {value.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>

            {/* Developer Info */}
            <AnimatedSection delay={0.3}>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center">
                  Meet the Team
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent flex items-center justify-center text-primary">
                      <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Developer
                      </p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        Sarwan Yadav
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent flex items-center justify-center text-primary">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Company
                      </p>
                      <a
                        href="https://ellowdigital.space"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base"
                      >
                        EllowDigital
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.4} className="mt-10 sm:mt-12 text-center">
            <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
              Ready to start your journey with DhanDiary?
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/download">
                Download Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
