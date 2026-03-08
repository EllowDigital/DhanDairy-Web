import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
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
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/home/ScrollReveal";
import { APP_CONFIG, isApkDownloadLinkValid } from "@/lib/appConfig";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const apkLinkValid = isApkDownloadLinkValid();

const downloadOptions = [
  {
    name: "Samsung Galaxy Store",
    description: "For Samsung devices",
    icon: <Smartphone className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] flex items-center justify-center">
        <img src="/img/Appstores/GalaxyStore-light.png" alt="Samsung Galaxy Store" className="h-full w-full object-contain dark:hidden" loading="lazy" />
        <img src="/img/Appstores/GalaxyStore-dark.png" alt="Samsung Galaxy Store" className="h-full w-full object-contain hidden dark:block" loading="lazy" />
      </div>
    ),
    url: APP_CONFIG.downloads.samsung,
    primary: true,
  },
  {
    name: "Indus App Store",
    description: "Recommended for Indian users",
    icon: <Smartphone className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] flex items-center justify-center">
        <img alt="Get it on Indus Appstore" src="https://docstore.indusappstore.com/public/external/developerdashboard-static/badge-white-full-color-english.png" className="h-full w-full object-contain dark:hidden" loading="lazy" />
        <img alt="Get it on Indus Appstore" src="https://docstore.indusappstore.com/public/external/developerdashboard-static/badge-black-full-color-english.png" className="h-full w-full object-contain hidden dark:block" loading="lazy" />
      </div>
    ),
    url: APP_CONFIG.downloads.indus || "https://indusapp.store/gfda9h89",
    primary: true,
  },
  {
    name: "Huawei AppGallery",
    description: "For Huawei devices",
    icon: <Smartphone className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] flex items-center justify-center">
        <img src="/img/Appstores/Huawei-light.png" alt="Huawei AppGallery" className="h-full w-full object-contain dark:hidden" loading="lazy" />
        <img src="/img/Appstores/Huawei-dark.png" alt="Huawei AppGallery" className="h-full w-full object-contain hidden dark:block" loading="lazy" />
      </div>
    ),
    url: APP_CONFIG.downloads.huawei,
    primary: true,
  },
  {
    name: "Amazon Appstore",
    description: "Available worldwide",
    icon: <Smartphone className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] px-5 flex flex-col items-center justify-center bg-primary border-2 border-primary rounded-lg">
        <span className="text-[9px] text-primary-foreground uppercase tracking-wider font-medium">Available on</span>
        <span className="text-sm text-primary-foreground font-bold">Amazon Appstore</span>
      </div>
    ),
    url: APP_CONFIG.downloads.amazon,
    primary: true,
  },
  {
    name: "Vivio Appstore",
    description: 'Find DhanDiary on the app store by searching "DhanDiary"',
    icon: <Smartphone className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] px-5 flex flex-col items-center justify-center bg-muted border border-border rounded-lg">
        <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">Available on</span>
        <span className="text-sm text-muted-foreground font-bold">Vivio Appstore</span>
      </div>
    ),
    url: "",
    primary: false,
  },
  {
    name: "OPPO App Market",
    description: 'Find DhanDiary on the app store by searching "DhanDiary"',
    icon: <Smartphone className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] px-5 flex flex-col items-center justify-center bg-muted border border-border rounded-lg">
        <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">Available on</span>
        <span className="text-sm text-muted-foreground font-bold">OPPO App Market</span>
      </div>
    ),
    url: "",
    primary: false,
  },
  {
    name: "Google Drive (Latest APK)",
    description: APP_CONFIG.downloads.googleDriveApk ? "Latest APK hosted on Google Drive" : "Link coming soon",
    icon: <Download className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] px-5 flex flex-col items-center justify-center bg-foreground rounded-lg">
        <span className="text-[9px] text-background uppercase tracking-wider font-medium">Download</span>
        <span className="text-sm text-background font-bold">Google Drive</span>
      </div>
    ),
    url: APP_CONFIG.downloads.googleDriveApk,
    primary: false,
  },
  {
    name: "Direct APK Download",
    description: apkLinkValid ? "Manual install (valid for 30 days)" : "APK link expired — use app stores",
    icon: <Download className="w-6 h-6" />,
    badge: (
      <div className="h-12 w-[170px] px-5 flex flex-col items-center justify-center bg-foreground rounded-lg">
        <span className="text-[9px] text-background uppercase tracking-wider font-medium">Download</span>
        <span className="text-sm text-background font-bold">APK Direct</span>
      </div>
    ),
    url: apkLinkValid ? APP_CONFIG.downloads.apk : "",
    primary: false,
  },
];

const requirements = [
  { icon: <Cpu className="w-5 h-5" />, label: "Android Version", value: `${APP_CONFIG.minAndroid} or higher` },
  { icon: <HardDrive className="w-5 h-5" />, label: "Storage Space", value: `${APP_CONFIG.sizeMb} MB` },
  { icon: <Smartphone className="w-5 h-5" />, label: "Device Type", value: "Phones & Tablets" },
  { icon: <Tablet className="w-5 h-5" />, label: "Screen Size", value: "All sizes supported" },
];

const quickFeatures = [
  { icon: <WifiOff className="w-4 h-4" />, title: "Works Offline" },
  { icon: <Lock className="w-4 h-4" />, title: "Secure & Private" },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Smart Insights" },
];

const installSteps = [
  { step: 1, title: "Download the App", description: "Choose your preferred app store above and tap to download." },
  { step: 2, title: "Install & Open", description: "Once downloaded, open the app and grant necessary permissions." },
  { step: 3, title: "Create Account", description: "Sign up with email or use Google/GitHub for quick access." },
  { step: 4, title: "Start Tracking", description: "Add your first transaction and take control of your finances!" },
];

const faqs = [
  { q: "Is DhanDiary free to use?", a: "Yes! DhanDiary is completely free with no ads, no subscriptions, and no hidden costs." },
  { q: "Is my data safe?", a: "Absolutely. Your data is stored locally on your device. We don't collect, share, or sell your personal information." },
  { q: "Does it work offline?", a: "Yes! DhanDiary is designed to work fully offline. All your data is stored locally and syncs when you're back online." },
  { q: "Is it available on iOS?", a: "Currently, DhanDiary is available only for Android devices. iOS support may come in the future." },
];

const PACKAGE_NAME = "com.ellowdigital.dhandiary";

const useIsAndroid = () => {
  const [isAndroid, setIsAndroid] = useState(false);
  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);
  return isAndroid;
};

const DownloadPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const isAndroid = useIsAndroid();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);

  const handleOpenApp = useCallback(() => {
    // Use Android intent URL to try launching the app
    window.location.href = `intent://#Intent;package=${PACKAGE_NAME};scheme=dhandiary;launchFlags=0x10000000;end`;
  }, []);

  return (
    <Layout>
      <SEOHead {...pageSEO.download} />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.08] border border-primary/15 text-primary text-sm font-medium">
              <Shield className="w-4 h-4" />
              Safe & Verified Download
            </div>
            <h1 className="heading-1 text-foreground">
              Download <span className="text-gradient">DhanDiary</span>
            </h1>
            <p className="body-large max-w-2xl mx-auto text-balance">
              Get the app on your Android device. Free forever, no ads, no subscriptions.
            </p>

            {/* Open App button — Android only */}
            {isAndroid && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  onClick={handleOpenApp}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-glow hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open DhanDiary
                </button>
              </motion.div>
            )}

            {/* Quick feature badges */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {quickFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
                >
                  <span className="text-primary">{feature.icon}</span>
                  <span className="text-sm font-medium text-foreground">{feature.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Download Options */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <ScrollReveal animation="fadeUp" className="text-center mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Download</p>
            <h2 className="heading-2 text-foreground">Choose Your App Store</h2>
            <p className="body-default mt-3">Download from your preferred platform</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {downloadOptions
              .filter((opt) => opt.primary && opt.url)
              .map((option, index) => (
                <StaggerItem key={index}>
                  <motion.a
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6 }}
                    className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover-lift transition-all duration-500 group h-full"
                  >
                    <div className="mb-4 transform group-hover:scale-105 transition-transform flex justify-center w-full">
                      {option.badge}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-center">{option.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 text-center">{option.description}</p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-auto">
                      <span>Download</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
          </StaggerContainer>

          {/* Secondary options */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
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
                      className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all group h-full"
                    >
                      <div className="shrink-0 w-[170px] flex justify-center">{option.badge}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{option.name}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </motion.a>
                  </StaggerItem>
                ) : (
                  <StaggerItem key={index}>
                    <div className="flex items-center gap-4 p-5 rounded-xl bg-muted/30 border border-border opacity-60 h-full">
                      <div className="shrink-0 w-[170px] flex justify-center">{option.badge}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{option.name}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ),
              )}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* Device Requirements & Version */}
      <section className="section-padding bg-section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ScrollReveal animation="fadeLeft">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Device Compatibility
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                      {req.icon}
                    </div>
                    <p className="text-sm text-muted-foreground">{req.label}</p>
                    <p className="font-semibold text-foreground">{req.value}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeRight" delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Current Version
              </h2>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">v{APP_CONFIG.version}</p>
                    <p className="text-muted-foreground">Latest Stable Release</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Stable</div>
                </div>
                {APP_CONFIG.releaseDate && (
                  <p className="text-sm text-muted-foreground mb-4">Released: {APP_CONFIG.releaseDate}</p>
                )}
                <div className="space-y-2">
                  {["All features unlocked", "Latest security updates", "Bug fixes & improvements"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Installation Guide */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ScrollReveal animation="fadeUp" className="text-center mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Getting Started</p>
            <h2 className="heading-2 text-foreground">Installation Guide</h2>
            <p className="body-default mt-3">Get started in just a few simple steps</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {installSteps.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* APK Help Link */}
          <ScrollReveal animation="fadeUp" delay={0.3} className="mt-8">
            <div className="p-5 rounded-xl bg-accent/30 border border-primary/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-0.5">Trouble installing APK?</h3>
                  <p className="text-sm text-muted-foreground">Follow our step-by-step guide for manual installation</p>
                </div>
                <Link
                  to="/how-to-install-apk"
                  className="flex items-center gap-1 text-primary font-medium hover:underline shrink-0"
                >
                  View Guide
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section className="section-padding bg-section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <ScrollReveal animation="fadeUp" className="text-center mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="heading-2 text-foreground">Frequently Asked Questions</h2>
          </ScrollReveal>

          <StaggerContainer className="space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
                >
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
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
