import { motion } from "framer-motion";
import {
  Mail,
  ExternalLink,
  User,
  Building2,
  MessageCircle,
  Clock,
  Send,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";
import PageHero from "@/components/shared/PageHero";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Email Support",
    value: "sarwanyadav6174@gmail.com",
    description: "For questions, feedback, or bug reports",
    href: "mailto:sarwanyadav6174@gmail.com",
    primary: true,
  },
  {
    icon: <ExternalLink className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: "Developer Website",
    value: "ellowdigital.space",
    description: "Visit our company website for more projects",
    href: "https://ellowdigital.space",
    primary: false,
  },
];

const teamMembers = [
  {
    icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
    role: "Developer",
    name: "Sarwan Yadav",
  },
  {
    icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />,
    role: "Company",
    name: "EllowDigital",
    href: "https://ellowdigital.space",
  },
];

const Contact = () => {
  return (
    <Layout>
      <SEOHead {...pageSEO.contact} />
      <PageHero
        badge={{
          icon: <MessageCircle className="w-4 h-4" />,
          text: "Get in Touch",
        }}
        title="Contact & Support"
        description="Need help or have feedback? We'd love to hear from you."
      />

      {/* Contact Info */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => (
              <StaggerItem key={index}>
                <motion.a
                  href={method.href}
                  target={
                    method.href.startsWith("mailto") ? undefined : "_blank"
                  }
                  rel={
                    method.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`block p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 group h-full ${
                    method.primary
                      ? "bg-accent/50 border-primary/20 hover:border-primary/40"
                      : "bg-card border-border hover:border-primary/30"
                  } hover:shadow-card`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-colors ${
                      method.primary
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">
                    {method.title}
                  </h3>
                  <p className="text-primary font-medium text-sm sm:text-base mb-0.5 sm:mb-1">
                    {method.value}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {method.description}
                  </p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Developer Info */}
          <AnimatedSection delay={0.2} className="mt-8 sm:mt-12">
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
              <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 text-center">
                About the Developer
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent flex items-center justify-center text-primary">
                      {member.icon}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {member.role}
                      </p>
                      {member.href ? (
                        <a
                          href={member.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base"
                        >
                          {member.name}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground text-sm sm:text-base">
                          {member.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Response Time */}
          <AnimatedSection delay={0.3} className="mt-6 sm:mt-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm sm:text-base p-4 rounded-xl bg-muted/30">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <p>We typically respond to emails within 24-48 hours.</p>
            </div>
          </AnimatedSection>

          {/* Quick Contact CTA */}
          <AnimatedSection delay={0.4} className="mt-8 sm:mt-12">
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-primary/20 text-center">
              <Send className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2">
                Have a Quick Question?
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto">
                Drop us an email and we'll get back to you as soon as possible.
              </p>
              <a
                href="mailto:sarwanyadav6174@gmail.com"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg sm:rounded-xl font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Email
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
