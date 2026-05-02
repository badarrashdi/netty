"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { LookbookSection } from "@/types/storyblok";

interface PortfolioProps {
  readonly data?: LookbookSection | null;
}

const defaultLookbook = [
  {
    id: "look-1",
    img: "/img/teaser1.jpg",
    label: "The Boardroom Edit",
  },
  {
    id: "look-2",
    img: "/img/teaser2.jpg",
    label: "Power Neutrals",
  },
  {
    id: "look-3",
    img: "/img/teaser3.jpg",
    label: "After Hours",
  },
  {
    id: "look-4",
    img: "/img/teaser2.jpg",
    label: "The Classic",
  },
  {
    id: "look-5",
    img: "/img/teaser1.jpg",
    label: "Weekend Smart",
  },
];

export default function Portfolio({ data }: PortfolioProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [current, setCurrent] = useState(0);
  const [maxScroll, setMaxScroll] = useState(-1000);

  const heading = data?.heading || "Lookbook Teaser";
  const lookbook = data?.cards?.length
    ? data.cards.map((card) => ({
        id: card._uid,
        img: card.icon?.filename || defaultLookbook[0].img,
        label: card.heading || "",
      }))
    : defaultLookbook;
  
  useEffect(() => {
    const calculateMaxScroll = () => {
      const CARD_WIDTH = window.innerWidth < 768 ? 288 : 320;
      const GAP = 24;
      
      const totalWidth = lookbook.length * CARD_WIDTH + (lookbook.length - 1) * GAP;
      const viewportWidth = window.innerWidth;
      const containerPadding = viewportWidth > 1280 
        ? (viewportWidth - 1280) / 2 + 64
        : viewportWidth > 768 ? 64 : 32;
      
      const calculatedMaxScroll = -(totalWidth - viewportWidth + containerPadding);
      setMaxScroll(calculatedMaxScroll);
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    return () => window.removeEventListener('resize', calculateMaxScroll);
  }, [lookbook.length]);

  function goTo(index: number) {
    const CARD_WIDTH = typeof window !== 'undefined' && window.innerWidth < 768 ? 288 : 320;
    const GAP = 24;
    const STEP = CARD_WIDTH + GAP;
    
    const clamped = Math.max(0, Math.min(index, lookbook.length - 1));
    setCurrent(clamped);
    animate(x, -(clamped * STEP), { type: "spring", stiffness: 200, damping: 30 });
  }

  return (
    <section id="lookbook" className="py-16 md:py-24 bg-white" ref={ref} {...(data ? storyblokEditable(data as any) : {})}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl mb-8 md:mb-10">
        <div className="flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-text-dark"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {/* Prev / Next arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden sm:flex gap-3">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="w-8 h-8 md:w-10 md:h-10 border border-border flex items-center justify-center text-text-muted hover:border-brown hover:text-brown transition-colors disabled:opacity-30 text-sm md:text-base"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={current === lookbook.length - 1}
              className="w-8 h-8 md:w-10 md:h-10 border border-border flex items-center justify-center text-text-muted hover:border-brown hover:text-brown transition-colors disabled:opacity-30 text-sm md:text-base"
              aria-label="Next"
            >
              →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slider track - Full width */}
      <div className="overflow-hidden" ref={trackRef}>
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: maxScroll,
            right: 0,
          }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) goTo(current + 1);
            else if (info.offset.x > 60) goTo(current - 1);
            else goTo(current);
          }}
          className="flex gap-6 cursor-grab active:cursor-grabbing select-none pl-6 md:pl-8 lg:pl-16 xl:pl-[calc((100vw-1280px)/2+4rem)]"
        >
            {lookbook.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="flex-none w-72 md:w-80 flex flex-col gap-3"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.label}
                    width={400}
                    height={330}
                    draggable={false}
                    className="object-cover transition-transform duration-500 hover:scale-105 w-full h-auto aspect-[4/3.3]"
                  />
                </div>
                <p className="font-body text-sm text-text-muted tracking-wide">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
      </div>
      
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        {/* Dot indicators */}
        <div className="flex gap-2 mt-6 md:mt-8 justify-center">
          {lookbook.map((item, i) => (
            <button
              key={item.id}
              onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-brown w-4" : "bg-border"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
