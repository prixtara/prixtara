"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FutureRoadmap from "./FutureRoadmap";

interface FutureDirectionProps {
  className?: string;
}

export default function FutureDirection({
  className = "",
}: FutureDirectionProps) {
  return (
    <div
      className={`relative flex flex-col justify-between w-full h-full pt-1 sm:pt-2 lg:pt-0 ${className}`}
    >
      {/* =========================================================================
          ATMOSPHERIC LANDSCAPE BACKGROUND
          - Mountain range metaphor for Prixtara's horizon
          - Seamless mask blending into #eeeff1 off-white page background
          - Low contrast, high-key mist so text and timeline remain crystal clear
      ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="absolute -top-10 -right-8 sm:-right-12 lg:-right-14 -left-12 sm:-left-20 lg:-left-28 bottom-0 pointer-events-none select-none overflow-hidden z-0"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.5) 25%, black 50%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.5) 25%, black 50%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/future-mountain-seamless.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-right pointer-events-none select-none"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
      </motion.div>

      {/* =========================================================================
          HEADER: Eyebrow + 3-Line Display Headline
          - Exact copy: FROM SEEING THE WORLD TO ACTING IN IT.
          - 3 lines, tight leading, near-black / deep navy
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
          WHAT&apos;S NEXT
        </motion.p>

        {/* Headline: strictly 3 lines, strong display scale */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: 0.08,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="text-[34px] sm:text-[42px] md:text-[46px] lg:text-[42px] xl:text-[50px] 2xl:text-[56px] font-extrabold uppercase tracking-[-0.035em] leading-[0.98] text-[#0a0e17] font-sans"
        >
          <span className="block whitespace-nowrap">FROM SEEING</span>
          <span className="block whitespace-nowrap">THE WORLD</span>
          <span className="block whitespace-nowrap">
            TO ACTING IN IT<span className="-ml-0.5 inline-block">.</span>
          </span>
        </motion.h2>
      </div>

      {/* =========================================================================
          STRATEGIC ROADMAP: 5-Stage Timeline
          - Positioned below the headline with atmospheric breathing space
          - VISION ─ EDGE AI ─ HUMAN INTERACTION ─ AUTONOMOUS SYSTEMS ─ ROBOTICS
      ========================================================================= */}
      <div className="relative z-10 mt-16 sm:mt-24 lg:mt-28 xl:mt-36 pt-4 pb-2 sm:pb-4">
        <FutureRoadmap />
      </div>
    </div>
  );
}
