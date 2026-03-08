import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  BookOpen,
  Shield,
  Download,
  Smartphone,
  CreditCard,
  RefreshCw,
  ArrowRight,
  Search,
  ChevronDown,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";
import PageHero from "@/components/shared/PageHero";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const guides = [
  {
    icon: <Download className="w-5 h-5" />,
    title: "Getting Started",
    description: "Download, install, and set up your DhanDiary account in minutes.",
    topics: ["Download the app", "Create your account", "Set up categories", "Add your first transaction"],
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Managing Transactions",
    description: "Learn how to track income, expenses, and manage your finances effectively.",
    topics: ["Add income & expenses", "Edit or delete entries", "Use categories & tags", "Filter and search"],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Privacy & Security",
    description: "Understand how DhanDiary keeps your financial data safe and private.",
    topics: ["Data encryption", "Offline storage", "No tracking policy", "Account security"],
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Backup & Sync",
    description: "Keep your data safe with cloud backup and sync across devices.",
    topics: ["Enable cloud backup", "Restore your data", "Sync settings", "Export to PDF/CSV"],
  },
];

const faqs = [
  {
    question: "Is DhanDiary really free?",
    answer: "Yes, DhanDiary is 100% free with no hidden charges, no premium tiers, and no in-app purchases. All features are available to every user.",
  },
  {
    question: "Does DhanDiary work offline?",
    answer: "Absolutely. DhanDiary is designed offline-first. You can add transactions, view charts, and manage your finances without any internet connection. Data syncs automatically when you're back online.",
  },
  {
    question: "How is my data protected?",
    answer: "Your data is encrypted and stored locally on your device. We never sell or share your data. There are no ads, no trackers, and no third-party analytics. Your finances are truly private.",
  },
  {
    question: "Can I export my financial data?",
    answer: "Yes, you can export your data in PDF and CSV formats. Go to Settings → Export Data to generate reports for any time period.",
  },
  {
    question: "How do I reset my password?",
    answer: "On the login screen, tap 'Forgot Password' and enter your registered email. You'll receive a reset link within minutes. Check your spam folder if you don't see it.",
  },
  {
    question: "Which devices are supported?",
    answer: "DhanDiary is available for Android devices running Android 7.0 (Nougat) and above. You can download it from Samsung Galaxy Store, Amazon Appstore, Huawei AppGallery, or directly via APK.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us at sarwanyadav6174@gmail.com. We typically respond within 24 hours. For faster help, include your device model and app version in your message.",
  },
  {
    question: "Can I suggest new features?",
    answer: "We love hearing from users! Send your feature suggestions to our email or visit our Roadmap page to see what's planned. Many features have been added based on user feedback.",
  },
];

const contactOptions = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Support",
    description: "Get a response within 24 hours",
    action: "sarwanyadav6174@gmail.com",
    href: "mailto:sarwanyadav6174@gmail.com",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Community",
    description: "Join discussions and get help from other users",
    action: "Visit Community",
    href: "https://ellowdigital.space",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Release Notes",
    description: "See what's new in the latest version",
    action: "View Updates",
    href: "/release-notes",
    internal: true,
  },
];

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <SEOHead {...pageSEO.help} />

      <PageHero
        badge={{ icon: <HelpCircle className="w-4 h-4" />, text: "Support" }}
        title="How can we help?"
        description="Find answers, explore guides, and get in touch with our support team."
      />

      {/* ============ SEARCH ============ */}
      <section className="section-padding bg-background !pt-0 !-mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-base"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ QUICK GUIDES ============ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Guides</p>
            <h2 className="heading-2 text-foreground text-balance">
              Quick start guides
            </h2>
            <p className="body-large mt-4">
              Step-by-step instructions to help you get the most out of DhanDiary.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {guides.map((guide, index) => (
              <StaggerItem key={index}>
                <div className="group h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {guide.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-base lg:text-lg">
                    {guide.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <ul className="space-y-2">
                    {guide.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ FAQ ============ */}
      <section className="section-padding bg-section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="heading-2 text-foreground text-balance">
              Frequently asked questions
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/20 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-foreground font-medium text-sm sm:text-base hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <p className="text-muted-foreground text-sm mt-1">Try a different search term or contact support below.</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ CONTACT OPTIONS ============ */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Contact</p>
            <h2 className="heading-2 text-foreground text-balance">
              Still need help?
            </h2>
            <p className="body-large mt-4">
              Reach out to us through any of these channels.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <StaggerItem key={index}>
                {option.internal ? (
                  <Link to={option.href} className="block h-full">
                    <div className="group h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 hover-lift text-center">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        {option.icon}
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{option.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                        {option.action} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <a href={option.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <div className="group h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 hover-lift text-center">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        {option.icon}
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{option.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                        {option.action} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection animation="scale">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="heading-2 text-foreground text-balance">
                Ready to simplify your finances?
              </h2>
              <p className="body-large max-w-xl mx-auto">
                Download DhanDiary today — free, private, and designed for you.
              </p>
              <div className="pt-2">
                <Button asChild variant="hero" size="lg" className="shadow-glow">
                  <Link to="/download">
                    <Smartphone className="w-4 h-4" />
                    Get DhanDiary Free
                    <ArrowRight className="w-5 h-5" />
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

export default HelpSupport;
