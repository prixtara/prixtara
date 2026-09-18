"use client";

import { motion } from "framer-motion";

interface IntroStatementProps {
  className?: string;
}

export default function IntroStatement({ className = "" }: IntroStatementProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      className={`w-[350px] max-w-[360px] z-20 select-none ${className}`}
    >
      <h4 className="text-[11px] xl:text-[11.5px] font-extrabold tracking-[0.07em] text-[#0d121a] uppercase mb-1.5 leading-tight font-sans">
        WE BUILD INTELLIGENCE
        <br />
        FOR REAL-WORLD PROBLEMS.
      </h4>
      <p className="text-[11px] xl:text-[11.5px] text-[#475569] leading-[1.45] font-normal">
        We develop edge-first AI systems for industrial vision,
        <br />
        private on-device intelligence and inclusive
        <br />
        human–technology interaction.
      </p>
    </motion.div>
  );
}
