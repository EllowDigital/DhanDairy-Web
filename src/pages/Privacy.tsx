import { motion } from "framer-motion";
import { Shield, Database, Lock, Users, FileText, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import SectionCard from "@/components/shared/SectionCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const sections = [
  {
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "1. Data We Collect",
    content: (
      <>
        <p>We collect only what is necessary to provide our services:</p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>
            <span className="font-medium text-foreground">
              Profile Details:
            </span>{" "}
            Name (optional) and email address
          </li>
          <li>
            <span className="font-medium text-foreground">
              Finance Entries:
            </span>{" "}
            Income, expenses, categories, notes, and attachments
          </li>
          <li>
            <span className="font-medium text-foreground">Diagnostics:</span>{" "}
            Device info, OS version, crash logs, anonymized usage data
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "2. How We Use Data",
    content: (
      <>
        <p>Data is used to:</p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>Display ledgers, charts, and insights</li>
          <li>Authenticate and sync accounts</li>
          <li>Provide optional cloud backups</li>
          <li>Improve stability and performance</li>
        </ul>
        <p className="mt-2 sm:mt-3 font-medium text-foreground">
          We never sell or rent personal data.
        </p>
      </>
    ),
  },
  {
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "3. Cloud Backup & Sync",
    content: (
      <ul className="list-disc list-inside space-y-1.5 sm:space-y-2">
        <li>Cloud sync is optional</li>
        <li>Data is transmitted securely over HTTPS</li>
        <li>Data is encrypted at rest</li>
        <li>Only authenticated sessions can access data</li>
      </ul>
    ),
  },
  {
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "4. Security Practices",
    content: (
      <ul className="list-disc list-inside space-y-1.5 sm:space-y-2">
        <li>Secure credential storage</li>
        <li>Enforced transport encryption</li>
        <li>Regular dependency updates</li>
        <li>Restricted access to production data</li>
      </ul>
    ),
  },
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "5. Sharing & Third Parties",
    content: (
      <>
        <p>We do not share personal or financial data with marketers.</p>
        <p className="mt-2 sm:mt-3">Limited partners include:</p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>Database hosting providers</li>
          <li>Authentication services</li>
          <li>Analytics and crash-reporting tools</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "6. Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>Access and export your data</li>
          <li>Request deletion of backups</li>
          <li>Manage preferences in-app</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "7. Retention & Data Residency",
    content: (
      <ul className="list-disc list-inside space-y-1.5 sm:space-y-2">
        <li>Local data stays on your device until deleted</li>
        <li>Cloud backups remain until account deletion</li>
        <li>Infrastructure complies with Indian privacy regulations</li>
      </ul>
    ),
  },
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "8. Children's Privacy",
    content: (
      <p>
        DhanDiary is not intended for children under 13. We do not knowingly
        collect children's data.
      </p>
    ),
  },
  {
    icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "9. Policy Changes",
    content: (
      <p>
        This policy may be updated due to legal or feature changes. Material
        updates will be announced in-app.
      </p>
    ),
  },
  {
    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "10. Contact Us",
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

const Privacy = () => {
  return (
    <Layout>
      <SEOHead {...pageSEO.privacy} />
      <PageHero
        badge={{ icon: <Shield className="w-4 h-4" />, text: "Privacy First" }}
        title="Privacy Policy"
        description="Last Updated: 12 December 2025"
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-4 sm:space-y-6">
            <AnimatedSection>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-primary/20">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2">
                  Privacy Policy
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  DhanDiary provides finance tools designed with privacy by
                  default. This policy explains what data we collect and how it
                  is used.
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

          <AnimatedSection delay={0.5} className="mt-8 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Last updated: 12 December 2025
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
