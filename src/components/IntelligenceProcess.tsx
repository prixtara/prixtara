"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IntelligenceProcess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative w-full max-w-[460px] sm:max-w-[500px] xl:max-w-[530px] select-none pt-1"
      aria-label="Intelligence Loop: Perceive, Understand, Act"
    >
      {/* Connecting thin horizontal line */}
      <div
        className="absolute top-[5px] left-1 right-1 h-[1.5px] bg-[#94a3b8]/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Nodes & Labels */}
      <div className="relative flex justify-between items-start">
        {/* Step 1: PERCEIVE */}
        <div className="flex flex-col items-start text-left">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d121a] ring-3 ring-[#eeeff1] mb-2.5 z-10" />
          <span className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-bold tracking-[0.15em] text-[#1e2735] uppercase font-sans">
            PERCEIVE
          </span>
        </div>

        {/* Step 2: UNDERSTAND */}
        <div className="flex flex-col items-center text-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d121a] ring-3 ring-[#eeeff1] mb-2.5 z-10" />
          <span className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-bold tracking-[0.15em] text-[#1e2735] uppercase font-sans">
            UNDERSTAND
          </span>
        </div>

        {/* Step 3: ACT */}
        <div className="flex flex-col items-end text-right">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d121a] ring-3 ring-[#eeeff1] mb-2.5 z-10" />
          <span className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-bold tracking-[0.15em] text-[#1e2735] uppercase font-sans">
            ACT
          </span>
        </div>
      </div>
    </motion.div>
  );
}
