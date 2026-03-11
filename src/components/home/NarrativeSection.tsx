import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface NarrativeBlock {
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
}

interface NarrativeSectionProps {
  narrativeBlocks: NarrativeBlock[];
}

const NarrativeSection = ({ narrativeBlocks }: NarrativeSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the heading
  const headingY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Connecting line progress
  const lineHeight = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    ["0%", "100%"],
  );

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-section-gradient relative overflow-hidden"
    >
      {/* Ambient parallax orbs */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]) }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section heading with parallax */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-24"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Why DhanDiary?
          </p>
          <h2 className="heading-2 text-foreground text-balance">
            Finance apps should be simple, private, and{" "}
            <span className="text-gradient">actually useful.</span>
          </h2>
        </motion.div>

        {/* Narrative blocks with vertical timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Animated connecting line — desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            <div className="w-full h-full bg-border/50" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-primary/40 origin-top"
            />
          </div>

          <div className="space-y-12 lg:space-y-24">
            {narrativeBlocks.map((block, i) => {
              const isEven = i % 2 === 0;
              return (
                <NarrativeCard
                  key={i}
                  block={block}
                  index={i}
                  isEven={isEven}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const NarrativeCard = ({
  block,
  index,
  isEven,
  scrollYProgress,
}: {
  block: NarrativeBlock;
  index: number;
  isEven: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const cardY = useTransform(cardProgress, [0, 1], [80, 0]);
  const cardOpacity = useTransform(cardProgress, [0, 0.6], [0, 1]);
  const cardScale = useTransform(cardProgress, [0, 1], [0.92, 1]);

  // Parallax offset for alternating cards
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [index * 20, -index * 10],
  );

  return (
    <div
      ref={cardRef}
      className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
        isEven ? "" : "lg:direction-rtl"
      }`}
    >
      {/* Timeline dot — desktop */}
      <motion.div
        style={{ scale: useTransform(cardProgress, [0, 0.8], [0, 1]) }}
        className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary shadow-glow z-10 items-center justify-center"
      >
        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          y: cardY,
          opacity: cardOpacity,
          scale: cardScale,
        }}
        className={`${isEven ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}
      >
        <motion.div style={{ y: parallaxY }}>
          <div
            className={`flex items-center gap-3 mb-4 ${isEven ? "lg:justify-end" : ""}`}
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
              {block.icon}
            </div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {block.label}
            </span>
          </div>
          <h3 className="font-display font-bold text-foreground text-xl sm:text-2xl mb-3 leading-snug">
            {block.title}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md lg:max-w-none">
            {block.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative card for opposite side — desktop only */}
      <motion.div
        style={{
          opacity: cardOpacity,
          y: useTransform(cardProgress, [0, 1], [40, 0]),
        }}
        className={`hidden lg:block ${isEven ? "lg:col-start-2 lg:pl-12" : "lg:col-start-1 lg:row-start-1 lg:pr-12 lg:text-right"}`}
      >
        <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
          <div
            className={`flex items-center gap-3 ${isEven ? "" : "justify-end"}`}
          >
            <div className="w-3 h-3 rounded-full bg-primary/30" />
            <div className="h-2 w-24 rounded-full bg-muted" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full rounded-full bg-muted" />
            <div className="h-2 w-3/4 rounded-full bg-muted" />
            <div className="h-2 w-1/2 rounded-full bg-primary/15" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NarrativeSection;
