"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { storyblokEditable } from "@storyblok/react";
import { OpportunitySection } from "@/types/storyblok";

interface MarketOpportunityProps {
  data?: OpportunitySection | null;
}

export default function MarketOpportunity({ data }: Readonly<MarketOpportunityProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const heading = data?.heading || "The Market Opportunity";
  const description = data?.description || "The global women's workwear market is valued at $40B+ and continues to grow annually by 5%. Work Natty bridges the gap between traditional office attire and modern style — a category ready for disruption.";

  return (
    <section id="market" className="py-16 md:py-24 bg-white" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.9, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-text-dark leading-tight"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.9, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="font-body text-sm md:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
}
