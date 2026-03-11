import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, Calendar, Sparkles, Zap, Bug, ShieldCheck } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { Badge } from "@/components/ui/badge";
import {
  releases,
  type Release,
  type ReleaseSection,
} from "@/data/releaseNotes";

const tagColors: Record<Release["tag"], string> = {
  Latest: "bg-primary text-primary-foreground",
  Major: "bg-accent text-accent-foreground",
  Minor: "bg-secondary text-secondary-foreground",
  Patch: "bg-muted text-muted-foreground",
};

const sectionIcons: Record<string, React.ReactNode> = {
  "New Features": <Sparkles className="w-4 h-4" />,
  Improvements: <Zap className="w-4 h-4" />,
  "Bug Fixes": <Bug className="w-4 h-4" />,
  Security: <ShieldCheck className="w-4 h-4" />,
};

const ReleaseNotes = () => {
  const location = useLocation();

  // Scroll to anchor on load
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          100,
        );
      }
    }
  }, [location.hash]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Release Notes — DhanDiary",
    url: "https://dhandiary.netlify.app/release-notes",
    description:
      "See what's new in DhanDiary. Release notes, changelogs, and version history for the DhanDiary personal finance app.",
    publisher: {
      "@type": "Organization",
      name: "EllowDigital",
      url: "https://ellowdigital.space",
    },
  };

  return (
    <Layout>
      <SEOHead
        title="Release Notes"
        description="See what's new in DhanDiary. Full changelog with new features, improvements, bug fixes, and security updates for every version."
        keywords="DhanDiary release notes, changelog, version history, app updates, what's new DhanDiary"
        canonical="/release-notes"
        structuredData={structuredData}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Page header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Changelog
            </div>
            <h1 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
              Release Notes
            </h1>
            <p className="body-default max-w-lg mx-auto">
              Everything new, improved, and fixed in DhanDiary — delivered with
              each update.
            </p>
          </div>

          {/* Releases */}
          <div className="space-y-10 sm:space-y-14">
            {releases.map((release, idx) => (
              <motion.article
                key={release.version}
                id={`v${release.version.replace(/\./g, "-")}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="scroll-mt-24"
              >
                {/* Version header */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                    v{release.version}
                  </h2>
                  <Badge className={tagColors[release.tag]}>
                    {release.tag}
                  </Badge>
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(release.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  {release.summary}
                </p>

                {/* Change sections */}
                <div className="space-y-5">
                  {release.sections.map((section: ReleaseSection) => (
                    <div key={section.label}>
                      <h3 className="flex items-center gap-2 font-display font-semibold text-foreground text-sm sm:text-base mb-2.5">
                        <span className="text-primary">
                          {sectionIcons[section.label] ?? section.emoji}
                        </span>
                        {section.emoji} {section.label}
                      </h3>
                      <ul className="space-y-1.5 pl-5 list-disc marker:text-primary/60">
                        {section.changes.map((change, ci) => (
                          <li
                            key={ci}
                            className="text-muted-foreground text-sm leading-relaxed"
                          >
                            {change.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {idx < releases.length - 1 && (
                  <div className="border-t border-border mt-10 sm:mt-14" />
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReleaseNotes;
