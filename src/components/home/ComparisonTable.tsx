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
      <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
        <Check className="w-4 h-4 text-green-500" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
        <X className="w-4 h-4 text-red-500" />
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-yellow-500/15 flex items-center justify-center mx-auto">
      <Minus className="w-4 h-4 text-yellow-500" />
    </div>
  );
};

const ComparisonTable = () => {
  return (
    <section className="section-padding bg-section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Comparison
          </p>
          <h2 className="heading-2 text-foreground text-balance">
            See how DhanDiary stands out
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 gap-2 lg:gap-4 p-4 lg:p-5 bg-primary/[0.04] border-b border-border">
              <div className="text-left">
                <span className="font-semibold text-foreground text-sm">
                  Feature
                </span>
              </div>
              <div className="text-center">
                <span className="font-bold text-primary text-sm">
                  DhanDiary
                </span>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground text-xs">App A</span>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground text-xs">App B</span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="grid grid-cols-4 gap-2 lg:gap-4 p-4 lg:p-5 hover:bg-muted/30 transition-colors duration-300"
                >
                  <div className="text-left flex items-center">
                    <span className="text-foreground text-xs sm:text-sm">
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
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            {[
              {
                icon: <Check className="w-3 h-3 text-green-500" />,
                bg: "bg-green-500/15",
                label: "Full Support",
              },
              {
                icon: <Minus className="w-3 h-3 text-yellow-500" />,
                bg: "bg-yellow-500/15",
                label: "Partial",
              },
              {
                icon: <X className="w-3 h-3 text-red-500" />,
                bg: "bg-red-500/15",
                label: "Not Available",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full ${item.bg} flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
