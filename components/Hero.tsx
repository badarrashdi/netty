"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { HeroSection } from "@/types/storyblok";

interface HeroProps {
  data?: HeroSection | null;
}

export default function Hero({ data }: Readonly<HeroProps>) {
  const title = data?.title || "Where Ambition Meets Style — Workwear for the Modern";
  const heroImage = data?.banner?.filename || "/img/banner.jpg";

  return (
    <section
      id="home"
      className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      {...(data ? storyblokEditable(data as any) : {})}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Work Natty fashion"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Hero text */}
      <div className="z-10 container mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.2, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="font-heading flex-initial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </section>
  );
}
