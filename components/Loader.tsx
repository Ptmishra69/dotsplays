"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after a few seconds to reveal the hero section
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          /* The background fades in smoothly as requested */
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 font-sans font-medium uppercase tracking-[0.15em] text-white text-lg sm:text-2xl text-center py-4">
            
            {/* Half from the left */}
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-zinc-400 font-light"
            >
              Welcome to
            </motion.span>
            
            {/* Half from the right */}
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Singularity Protocol
            </motion.span>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
