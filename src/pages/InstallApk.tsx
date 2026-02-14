import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Download,
  FileDown,
  Lock,
  Settings,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { APP_CONFIG, isApkDownloadLinkValid } from "@/lib/appConfig";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const steps = [
  {
    icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Step 1",
    text: (
      <>
        Tap{" "}
        <span className="font-semibold text-foreground">Download anyway</span>{" "}
        when Chrome shows a warning.
      </>
    ),
  },
  {
    icon: <FileDown className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Step 2",
    text: (
      <>
        After download completes, tap{" "}
        <span className="font-semibold text-foreground">Open</span> to start
        installing the APK file.
      </>
    ),
  },
  {
    icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Step 3",
    text: (
      <>
        If Android blocks the install, tap{" "}
        <span className="font-semibold text-foreground">Settings</span> when
        prompted.
      </>
    ),
  },
  {
    icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Step 4",
    text: (
      <>
        Turn ON the switch{" "}
        <span className="font-semibold text-foreground">
          Allow from this source
        </span>
        .
      </>
    ),
  },
  {
    icon: <Download className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Step 5",
    text: (
      <>
        Go back and tap{" "}
        <span className="font-semibold text-foreground">Install</span>.
      </>
    ),
  },
];

const InstallApk = () => {
  const apkValid = isApkDownloadLinkValid();

  return (
    <Layout>
      <SEOHead {...pageSEO.installApk} />

      <PageHero
        badge={{
          icon: <ShieldCheck className="w-4 h-4" />,
          text: "Help Center",
        }}
        title="How to Install DhanDiary APK on Android"
        description="If you downloaded DhanDiary directly from your browser, follow these simple steps to install it safely."
      />

      {/* Steps */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <StaggerContainer className="space-y-4 sm:space-y-6">
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                      <span className="font-bold text-sm sm:text-base">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">
                        {step.title}
                      </h2>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Reassurance */}
          <AnimatedSection delay={0.3} className="mt-8 sm:mt-10">
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-primary/20">
              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">
                    You're safe
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    DhanDiary is safe and does not contain ads or harmful
                    content.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Why warning */}
          <AnimatedSection delay={0.4} className="mt-6 sm:mt-8">
            <div className="p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-3 sm:gap-4">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2">
                    Why does Android show this warning?
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Android shows this warning to protect you from apps that are
                    not installed from an app store. This is normal when you
                    install an APK directly from your browser. You can allow the
                    install for Chrome (or your browser) and continue.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.5} className="mt-8 sm:mt-10 text-center">
            {apkValid ? (
              <Button asChild variant="hero" size="xl">
                <a
                  href={APP_CONFIG.downloads.apk}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download DhanDiary APK
                </a>
              </Button>
            ) : (
              <div className="inline-flex flex-col items-center gap-3">
                <Button variant="hero" size="xl" disabled>
                  APK link expired (30-day limit)
                </Button>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Please download from an app store on the{" "}
                  <Link
                    to="/download"
                    className="text-primary hover:underline font-medium"
                  >
                    Download page
                  </Link>
                  .
                </p>
              </div>
            )}
            <p className="text-muted-foreground text-xs sm:text-sm mt-3">
              Android {APP_CONFIG.minAndroid}+ • {APP_CONFIG.sizeMb} MB
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default InstallApk;
