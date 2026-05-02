"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { WorkSection } from "@/types/storyblok";

interface ServicesProps {
  readonly data?: WorkSection | null;
}

const defaultPillars = [
  {
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    title: "Designed for the Modern Working Woman",
    desc: "Our designs reflect strength, grace, and professionalism.",
  },
  {
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4087?w=600&q=80",
    title: "Where Function Meets Fashion",
    desc: "Style that works as hard as you do — from 9 AM to after hours.",
  },
  {
    img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    title: "Sustainable & Ethically Made",
    desc: "Conscious choices for a better tomorrow.",
  },
  {
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    title: "Confidence in Every Stitch",
    desc: "Every detail crafted to empower your everyday.",
  },
];

export default function Services({ data }: ServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const heading = data?.heading || "Why Work Natty?";
  const workItems = data?.work?.length ? data.work : defaultPillars.map((item, i) => ({
    _uid: `default-${i}`,
    component: "card_with_icon" as const,
    heading: item.title,
    description: item.desc,
    icon: { id: i, filename: item.img, fieldtype: "asset", alt: item.title },
  }));

  return (
    <section id="services" className="py-16 md:py-24 bg-text-dark" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.9, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-10 md:mb-14"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {workItems.map((item, i) => (
            <motion.div
              key={item._uid}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 + i * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="flex flex-col gap-3"
            >
              {item.icon && (
                <motion.div 
                  className="relative aspect-3/2 object-cover overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={item.icon.filename}
                    alt={item.icon.alt || item.heading}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
              <h3 
                className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-light text-white leading-[1.2]"
                dangerouslySetInnerHTML={{ __html: item.heading }}
              />
              <p 
                className="font-body text-sm md:text-base !text-white leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
