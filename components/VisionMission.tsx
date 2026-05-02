"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { MissionVisionSection } from "@/types/storyblok";

interface VisionMissionProps {
  data?: MissionVisionSection | null;
}

export default function VisionMission({ data }: Readonly<VisionMissionProps>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const heading = data?.heading || "Our Vision & Mission";
  const items = data?.items || [
    {
      _uid: "1",
      component: "card_with_icon" as const,
      heading: "Vision",
      description: "To redefine workwear for modern women — where confidence and comfort walk hand in hand.",
      icon: { id: 0, filename: "/img/vision.png", fieldtype: "asset" },
    },
    {
      _uid: "2",
      component: "card_with_icon" as const,
      heading: "Mission",
      description: "To create timeless, functional, and empowering fashion pieces that elevate women in their professional journeys.",
      icon: { id: 0, filename: "/img/mission.png", fieldtype: "asset" },
    },
  ];

  return (
    <section id="vision" className="" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <div className="vision-container py-16 md:py-24 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.9, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-center text-text-dark mb-12 md:mb-16 px-4"
          dangerouslySetInnerHTML={{ __html: heading }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
          {items.map((card, i) => (
            <motion.div
              key={card._uid}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className={`bg-white p-6 md:p-10 flex flex-col gap-4 w-full md:max-w-130 rounded-lg ${i === 0 ? 'md:justify-self-end' : ''}`}
            >
              {card.icon && (
                <div className="">
                  <Image
                    src={card.icon.filename}
                    alt={card.icon.alt || `${card.heading} icon`}
                    width={36}
                    height={26}
                  />
                </div>
              )}
              <h3 
                className="font-heading text-2xl md:text-3xl font-light text-text-dark"
                dangerouslySetInnerHTML={{ __html: card.heading }}
              />
              <p 
                className="font-body text-sm md:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: card.description }}
              />
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
