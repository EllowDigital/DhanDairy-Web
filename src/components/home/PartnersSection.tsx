import { motion } from "framer-motion";
import { Star, ExternalLink, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { APP_CONFIG } from "@/lib/appConfig";

const PartnersSection = () => {
  const appStores = [
    {
      name: "Indus App Store",
      rating: "4.8",
      url: APP_CONFIG.downloads.indus || "https://indusapp.store/gfda9h89",
      badge: (
        <div className="h-10 sm:h-11 w-[160px] flex items-center justify-center">
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
    },
    {
      name: "Samsung Galaxy Store",
      rating: "4.9",
      url: "https://apps.samsung.com/appquery/appDetail.as?appId=com.ellowdigital.dhandiary&source=GBadge_01_8729522_tag&directOpen=true&ads=ddb0e6f9&nonOrgType=fce692ba",
      badge: (
        <div className="h-10 sm:h-11 w-[160px] flex items-center justify-center">
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
    },
    {
      name: "Huawei AppGallery",
      rating: "4.9",
      url: APP_CONFIG.downloads.huawei,
      badge: (
        <div className="h-10 sm:h-11 w-[160px] flex items-center justify-center">
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
    },
    {
      name: "Amazon Appstore",
      rating: "4.9",
      url: APP_CONFIG.downloads.amazon,
      badge: (
        <div className="h-10 sm:h-11 w-[160px] px-4 sm:px-5 flex flex-col items-center justify-center bg-primary border-2 border-primary rounded-lg text-center leading-tight">
          <span className="text-[8px] sm:text-[9px] text-primary-foreground uppercase tracking-wider font-medium">
            Available on
          </span>
          <span className="text-xs sm:text-sm text-primary-foreground font-bold">
            Amazon Appstore
          </span>
        </div>
      ),
    },
    {
      name: "More Options",
      url: "/download",
      internal: true,
      badge: (
        <div className="h-10 sm:h-11 w-[160px] px-4 sm:px-5 flex flex-col items-center justify-center bg-primary rounded-lg text-center leading-tight">
          <span className="text-[8px] sm:text-[9px] text-primary-foreground uppercase tracking-wider font-medium">
            See All
          </span>
          <span className="text-xs sm:text-sm text-primary-foreground font-bold">
            Download Options
          </span>
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="download"
      className="section-padding relative overflow-hidden bg-card"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-medium mb-4">
            Download Now
          </span>
          <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
            Available on{" "}
            <span className="text-primary">Multiple Platforms</span>
          </h2>
          <p className="body-default max-w-xl mx-auto">
            Get DhanDiary from your preferred app store. Free to download, no
            subscriptions required.
          </p>
        </motion.div>

        {/* App Store Cards - 2x2 grid on mobile/tablet, 4 on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto"
        >
          {appStores.map((store) => (
            <motion.div
              key={store.name}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group ${
                store.internal
                  ? "col-span-2 md:col-span-3 lg:col-span-4 flex justify-center"
                  : ""
              }`}
            >
              {store.url ? (
                store.internal ? (
                  <Link
                    to={store.url}
                    className="flex flex-col items-center p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 h-full"
                    aria-label="See more download options"
                  >
                    <div className="mb-3 sm:mb-4 transform group-hover:scale-105 transition-transform duration-300 flex justify-center w-full">
                      {store.badge}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base text-center">
                      {store.name}
                    </h3>
                    <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ) : (
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 h-full"
                    aria-label={`Download from ${store.name}`}
                  >
                    <div className="mb-3 sm:mb-4 transform group-hover:scale-105 transition-transform duration-300 flex justify-center w-full">
                      {store.badge}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base text-center">
                      {store.name}
                    </h3>
                    {store.rating && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                          {store.rating}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Get it</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </a>
                )
              ) : null}
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-12 lg:mt-14 flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-14"
        >
          {[
            { label: "100% Free", sublabel: "No hidden costs" },
            { label: "No Ads", sublabel: "Clean experience" },
            { label: "Privacy First", sublabel: "Your data stays yours" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <p className="font-bold text-foreground text-sm sm:text-base lg:text-lg">
                {item.label}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {item.sublabel}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
