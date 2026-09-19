"use client";

import React from "react";
import { motion } from "framer-motion";
import RealityChallengeGrid from "./RealityChallengeGrid";
import VisionSection from "./VisionSection";

export function RealitySectionHeader() {
  return (
    <div className="flex flex-col items-start mb-7 sm:mb-8 xl:mb-9 select-none">
      {/* Top Eyebrow */}
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-[11px] sm:text-[12px] xl:text-[12.5px] font-bold tracking-[0.18em] text-[#546276] uppercase mb-3 xl:mb-3.5 font-sans"
      >
        REAL CHALLENGES. REAL ENVIRONMENTS.
      </motion.span>

      {/* Main Section Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-[34px] sm:text-[44px] md:text-[50px] lg:text-[54px] xl:text-[58px] 2xl:text-[62px] font-extrabold uppercase tracking-[-0.03em] leading-[1.05] text-[#0a0e17] font-sans text-left"
      >
        THE REAL WORLD IS MESSY.
      </motion.h2>
    </div>
  );
}

export default function RealitySection() {
  return (
    <section
      id="reality-story"
      aria-label="Real challenges in real environments"
      className="relative w-full bg-[#eeeff1] pt-14 sm:pt-16 xl:pt-[72px] pb-20 sm:pb-24 xl:pb-[100px] px-6 sm:px-10 lg:px-12 xl:px-[68px] overflow-hidden"
    >
      <div className="w-full">
        {/* Top Header */}
        <RealitySectionHeader />

        {/* Three Problem Cards Grid */}
        <RealityChallengeGrid />

        {/* Spacing to Vision subsection (55–75px) */}
        <div className="mt-14 sm:mt-16 xl:mt-[72px]">
          {/* Vision Subsection */}
          <VisionSection />
        </div>
      </div>
    </section>
  );
}
