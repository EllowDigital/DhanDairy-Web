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
        <div className="h-11 w-[160px] flex items-center justify-center">
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
        <div className="h-11 w-[160px] flex items-center justify-center">
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
        <div className="h-11 w-[160px] flex items-center justify-center">
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
        <div className="h-11 w-[160px] px-5 flex flex-col items-center justify-center bg-primary border-2 border-primary rounded-lg text-center leading-tight">
          <span className="text-[9px] text-primary-foreground uppercase tracking-wider font-medium">
            Available on
          </span>
          <span className="text-sm text-primary-foreground font-bold">
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
        <div className="h-11 w-[160px] px-5 flex flex-col items-center justify-center bg-primary rounded-lg text-center leading-tight">
          <span className="text-[9px] text-primary-foreground uppercase tracking-wider font-medium">
            See All
          </span>
          <span className="text-sm text-primary-foreground font-bold">
            Download Options
          </span>
        </div>
      ),
    },
  ];

  return (
    <section
      id="download"
      className="section-padding relative overflow-hidden bg-section-gradient"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Download
          </p>
          <h2 className="heading-2 text-foreground mb-4 text-balance">
            Available on{" "}
            <span className="text-gradient">multiple platforms</span>
          </h2>
          <p className="body-default max-w-xl mx-auto">
            Get DhanDiary from your preferred app store. Free, no subscriptions.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 max-w-5xl mx-auto"
        >
          {appStores.map((store) => (
            <motion.div
              key={store.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`group ${store.internal ? "col-span-2 md:col-span-3 lg:col-span-4 flex justify-center" : ""}`}
            >
              {store.url ? (
                store.internal ? (
                  <Link
                    to={store.url}
                    className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 h-full hover-lift"
                    aria-label="See more download options"
                  >
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      {store.badge}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm text-center">
                      {store.name}
                    </h3>
                    <div className="flex items-center gap-1 text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ) : (
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 h-full hover-lift"
                    aria-label={`Download from ${store.name}`}
                  >
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      {store.badge}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm text-center">
                      {store.name}
                    </h3>
                    {store.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">
                          {store.rating}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Get it</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </a>
                )
              ) : null}
            </motion.div>
          ))}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-wrap justify-center items-center gap-12"
        >
          {[
            { label: "100% Free", sub: "No hidden costs" },
            { label: "No Ads", sub: "Clean experience" },
            { label: "Privacy First", sub: "Your data stays yours" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="font-bold text-foreground text-base lg:text-lg">
                {item.label}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {item.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
