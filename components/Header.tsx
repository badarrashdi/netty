"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export default function Header() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
    >
    <div className="flex justify-between">
        <Image src="/img/logo.png" alt="Work Natty Logo" className="w-auto h-[71px]" width={352} height={71} />
    </div>

    </motion.nav>
  );
}
