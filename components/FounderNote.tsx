"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { FounderSection } from "@/types/storyblok";

interface FounderNoteProps {
  data?: FounderSection | null;
}

export default function FounderNote({ data }: Readonly<FounderNoteProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const heading = data?.heading || "Founder's Note";
  const founderName = data?.founder_name || "John Doe";
  const founderTitle = data?.title || "Founder";
  const founderQuote = data?.quote || "I created Work Natty to make workwear more than just clothing — it's a form of self-expression for ambitious women who lead with confidence and style.";
  const founderImageUrl = data?.founder_photo?.filename || "/img/founder.jpg";
  const founderImageAlt = data?.founder_photo?.alt || "Founder";

  return (
    <section id="founder" className="py-16 md:py-24 bg-white" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.9, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-text-dark mb-10 md:mb-14"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        <div className="md:pl-16 lg:pl-90">
          <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.9, 
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative w-full md:w-75 h-auto md:h-61.25 shrink-0 overflow-hidden"
            >
              <Image
                src={founderImageUrl}
                alt={founderImageAlt}
                width={300}
                height={245}
                className="w-full h-auto md:h-full object-cover object-top"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.9, 
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex-1"
            >
              <p 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-dark leading-[1.3] md:leading-[1.1] mb-6"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${founderQuote}&rdquo;` }}
              />
              <div>
                <p className="text-xl md:text-2xl font-heading text-text-dark">{founderName}</p>
                <p className="font-body text-sm md:text-base mt-1">{founderTitle}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
