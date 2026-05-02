"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { storyblokEditable } from "@storyblok/react";
import { RoadmapSection } from "@/types/storyblok";

interface RoadmapProps {
  data?: RoadmapSection | null;
}

const defaultPhases = [
  { label: "Completed", title: "Brand Development", done: true },
  { label: "Q1 2026", title: "First Collection Launch", done: false },
  { label: "Q2 2026", title: "PR & Marketing Initiatives", done: false },
  { label: "Future phase", title: "E-commerce Launch", done: false },
  { label: "Future", title: "Regional Expansion", done: false },
];

export default function Roadmap({ data }: Readonly<RoadmapProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const heading = data?.heading || "What's Next?";
  const phases = data?.phases?.length
    ? data.phases.map((item) => ({
        label: item.phase,
        title: item.title,
        done: item.completed,
      }))
    : defaultPhases;

  return (
    <section id="roadmap" className="py-16 md:py-20 lg:py-24 bg-brown overflow-hidden" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.9, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-10 md:mb-12 lg:mb-16"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        {/* Scrollable timeline container */}
        <div className="relative -mx-6 md:-mx-8 lg:-mx-16">
          <div className="overflow-x-auto scrollbar-hide px-6 md:px-8 lg:px-16">
            <div className="relative flex gap-8 md:gap-12 min-w-max pb-4">
              {/* Horizontal timeline line */}
              <div className="absolute left-0 right-0 h-px border-t border-[#999999] border-dashed" style={{ top: 'calc(1.4rem + 1rem)' }} />
              
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 40, x: -20 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="flex-none w-64 md:w-80 relative"
                >
                  {/* Timeline label */}
                  <div className="text-base md:text-lg lg:text-xl font-semibold mb-4 text-cream relative z-10">
                    {phase.done && (
                      <span className="inline-block mr-2 text-sm md:text-base">✔</span>
                    )}
                    {phase.label}
                  </div>
                  
                  {/* Title */}
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/90 mt-6 relative z-10">
                    {phase.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
