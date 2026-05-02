"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#5B4F47]" ref={ref}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.9, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
          >
            Contact Us
          </motion.h2>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.9, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className="w-full px-4 py-3 border border-[#DBD4C9] bg-[#5B4F47] font-body text-sm text-white placeholder:text-white/60 focus:border-[#EDE3D8] focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-left focus:scale-[1.01]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className="w-full px-4 py-3 border border-[#DBD4C9] bg-[#5B4F47] font-body text-sm text-white placeholder:text-white/60 focus:border-[#EDE3D8] focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-left focus:scale-[1.01]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <textarea
                name="message"
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className="w-full px-4 py-3 border border-[#DBD4C9] bg-[#5B4F47] font-body text-sm text-white placeholder:text-white/60 focus:border-[#EDE3D8] focus:outline-none transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-left focus:scale-[1.01]"
              />
            </motion.div>
            
            {/* Success/Error Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded text-sm"
              >
                ✓ Message sent successfully! We&apos;ll get back to you soon.
              </motion.div>
            )}
            
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm"
              >
                ✕ {errorMessage}
              </motion.div>
            )}
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                scale: status === "loading" ? 1 : 1.02,
                y: status === "loading" ? 0 : -2,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full text-dark font-body text-sm py-4 transition-all duration-300 bg-[#DBD4C9] disabled:opacity-50 disabled:cursor-not-allowed text-left px-4"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
