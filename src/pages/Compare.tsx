import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Minus,
  ArrowRight,
  Shield,
  WifiOff,
  Smartphone,
  BarChart3,
  Lock,
  Download,
  Zap,
  Star,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const competitors = [
  { key: "dhandiary", name: "DhanDiary", highlight: true },
  { key: "walnut", name: "Walnut", highlight: false },
  { key: "moneyManager", name: "Money Manager", highlight: false },
  { key: "monefy", name: "Monefy", highlight: false },
];

type FeatureValue = true | false | "partial";

interface CompFeature {
  name: string;
  dhandiary: FeatureValue;
  walnut: FeatureValue;
  moneyManager: FeatureValue;
  monefy: FeatureValue;
}

const comparisonFeatures: CompFeature[] = [
  { name: "100% Free (No Premium)", dhandiary: true, walnut: false, moneyManager: false, monefy: false },
  { name: "No Ads", dhandiary: true, walnut: false, moneyManager: false, monefy: false },
  { name: "Works Fully Offline", dhandiary: true, walnut: false, moneyManager: true, monefy: true },
  { name: "Privacy First (No Trackers)", dhandiary: true, walnut: false, moneyManager: false, monefy: false },
  { name: "Local Data Storage", dhandiary: true, walnut: false, moneyManager: true, monefy: true },
  { name: "Cloud Backup & Sync", dhandiary: true, walnut: true, moneyManager: "partial", monefy: "partial" },
  { name: "Charts & Analytics", dhandiary: true, walnut: true, moneyManager: true, monefy: "partial" },
  { name: "Export to PDF/CSV/Excel", dhandiary: true, walnut: "partial", moneyManager: true, monefy: "partial" },
  { name: "Category Management", dhandiary: true, walnut: true, moneyManager: true, monefy: true },
  { name: "Dark Mode", dhandiary: true, walnut: false, moneyManager: true, monefy: false },
  { name: "No Account Required", dhandiary: true, walnut: false, moneyManager: true, monefy: true },
  { name: "UPI Transaction Support", dhandiary: true, walnut: true, moneyManager: false, monefy: false },
  { name: "Multi-language (Hindi)", dhandiary: true, walnut: false, moneyManager: false, monefy: false },
  { name: "Open Source Friendly", dhandiary: true, walnut: false, moneyManager: false, monefy: false },
];

const advantages = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Zero Data Collection",
    description: "DhanDiary stores everything locally on your device. No servers snooping on your finances.",
  },
  {
    icon: <WifiOff className="w-5 h-5" />,
    title: "True Offline First",
    description: "Unlike Walnut which needs internet, DhanDiary works 100% offline from day one.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "No Ads, Ever",
    description: "While competitors show banner ads and premium popups, DhanDiary remains completely ad-free.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "No Premium Paywall",
    description: "Every feature is free. No 'Pro' tier, no subscriptions, no in-app purchases.",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Beautiful Insights",
    description: "Clean charts and financial reports that rival premium apps — included free.",
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: "Export Everything",
    description: "PDF, CSV, Excel exports with custom date ranges — no premium upgrade needed.",
  },
];

const faqs = [
  {
    q: "Is DhanDiary really better than Walnut?",
    a: "For privacy-conscious users, absolutely. Walnut reads your SMS messages and requires internet. DhanDiary works offline, never reads your messages, and stores data locally. However, Walnut offers automatic SMS-based transaction detection which DhanDiary doesn't — so it depends on your priorities.",
  },
  {
    q: "Why should I switch from Money Manager to DhanDiary?",
    a: "Money Manager is a solid app, but it shows ads and locks some features behind a paywall. DhanDiary gives you all features for free with no ads. Plus, DhanDiary supports Hindi language and UPI transaction tracking.",
  },
  {
    q: "Does DhanDiary auto-track UPI transactions?",
    a: "DhanDiary supports manual UPI transaction logging with smart categorization. It doesn't read your SMS or UPI notifications for privacy reasons — your transaction data stays fully private.",
  },
  {
    q: "Can I import data from other expense trackers?",
    a: "Currently, DhanDiary supports manual entry and CSV import. We're working on direct import from popular apps in a future update. Check our Roadmap for details.",
  },
  {
    q: "Is DhanDiary available on iOS?",
    a: "DhanDiary is currently Android-only. It's available on Samsung Galaxy Store, Indus App Store, Amazon Appstore, Huawei AppGallery, and as a direct APK download.",
  },
  {
    q: "How does DhanDiary make money if it's free?",
    a: "DhanDiary is a passion project by EllowDigital. It's built to provide a genuinely free, private finance tracker for India. There are no hidden monetization schemes.",
  },
];

const FeatureIcon = ({ value }: { value: FeatureValue }) => {
  if (value === true) {
    return (
      <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
        <Check className="w-4 h-4 text-green-500" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
        <X className="w-4 h-4 text-red-500" />
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-yellow-500/15 flex items-center justify-center mx-auto">
      <Minus className="w-4 h-4 text-yellow-500" />
    </div>
  );
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "DhanDiary vs Other Expense Trackers – Feature Comparison",
  description:
    "Compare DhanDiary with Walnut, Money Manager, and Monefy. See which expense tracker is best for privacy, offline use, and free features in India.",
  url: "https://dhandiary.netlify.app/compare",
  mainEntity: {
    "@type": "ItemList",
    name: "Expense Tracker Comparison",
    itemListElement: competitors.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
    })),
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dhandiary.netlify.app/" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://dhandiary.netlify.app/compare" },
    ],
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Compare = () => {
  return (
    <Layout>
      <SEOHead
        title="DhanDiary vs Walnut vs Money Manager – Best Expense Tracker Comparison"
        description="Compare DhanDiary with Walnut, Money Manager & Monefy. See why DhanDiary is India's best free, private, offline expense tracker with no ads. Feature-by-feature comparison."
        keywords="DhanDiary vs Walnut, DhanDiary vs Money Manager, DhanDiary vs Monefy, best expense tracker India, expense tracker comparison, free expense tracker, DhanDiary comparison, best finance app India 2025, offline expense tracker comparison, privacy expense tracker, no ads finance app, DhanDiary review"
        canonical="/compare"
        structuredData={structuredData}
      />

      {/* Extra FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge={{ icon: <Star className="w-4 h-4" />, text: "Comparison" }}
        title={<>DhanDiary vs Other <span className="text-gradient">Expense Trackers</span></>}
        description="An honest, feature-by-feature comparison of DhanDiary with popular expense trackers in India. See why thousands choose DhanDiary."
      />

      {/* ============ COMPARISON TABLE ============ */}
      <section className="section-padding bg-background !pt-0 !-mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp">
            <div className="max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 gap-1 lg:gap-4 p-4 lg:p-5 bg-primary/[0.04] border-b border-border">
                  <div className="text-left">
                    <span className="font-semibold text-foreground text-sm">Feature</span>
                  </div>
                  {competitors.map((c) => (
                    <div key={c.key} className="text-center">
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          c.highlight ? "text-primary font-bold" : "text-muted-foreground"
                        }`}
                      >
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Rows */}
                <div className="divide-y divide-border">
                  {comparisonFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="grid grid-cols-5 gap-1 lg:gap-4 p-3 lg:p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="text-left flex items-center">
                        <span className="text-foreground text-xs sm:text-sm">{feature.name}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <FeatureIcon value={feature.dhandiary} />
                      </div>
                      <div className="flex items-center justify-center">
                        <FeatureIcon value={feature.walnut} />
                      </div>
                      <div className="flex items-center justify-center">
                        <FeatureIcon value={feature.moneyManager} />
                      </div>
                      <div className="flex items-center justify-center">
                        <FeatureIcon value={feature.monefy} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
                {[
                  { icon: <Check className="w-3 h-3 text-green-500" />, bg: "bg-green-500/15", label: "Full Support" },
                  { icon: <Minus className="w-3 h-3 text-yellow-500" />, bg: "bg-yellow-500/15", label: "Partial" },
                  { icon: <X className="w-3 h-3 text-red-500" />, bg: "bg-red-500/15", label: "Not Available" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full ${item.bg} flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ WHY DHANDIARY WINS ============ */}
      <section className="section-padding bg-section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Why DhanDiary
            </p>
            <h2 className="heading-2 text-foreground text-balance">
              What makes DhanDiary different
            </h2>
            <p className="body-large mt-4">
              Built for India. Built for privacy. Built to be free — forever.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advantages.map((adv, index) => (
              <StaggerItem key={index}>
                <div className="group h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {adv.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-base lg:text-lg">
                    {adv.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ FAQ ============ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="heading-2 text-foreground text-balance">
              Common questions about switching
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/20 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-foreground font-medium text-sm sm:text-base hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ CTA ============ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection animation="scale">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="heading-2 text-foreground text-balance">
                Ready to switch to DhanDiary?
              </h2>
              <p className="body-large max-w-xl mx-auto">
                Join thousands of users who chose privacy, simplicity, and freedom.
                Download DhanDiary free today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button asChild variant="hero" size="lg" className="shadow-glow">
                  <Link to="/download">
                    <Smartphone className="w-4 h-4" />
                    Download Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/features">
                    Explore Features
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Compare;
