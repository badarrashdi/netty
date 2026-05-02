"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { storyblokEditable } from "@storyblok/react";
import { AboutSection } from "@/types/storyblok";

interface AboutProps {
  data?: AboutSection | null;
}

export default function About({ data }: Readonly<AboutProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const heading = data?.heading || "What is Work Natty?";
  const description = data?.description || "Work Natty is a modern fashion brand redefining workwear for women — combining elegance, comfort, and confidence in every piece. Our mission is to make every working woman feel powerful and stylish, from the boardroom to beyond.";
  const ctaLabel = data?.CTA_label || "Download Moodboard";
  const ctaUrl = data?.CTA_link?.cached_url || "#";

  return (
    <section id="about" className="py-24 bg-white" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-8 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.9, 
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <h2 
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-text-dark leading-tight"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.9, 
              delay: 0.2, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col gap-6 pt-6 md:pt-2 md:pl-16 lg:pl-90"
          >
            <p 
              className="font-body leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div>
              <motion.a
                href={ctaUrl}
                whileHover={{ 
                  backgroundColor: "#3D2B1F", 
                  color: "#fff",
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="inline-block font-body text-sm tracking-widest uppercase border border-text-dark text-text-dark px-8 py-3"
              >
                {ctaLabel}
              </motion.a>
            </div>
          </motion.div>
      </div>
    </section>
  );
}
