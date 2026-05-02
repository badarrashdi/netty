"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="fixed top-2 md:top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-6"
    >
      <div className="bg-brown text-white px-6 md:px-10 py-2.5 md:py-3 rounded-full flex items-center gap-6 md:gap-12 shadow-lg">
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs md:text-sm tracking-widest font-body font-light">
          <motion.a 
            href="#about" 
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ duration: 0.2 }}
            className="hover:opacity-70 transition-opacity uppercase"
          >
            About
          </motion.a>
          <motion.a 
            href="#vision" 
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ duration: 0.2 }}
            className="hover:opacity-70 transition-opacity uppercase"
          >
            Vision
          </motion.a>
        </div>

        <a
          href="#home"
          className="font-heading text-base md:text-lg font-semibold tracking-[0.15em] md:tracking-[0.25em] uppercase whitespace-nowrap"
        >
          Work Natty
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs md:text-sm tracking-widest font-body font-light">
          <motion.a 
            href="#lookbook" 
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ duration: 0.2 }}
            className="hover:opacity-70 transition-opacity uppercase"
          >
            Lookbook
          </motion.a>
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ duration: 0.2 }}
            className="hover:opacity-70 transition-opacity uppercase"
          >
            Contact
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
