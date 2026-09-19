"use client";

import React from "react";
import { motion } from "framer-motion";
import OutcomeItem, { OutcomeData } from "./OutcomeItem";

const outcomes: OutcomeData[] = [
  {
    icon: "bolt",
    lines: ["FASTER", "DECISIONS"],
  },
  {
    icon: "chart",
    lines: ["MORE CONSISTENT", "OPERATIONS"],
  },
  {
    icon: "shield",
    lines: ["LOCAL", "INTELLIGENCE"],
  },
  {
    icon: "workflow",
    lines: ["LESS MANUAL", "INTERVENTION"],
  },
  {
    icon: "users",
    lines: ["INCLUSIVE", "EXPERIENCES"],
  },
];

export default function RealOutcomesSection() {
  return (
    <section
      id="real-outcomes"
      aria-label="Real Outcomes — Intelligence That Changes The Work"
      className="relative w-full bg-[#eeeff1] py-10 sm:py-12 lg:py-12 xl:py-[54px] px-6 sm:px-10 lg:px-12 xl:px-[76px] 2xl:px-[88px] overflow-hidden select-none border-t border-[#0a0e17]/[0.06]"
    >
      {/* Full-width continuous editorial horizontal strip */}
      <div className="relative w-full flex flex-col lg:flex-row items-stretch justify-between">
        {/* =========================================================================
            ZONE 1: LEFT EDITORIAL STATEMENT (~28%)
            - Eyebrow: REAL OUTCOMES
            - 3-Line Headline: INTELLIGENCE / THAT CHANGES / THE WORK.
        ========================================================================= */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[29%] xl:w-[28%] shrink-0 pr-4 lg:pr-6 xl:pr-8 mb-8 lg:mb-0">
          {/* Section Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: 0.05,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-[#546276] font-sans mb-2 sm:mb-2.5 xl:mb-3"
          >
            REAL OUTCOMES
          </motion.p>

          {/* Main Headline: strictly 3 lines on desktop */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[38px] xl:text-[44px] 2xl:text-[48px] font-extrabold uppercase tracking-[-0.035em] leading-[1.0] text-[#0a0e17] font-sans"
          >
            <span className="block whitespace-nowrap">INTELLIGENCE</span>
            <span className="block whitespace-nowrap">THAT CHANGES</span>
            <span className="block whitespace-nowrap">THE WORK.</span>
          </motion.h2>
        </div>

        {/* =========================================================================
            ZONE 2: RIGHT OUTCOME ITEMS (~72%)
            - 5 equal columns on desktop & tablet
            - Subtle 1px vertical dividers between each column (5 total)
            - Vertically centered icons & locked 2-line baselines
        ========================================================================= */}
        <div className="relative z-10 w-full lg:w-[71%] xl:w-[72%] grid grid-cols-1 md:grid-cols-5 items-stretch flex-1">
          {outcomes.map((outcome, index) => (
            <OutcomeItem
              key={outcome.lines.join("-")}
              outcome={outcome}
              index={index}
              total={outcomes.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
