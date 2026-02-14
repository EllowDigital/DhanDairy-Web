import { motion } from "framer-motion";
import {
  ExternalLink,
  Smartphone,
  Shield,
  Check,
  Download,
  Tablet,
  HardDrive,
  Cpu,
  ChevronRight,
  WifiOff,
  Lock,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/shared/PageHero";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import { APP_CONFIG, isApkDownloadLinkValid } from "@/lib/appConfig";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const apkLinkValid = isApkDownloadLinkValid();

const downloadOptions = [
  {
    name: "Samsung Galaxy Store",
    description: "For Samsung devices",
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] flex items-center justify-center">
        <img
          src="/img/Appstores/GalaxyStore-light.png"
          alt="Samsung Galaxy Store"
          className="h-full w-full object-contain dark:hidden"
          loading="lazy"
        />
        <img
          src="/img/Appstores/GalaxyStore-dark.png"
          alt="Samsung Galaxy Store"
          className="h-full w-full object-contain hidden dark:block"
          loading="lazy"
        />
      </div>
    ),
    url: APP_CONFIG.downloads.samsung,
    primary: true,
  },
  {
    name: "Indus App Store",
    description: "Recommended for Indian users",
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] flex items-center justify-center">
        <img
          alt="Get it on Indus Appstore"
          src="https://docstore.indusappstore.com/public/external/developerdashboard-static/badge-white-full-color-english.png"
          className="h-full w-full object-contain dark:hidden"
          loading="lazy"
        />
        <img
          alt="Get it on Indus Appstore"
          src="https://docstore.indusappstore.com/public/external/developerdashboard-static/badge-black-full-color-english.png"
          className="h-full w-full object-contain hidden dark:block"
          loading="lazy"
        />
      </div>
    ),
    url: APP_CONFIG.downloads.indus || "https://indusapp.store/gfda9h89",
    primary: true,
  },
  {
    name: "Huawei AppGallery",
    description: "For Huawei devices",
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] flex items-center justify-center">
        <img
          src="/img/Appstores/Huawei-light.png"
          alt="Huawei AppGallery"
          className="h-full w-full object-contain dark:hidden"
          loading="lazy"
        />
        <img
          src="/img/Appstores/Huawei-dark.png"
          alt="Huawei AppGallery"
          className="h-full w-full object-contain hidden dark:block"
          loading="lazy"
        />
      </div>
    ),
    url: APP_CONFIG.downloads.huawei,
    primary: true,
  },
  {
    name: "Amazon Appstore",
    description: "Available worldwide",
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] px-4 sm:px-5 flex flex-col items-center justify-center bg-primary border-2 border-primary rounded-lg">
        <span className="text-[8px] sm:text-[9px] text-primary-foreground uppercase tracking-wider font-medium">
          Available on
        </span>
        <span className="text-xs sm:text-sm text-primary-foreground font-bold">
          Amazon Appstore
        </span>
      </div>
    ),
    url: APP_CONFIG.downloads.amazon,
    primary: true,
  },
  {
    name: "Vivio Appstore",
    description: 'Find DhanDiary on the app store by searching "DhanDiary"',
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] px-4 sm:px-5 flex flex-col items-center justify-center bg-muted border border-border rounded-lg">
        <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
          Available on
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground font-bold">
          Vivio Appstore
        </span>
      </div>
    ),
    url: "",
    primary: false,
  },
  {
    name: "OPPO App Market",
    description: 'Find DhanDiary on the app store by searching "DhanDiary"',
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] px-4 sm:px-5 flex flex-col items-center justify-center bg-muted border border-border rounded-lg">
        <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
          Available on
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground font-bold">
          OPPO App Market
        </span>
      </div>
    ),
    url: "",
    primary: false,
  },
  {
    name: "Google Drive (Latest APK)",
    description: APP_CONFIG.downloads.googleDriveApk
      ? "Latest APK hosted on Google Drive"
      : "Link coming soon",
    icon: <Download className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] px-4 sm:px-5 flex flex-col items-center justify-center bg-foreground rounded-lg">
        <span className="text-[8px] sm:text-[9px] text-background uppercase tracking-wider font-medium">
          Download
        </span>
        <span className="text-xs sm:text-sm text-background font-bold">
          Google Drive
        </span>
      </div>
    ),
    url: APP_CONFIG.downloads.googleDriveApk,
    primary: false,
  },
  {
    name: "Direct APK Download",
    description: apkLinkValid
      ? "Manual install (valid for 30 days)"
      : "APK link expired — use app stores",
    icon: <Download className="w-5 h-5 sm:w-6 sm:h-6" />,
    badge: (
      <div className="h-10 sm:h-12 w-[170px] px-4 sm:px-5 flex flex-col items-center justify-center bg-foreground rounded-lg">
        <span className="text-[8px] sm:text-[9px] text-background uppercase tracking-wider font-medium">
          Download
        </span>
        <span className="text-xs sm:text-sm text-background font-bold">
          APK Direct
        </span>
      </div>
    ),
    url: apkLinkValid ? APP_CONFIG.downloads.apk : "",
    primary: false,
  },
];

const requirements = [
  {
    icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />,
    label: "Android Version",
    value: `${APP_CONFIG.minAndroid} or higher`,
  },
  {
    icon: <HardDrive className="w-4 h-4 sm:w-5 sm:h-5" />,
    label: "Storage Space",
    value: `${APP_CONFIG.sizeMb} MB`,
  },
  {
    icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />,
    label: "Device Type",
    value: "Phones & Tablets",
  },
  {
    icon: <Tablet className="w-4 h-4 sm:w-5 sm:h-5" />,
    label: "Screen Size",
    value: "All sizes supported",
  },
];

const features = [
  {
    icon: <WifiOff className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "Works Offline",
    description: "Full functionality without internet",
  },
  {
    icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "Secure & Private",
    description: "Your data stays on your device",
  },
  {
    icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
    title: "Smart Insights",
    description: "Beautiful charts & analytics",
  },
];

const installSteps = [
  {
    step: 1,
    title: "Download the App",
    description: "Choose your preferred app store above and tap to download.",
  },
  {
    step: 2,
    title: "Install & Open",
    description:
      "Once downloaded, open the app and grant necessary permissions.",
  },
  {
    step: 3,
    title: "Create Account",
    description: "Sign up with email or use Google/GitHub for quick access.",
  },
  {
    step: 4,
    title: "Start Tracking",
    description:
      "Add your first transaction and take control of your finances!",
  },
];

const faqs = [
  {
    q: "Is DhanDiary free to use?",
    a: "Yes! DhanDiary is completely free with no ads, no subscriptions, and no hidden costs.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. Your data is stored locally on your device. We don't collect, share, or sell your personal information.",
  },
  {
    q: "Does it work offline?",
    a: "Yes! DhanDiary is designed to work fully offline. All your data is stored locally and syncs when you're back online.",
  },
  {
    q: "Is it available on iOS?",
    a: "Currently, DhanDiary is available only for Android devices. iOS support may come in the future.",
  },
];

const DownloadPage = () => {
  return (
    <Layout>
      <SEOHead {...pageSEO.download} />
      <PageHero
        badge={{
          icon: <Shield className="w-4 h-4" />,
          text: "Safe & Verified Download",
        }}
        title="Download DhanDiary"
        description="Get the app on your Android device. Free forever, no ads, no subscriptions."
      >
        {/* Quick feature badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card border border-border"
            >
              <span className="text-primary">{feature.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">
                {feature.title}
              </span>
            </motion.div>
          ))}
        </div>
      </PageHero>

      {/* Download Options */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <AnimatedSection className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
              Choose Your App Store
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Download from your preferred platform
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {downloadOptions
              .filter((opt) => opt.primary && opt.url)
              .map((option, index) => (
                <StaggerItem key={index}>
                  <motion.a
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 group h-full"
                  >
                    <div className="mb-3 sm:mb-4 transform group-hover:scale-105 transition-transform flex justify-center w-full">
                      {option.badge}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1 text-center">
                      {option.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 text-center">
                      {option.description}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium mt-auto">
                      <span>Download</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
          </StaggerContainer>

          {/* Secondary options */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {downloadOptions
              .filter((opt) => !opt.primary || !opt.url)
              .map((option, index) =>
                option.url ? (
                  <StaggerItem key={index}>
                    <motion.a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-all group h-full min-h-[120px] sm:min-h-[128px]"
                    >
                      <div className="shrink-0 w-[170px] flex justify-center">
                        {option.badge}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          {option.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </motion.a>
                  </StaggerItem>
                ) : (
                  <StaggerItem key={index}>
                    <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-muted/30 border border-border opacity-60 h-full min-h-[120px] sm:min-h-[128px]">
                      <div className="shrink-0 w-[170px] flex justify-center">
                        {option.badge}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          {option.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ),
              )}
          </StaggerContainer>
        </div>
      </section>

      {/* Device Requirements */}
      <section className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Requirements */}
            <AnimatedSection animation="fadeLeft">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Device Compatibility
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {requirements.map((req, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent flex items-center justify-center text-primary mb-2 sm:mb-3">
                      {req.icon}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {req.label}
                    </p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">
                      {req.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Version Info */}
            <AnimatedSection animation="fadeRight" delay={0.1}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Current Version
              </h2>
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background border border-border">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-primary">
                      v{APP_CONFIG.version}
                    </p>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Latest Stable Release
                    </p>
                  </div>
                  <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
                    Stable
                  </div>
                </div>
                {APP_CONFIG.releaseDate && (
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    Released: {APP_CONFIG.releaseDate}
                  </p>
                )}
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    "All features unlocked",
                    "Latest security updates",
                    "Bug fixes & improvements",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatedSection className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
              Installation Guide
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Get started in just a few simple steps
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {installSteps.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* APK Help Link */}
          <AnimatedSection delay={0.4} className="mt-6 sm:mt-8">
            <div className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-accent/50 border border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">
                    Trouble installing APK?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Follow our step-by-step guide for manual installation
                  </p>
                </div>
                <Link
                  to="/how-to-install-apk"
                  className="flex items-center gap-1 text-primary font-medium text-sm sm:text-base hover:underline shrink-0"
                >
                  View Guide
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatedSection className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <StaggerContainer className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
                >
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1.5 sm:mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {faq.a}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
};

export default DownloadPage;
