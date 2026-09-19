"use client";

import React from "react";
import { motion } from "framer-motion";
import ProgressionCard, { ProgressionCardData } from "./ProgressionCard";

const progressionSteps: ProgressionCardData[] = [
  {
    imageSrc: "/images/rd-testing.jpg",
    imageAlt: "Industrial machine vision test bench with optical camera inspecting workpiece",
    label: "R&D and real-world testing",
  },
  {
    imageSrc: "/images/pilot-deployment.jpg",
    imageAlt: "Automated factory production conveyor line with vision sensors and robotic systems",
    label: "Pilot deployments",
  },
  {
    imageSrc: "/images/continuous-innovation.jpg",
    imageAlt: "Contemporary industrial technology center and advanced engineering headquarters",
    label: "Continuous innovation",
  },
];

interface BuiltToMoveProps {
  className?: string;
}

export default function BuiltToMove({ className = "" }: BuiltToMoveProps) {
  return (
    <div className={`relative flex flex-col justify-between w-full h-full pt-6 sm:pt-7 md:pt-8 xl:pt-9 ${className}`}>
      {/* =========================================================================
          HEADER: Eyebrow + Two-Line Display Headline
      ========================================================================= */}
      <div className="relative z-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-[#546276] font-sans mb-3 sm:mb-3.5 xl:mb-4"
        >
          BUILT TO MOVE
        </motion.p>

        {/* Headline: strictly 2 lines, large display scale, refined tracking */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-[36px] sm:text-[42px] md:text-[46px] lg:text-[46px] xl:text-[52px] 2xl:text-[56px] font-extrabold uppercase tracking-[-0.025em] leading-[0.98] text-[#0a0e17] font-sans"
        >
          <span className="block whitespace-nowrap">FROM IDEA TO</span>
          <span className="block whitespace-nowrap">REALITY.</span>
        </motion.h2>
      </div>

      {/* =========================================================================
          PROGRESSION GRID: 3 Image-Led Modules Side-by-Side
      ========================================================================= */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 xl:gap-4.5 mt-8 sm:mt-10 lg:mt-12 xl:mt-14 items-start">
        {progressionSteps.map((step, index) => (
          <ProgressionCard key={step.label} card={step} index={index} />
        ))}
      </div>
    </div>
  );
}
