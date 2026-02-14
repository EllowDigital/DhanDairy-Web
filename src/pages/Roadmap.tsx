import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Clock,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";
import PageHero from "@/components/shared/PageHero";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RoadmapItem = {
  text: string;
  status: "Released" | "In Progress" | "Planned";
};

const recentlyReleased: RoadmapItem[] = [
  { text: "Improved offline sync stability", status: "Released" },
  { text: "Faster app startup", status: "Released" },
  { text: "Enhanced security and login reliability", status: "Released" },
  { text: "Bug fixes and performance improvements", status: "Released" },
];

const inProgress: RoadmapItem[] = [
  { text: "Better analytics and insights", status: "In Progress" },
  { text: "Improved category management", status: "In Progress" },
  { text: "App stability improvements", status: "In Progress" },
  { text: "UI polish and usability enhancements", status: "In Progress" },
];

const planned: RoadmapItem[] = [
  { text: "Cloud backup improvements", status: "Planned" },
  { text: "Data export (CSV / PDF)", status: "Planned" },
  { text: "Custom categories and tags", status: "Planned" },
  { text: "App lock enhancements", status: "Planned" },
  { text: "Multi-device sync improvements", status: "Planned" },
];

const longTermVision = [
  "Smarter insights and summaries",
  "Better budgeting tools",
  "Improved accessibility",
  "Continued performance and reliability upgrades",
];

const statusBadge = (status: RoadmapItem["status"]) => {
  if (status === "Released") {
    return (
      <Badge className="bg-primary text-primary-foreground text-xs">
        Released
      </Badge>
    );
  }
  if (status === "In Progress") {
    return (
      <Badge variant="secondary" className="text-xs">
        In Progress
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs">
      Planned
    </Badge>
  );
};

const Roadmap = () => {
  return (
    <Layout>
      <SEOHead {...pageSEO.roadmap} />
      <PageHero
        badge={{
          icon: <Target className="w-4 h-4" />,
          text: "Product Roadmap",
        }}
        title="DhanDiary Roadmap"
        description="Here's what we're working on and what's coming next. This roadmap reflects our current plans and may evolve based on user feedback."
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Recently Released */}
            <AnimatedSection>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Recently Released
                  </h2>
                  <Badge className="bg-primary text-primary-foreground w-fit">
                    Released
                  </Badge>
                </div>
                <StaggerContainer className="grid gap-3 sm:gap-4">
                  {recentlyReleased.map((item, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/30 transition-colors">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3">
                            <p className="text-foreground font-medium text-sm sm:text-base">
                              {item.text}
                            </p>
                            <div className="w-fit">
                              {statusBadge(item.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>

            {/* In Progress */}
            <AnimatedSection delay={0.1}>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    In Progress
                  </h2>
                  <Badge variant="secondary" className="w-fit">
                    In Progress
                  </Badge>
                </div>
                <StaggerContainer className="grid gap-3 sm:gap-4">
                  {inProgress.map((item, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/30 transition-colors">
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0 animate-spin" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3">
                            <p className="text-foreground font-medium text-sm sm:text-base">
                              {item.text}
                            </p>
                            <div className="w-fit">
                              {statusBadge(item.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                <p className="text-muted-foreground text-xs sm:text-sm mt-4 sm:mt-6">
                  We avoid exact dates here, because app reviews and platform
                  rules can change unexpectedly.
                </p>
              </div>
            </AnimatedSection>

            {/* Planned */}
            <AnimatedSection delay={0.2}>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Planned (Coming Next)
                  </h2>
                  <Badge variant="outline" className="w-fit">
                    Planned
                  </Badge>
                </div>
                <StaggerContainer className="grid gap-3 sm:gap-4">
                  {planned.map((item, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/30 transition-colors">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3">
                            <p className="text-foreground font-medium text-sm sm:text-base">
                              {item.text}
                            </p>
                            <div className="w-fit">
                              {statusBadge(item.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>

            {/* Long-Term Vision */}
            <AnimatedSection delay={0.3}>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-primary/20">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Long-Term Vision
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                  These are high-level goals that guide where DhanDiary is going
                  over time.
                </p>
                <StaggerContainer className="grid gap-2 sm:gap-3">
                  {longTermVision.map((text, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <p className="text-foreground font-medium text-sm sm:text-base">
                          {text}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.4}>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border text-center">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-3 sm:mb-4" />
                <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2">
                  Want to help shape the roadmap?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-4 sm:mb-6">
                  Your feedback helps us prioritize improvements and build the
                  features that matter most.
                </p>
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    Share Feedback
                  </Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Footer note */}
            <p className="text-muted-foreground text-xs sm:text-sm text-center">
              This roadmap is subject to change based on user feedback and
              platform requirements.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Roadmap;
