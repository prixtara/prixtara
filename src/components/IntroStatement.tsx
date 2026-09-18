"use client";

import { motion } from "framer-motion";

interface IntroStatementProps {
  className?: string;
}

export default function IntroStatement({ className = "" }: IntroStatementProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      className={`w-full max-w-[365px] z-20 select-none ${className}`}
    >
      <h4 className="text-[13px] sm:text-[14.5px] xl:text-[15.5px] font-extrabold tracking-[0.05em] text-[#0a0e17] uppercase mb-2 leading-[1.25] font-sans">
        WE BUILD INTELLIGENCE
        <br />
        FOR REAL-WORLD PROBLEMS.
      </h4>
      <p className="text-[12px] sm:text-[13px] xl:text-[14px] text-[#3e4a5b] leading-[1.50] font-normal">
        We develop edge-first AI systems for industrial vision,
        <br />
        private on-device intelligence and inclusive
        <br />
        human–technology interaction.
      </p>
    </motion.div>
  );
}
