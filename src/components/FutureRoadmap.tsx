"use client";

import React from "react";
import { motion } from "framer-motion";

const futureStages = [
  "VISION",
  "EDGE AI",
  "HUMAN INTERACTION",
  "AUTONOMOUS SYSTEMS",
  "ROBOTICS",
];

interface FutureRoadmapProps {
  className?: string;
}

export default function FutureRoadmap({ className = "" }: FutureRoadmapProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* =========================================================================
          DESKTOP / TABLET: Single Continuous 5-Stage Strategic Timeline
          - Connecting 1px muted cool line running from first node center to last node center
          - 5 dark navy nodes centered above each label
          - Precise alignment matching visual authority
      ========================================================================= */}
      <div className="hidden sm:block relative w-full pt-1">
        {/* Continuous horizontal connecting line running from center of dot 1 (10%) to dot 5 (90%) */}
        <div
          className="absolute top-[5.5px] left-[10%] right-[10%] h-[1px] bg-[#0a0e17]/20"
          aria-hidden="true"
        />

        {/* 5 Points distributed evenly across the width */}
        <div className="relative z-10 grid grid-cols-5 w-full">
          {futureStages.map((stage, index) => {
            const isAutonomous = stage === "AUTONOMOUS SYSTEMS";

            return (
              <div
                key={stage}
                className="flex flex-col items-center text-center px-1"
              >
                {/* Dark navy circular node with protective ring halo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0a0e17] ring-4 ring-[#eeeff1] z-10"
                />

                {/* Stage label */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08 + index * 0.05,
                    ease: "easeOut",
                  }}
                  className="mt-3 text-[10px] sm:text-[10.5px] lg:text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.14em] text-[#334155] font-sans leading-[1.25] select-none text-center"
                >
                  {isAutonomous ? (
                    <>
                      <span className="block">AUTONOMOUS</span>
                      <span className="block">SYSTEMS</span>
                    </>
                  ) : (
                    <span>{stage}</span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW (<640px): Clean Multi-Row Strategic Progression
          - Avoids cramped, microscopic labels or problematic horizontal clipping
          - Preserves connected roadmap aesthetic with clear readability
      ========================================================================= */}
      <div className="sm:hidden flex flex-col gap-4 relative pl-5 border-l border-[#0a0e17]/25">
        {futureStages.map((stage, index) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.05 + index * 0.05,
              ease: "easeOut",
            }}
            className="relative flex items-center gap-3"
          >
            {/* Dot on left vertical line */}
            <div className="absolute -left-[26px] w-3 h-3 rounded-full bg-[#0a0e17] ring-4 ring-[#eeeff1]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#334155] font-sans">
              {stage}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
