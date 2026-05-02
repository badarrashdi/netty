"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { PartnerSection } from "@/types/storyblok";

interface PartnerWithUsProps {
  data?: PartnerSection | null;
}

export default function PartnerWithUs({ data }: Readonly<PartnerWithUsProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const heading = data?.heading || "Partner With Us";
  const description = data?.description || "We're looking for strategic investors, mentors, and partners who share our vision to elevate professional fashion for women.";
  const ctaLabel = data?.CTA_label || "Download Investor Deck";
  const ctaUrl = data?.CTA_link?.cached_url || "/investor-deck.pdf";
  const partnerImage = data?.image?.filename || "/img/partner-new.png";
  const partnerImageAlt = data?.image?.alt || "Partner with Work Natty";

  return (
    <section id="partner" className="pt-16 md:pt-24 bg-[#ded7cb] overflow-hidden" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.9, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <h2 
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-text-dark leading-tight"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            <p 
              className="font-body text-sm md:text-base leading-relaxed"
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

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ 
              duration: 0.9, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative overflow-hidden flex justify-center md:justify-end items-end"
          >
            <Image
              src={partnerImage}
              alt={partnerImageAlt}
              width={400}
              height={600}
              className="object-cover w-full max-w-sm md:max-w-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
