import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const features = [
  { name: "Works Offline", dhandiary: true, appA: false, appB: "partial" },
  { name: "No Ads", dhandiary: true, appA: false, appB: false },
  { name: "100% Free", dhandiary: true, appA: "partial", appB: false },
  { name: "Privacy First", dhandiary: true, appA: false, appB: false },
  { name: "Cloud Backup", dhandiary: true, appA: true, appB: true },
  { name: "Charts & Analytics", dhandiary: true, appA: true, appB: true },
  { name: "Multiple Categories", dhandiary: true, appA: true, appB: true },
  { name: "No Account Required", dhandiary: true, appA: false, appB: false },
  { name: "Dark Mode", dhandiary: true, appA: true, appB: false },
  { name: "Export Data", dhandiary: true, appA: "partial", appB: true },
];

const FeatureIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) {
    return (
      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-green-500" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
        <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-red-500" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto">
      <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-yellow-500" />
    </div>
  );
};

const ComparisonTable = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
            Why DhanDiary Stands Out
          </h2>
          <p className="body-default">
            See how we compare to other finance apps
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-background border border-border rounded-xl sm:rounded-2xl overflow-hidden shadow-soft">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 lg:gap-4 p-3 sm:p-4 lg:p-5 bg-accent/50 border-b border-border">
              <div className="text-left">
                <span className="font-semibold text-foreground text-xs sm:text-sm lg:text-base">
                  Feature
                </span>
              </div>
              <div className="text-center">
                <span className="font-bold text-primary text-xs sm:text-sm lg:text-base">
                  DhanDiary
                </span>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm">
                  App A
                </span>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm">
                  App B
                </span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-4 gap-1 sm:gap-2 lg:gap-4 p-3 sm:p-4 lg:p-5 hover:bg-accent/30 transition-colors"
                >
                  <div className="text-left flex items-center">
                    <span className="text-foreground text-[10px] sm:text-xs lg:text-sm">
                      {feature.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <FeatureIcon value={feature.dhandiary} />
                  </div>
                  <div className="flex items-center justify-center">
                    <FeatureIcon value={feature.appA} />
                  </div>
                  <div className="flex items-center justify-center">
                    <FeatureIcon value={feature.appB} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
              </div>
              <span>Full Support</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500" />
              </div>
              <span>Partial</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
              </div>
              <span>Not Available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
