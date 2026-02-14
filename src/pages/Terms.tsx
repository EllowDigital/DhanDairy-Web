import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";
import PageHero from "@/components/shared/PageHero";
import SectionCard from "@/components/shared/SectionCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import {
  Scale,
  User,
  Shield,
  CreditCard,
  BadgeCheck,
  Link2,
  Ban,
  AlertTriangle,
  Gavel,
  RefreshCcw,
  Mail,
} from "lucide-react";

const sections = [
  {
    icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By downloading, installing, or using DhanDiary, you agree to these Terms
        &amp; Conditions. If you are accepting on behalf of a company, you
        represent that you have the authority to bind that entity.
      </p>
    ),
  },
  {
    icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "2. Eligibility & Accounts",
    content: (
      <ul className="list-disc list-inside space-y-1.5 sm:space-y-2">
        <li>
          You must be at least 13 years old or of legal age in your
          jurisdiction.
        </li>
        <li>Account credentials must be kept confidential.</li>
        <li>You are responsible for all activity under your account.</li>
        <li>
          Accounts violating these terms or applicable law may be suspended or
          terminated.
        </li>
      </ul>
    ),
  },
  {
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "3. Permitted Use",
    content: (
      <>
        <p>
          DhanDiary is provided for personal or organizational finance tracking
          only.
        </p>
        <p className="mt-2 sm:mt-3 font-medium text-foreground">
          You agree NOT to:
        </p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>
            Reverse engineer, decompile, or extract source code except where
            permitted by law.
          </li>
          <li>Upload malicious code, automated scripts, or excessive data.</li>
          <li>
            Use the service for unlawful, fraudulent, or infringing activities.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "4. Subscription & Fees",
    content: (
      <>
        <p>
          Core mobile functionality is currently free. If paid tiers are
          introduced, pricing and billing details will be disclosed in advance.
        </p>
        <p className="mt-2 sm:mt-3">
          Taxes may apply. All fees are non-refundable unless required by law.
        </p>
      </>
    ),
  },
  {
    icon: <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "5. Intellectual Property",
    content: (
      <p>
        All logos, trademarks, code, and content provided by EllowDigital remain
        our property. You retain ownership of the content you input into the
        service.
      </p>
    ),
  },
  {
    icon: <Link2 className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "6. Third-Party Services",
    content: (
      <p>
        Some features rely on third-party services such as databases, analytics,
        or authentication providers. Their individual terms may apply.
      </p>
    ),
  },
  {
    icon: <Ban className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "7. Termination",
    content: (
      <>
        <p>You may stop using DhanDiary at any time.</p>
        <p className="mt-2 sm:mt-3 font-medium text-foreground">
          We may suspend or terminate access if you:
        </p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>Breach these terms</li>
          <li>Engage in fraud</li>
          <li>Present security risks</li>
        </ul>
        <p className="mt-2 sm:mt-3">
          Upon termination, cloud data may be deleted. Local data remains on
          your device until you remove it.
        </p>
      </>
    ),
  },
  {
    icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "8. Disclaimers",
    content: (
      <p>
        DhanDiary is provided &quot;AS IS&quot; without warranties of any kind,
        including implied warranties of merchantability or fitness for a
        particular purpose.
      </p>
    ),
  },
  {
    icon: <Gavel className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "9. Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, EllowDigital is not liable for
          indirect, incidental, special, or consequential damages.
        </p>
        <p className="mt-2 sm:mt-3 font-medium text-foreground">
          Total liability is limited to the greater of:
        </p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>INR 500, or</li>
          <li>The amount paid in the previous six months.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Gavel className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "10. Governing Law & Disputes",
    content: (
      <>
        <p>These terms are governed by the laws of India.</p>
        <p className="mt-2 sm:mt-3">
          Jurisdiction: Courts located in Delhi, India.
        </p>
      </>
    ),
  },
  {
    icon: <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "11. Changes to Terms",
    content: (
      <p>
        Terms may be updated due to new features or legal requirements.
        Continued use after the effective date constitutes acceptance.
      </p>
    ),
  },
  {
    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "12. Contact",
    content: (
      <div className="space-y-1">
        <p>
          Developer Email:{" "}
          <a
            href="mailto:sarwanyadav6174@gmail.com"
            className="text-primary hover:underline"
          >
            sarwanyadav6174@gmail.com
          </a>
        </p>
        <p>
          Team Email:{" "}
          <a
            href="mailto:ellowdigitalindia@gmail.com"
            className="text-primary hover:underline"
          >
            ellowdigitalindia@gmail.com
          </a>
        </p>
      </div>
    ),
  },
];

const Terms = () => {
  return (
    <Layout>
      <SEOHead {...pageSEO.terms} />
      <PageHero
        badge={{ icon: <Scale className="w-4 h-4" />, text: "Legal" }}
        title="Terms & Conditions"
        description="Effective Date: 12 December 2025"
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-4 sm:space-y-6">
            <AnimatedSection>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-primary/20">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2">
                  DhanDiary — Terms &amp; Conditions
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  These Terms &amp; Conditions describe the mutual
                  responsibilities between you and EllowDigital when using the
                  DhanDiary mobile, desktop, or web products.
                </p>
              </div>
            </AnimatedSection>

            {sections.map((section, index) => (
              <SectionCard
                key={index}
                icon={section.icon}
                title={section.title}
                delay={index * 0.05}
              >
                {section.content}
              </SectionCard>
            ))}
          </div>

          <AnimatedSection delay={0.6} className="mt-8 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Effective date: 12 December 2025
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
