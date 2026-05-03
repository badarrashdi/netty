"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.footer 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="py-8 md:py-10 bg-white border-t border-border"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 md:gap-6">
          {/* Left — email + socials */}
          <div className="flex flex-col gap-3 items-center md:items-start">
            <a
              href="mailto:hello@worknatty.com"
              className="font-body text-sm text-text-muted hover:text-brown transition-colors"
            >
              hello@worknatty.com
            </a>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-light uppercase tracking-widest">
                Follow us
              </span>
              <a
                href="#"
                aria-label="Instagram"
                className="text-text-muted hover:text-brown transition-colors"
              >
                {/* Instagram icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-text-muted hover:text-brown transition-colors"
              >
                {/* LinkedIn icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — copyright */}
          <div className="text-center md:text-right">
            <p className="font-body text-xs text-text-light">
              © 2025 Work Natty
            </p>
            <p className="font-body text-xs text-text-light">
              Where Ambition Meets Style
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
