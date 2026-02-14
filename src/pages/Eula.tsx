import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import SectionCard from "@/components/shared/SectionCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";
import {
  KeyRound,
  Shield,
  RefreshCcw,
  BadgeCheck,
  Link2,
  Ban,
  AlertTriangle,
  Globe,
  Mail,
} from "lucide-react";

const sections = [
  {
    icon: <KeyRound className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "1. License Grant",
    content: (
      <p>
        You are granted a limited, revocable, non-exclusive, non-transferable
        license to install and use DhanDiary on devices you own or control.
      </p>
    ),
  },
  {
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "2. Restrictions",
    content: (
      <>
        <p className="font-medium text-foreground">You may NOT:</p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>Rent, lease, sell, sublicense, or redistribute the software.</li>
          <li>Copy or modify the app except as permitted by law.</li>
          <li>Bypass security features or license checks.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "3. Updates & Availability",
    content: (
      <>
        <p>Updates may be installed automatically.</p>
        <p className="mt-2 sm:mt-3">
          We are not obligated to provide ongoing support or updates.
        </p>
      </>
    ),
  },
  {
    icon: <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "4. Ownership",
    content: (
      <p>
        EllowDigital retains all ownership and intellectual property rights.
        This agreement does not transfer ownership to you.
      </p>
    ),
  },
  {
    icon: <Link2 className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "5. Third-Party Components",
    content: (
      <p>
        The software may include open-source or third-party components governed
        by their own licenses.
      </p>
    ),
  },
  {
    icon: <Ban className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "6. Termination",
    content: (
      <p>
        This EULA remains effective until terminated. Upon termination, you must
        uninstall and delete all copies of the software.
      </p>
    ),
  },
  {
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "7. Export Compliance",
    content: (
      <p>
        You agree to comply with all applicable export laws and regulations.
      </p>
    ),
  },
  {
    icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "8. Disclaimer of Warranty",
    content: (
      <p>
        The software is provided &quot;AS IS&quot; without warranties of any
        kind. You assume all risks related to its use.
      </p>
    ),
  },
  {
    icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "9. Limitation of Liability",
    content: (
      <>
        <p>
          EllowDigital is not liable for incidental or consequential damages.
          Liability is limited to:
        </p>
        <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
          <li>Amount paid for the license, or</li>
          <li>INR 500 if no fees were paid.</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "10. Contact",
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

const Eula = () => {
  return (
    <Layout>
      <SEOHead {...pageSEO.eula} />
      <PageHero
        badge={{ icon: <KeyRound className="w-4 h-4" />, text: "License" }}
        title="End User License Agreement (EULA)"
        description="Effective Date: 12 December 2025"
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-4 sm:space-y-6">
            <AnimatedSection>
              <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-primary/20">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2">
                  DhanDiary — End User License Agreement (EULA)
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  This EULA is a legal agreement between you and EllowDigital
                  governing the installation and use of the DhanDiary software.
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
              Effective date: 12 December 2025
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Eula;
