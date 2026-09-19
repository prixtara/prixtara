"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import IntelligenceProcess from "./IntelligenceProcess";

export default function VisionSection() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.18fr] xl:grid-cols-[1fr_1.22fr] gap-10 lg:gap-12 xl:gap-16 items-stretch">
      {/* LEFT COLUMN: Vision Statement & Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col justify-between py-1 select-none"
      >
        <div>
          {/* Eyebrow */}
          <div className="text-[11.5px] sm:text-[12px] xl:text-[12.5px] font-bold tracking-[0.18em] text-[#546276] uppercase mb-4 xl:mb-5">
            OUR VISION
          </div>

          {/* Vision Headline (Forced 4 lines on desktop) */}
          <h3 className="text-[34px] sm:text-[42px] md:text-[46px] lg:text-[44px] xl:text-[52px] 2xl:text-[56px] font-extrabold uppercase tracking-[-0.03em] leading-[1.05] text-[#0a0e17] font-sans mb-5 xl:mb-6">
            <span className="block">INTELLIGENCE</span>
            <span className="block">SHOULD MOVE</span>
            <span className="block">CLOSER TO</span>
            <span className="block">THE REAL WORLD.</span>
          </h3>

          {/* Vision Description */}
          <p className="text-[14.5px] sm:text-[15.5px] xl:text-[16.5px] text-[#3e4a5b] font-normal leading-[1.52] max-w-[540px] xl:max-w-[560px] mb-8 lg:mb-0">
            Prixtara builds intelligent systems that perceive the physical world,
            process information where it matters, and turn intelligence into
            meaningful action.
          </p>
        </div>

        {/* Intelligence Process System Diagram (Anchored to Bottom) */}
        <div className="mt-8 lg:mt-10 xl:mt-12">
          <IntelligenceProcess />
        </div>
      </motion.div>

      {/* RIGHT COLUMN: Large Real-World Industrial Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group relative w-full h-[360px] sm:h-[410px] lg:h-[440px] xl:h-[465px] 2xl:h-[480px] rounded-[20px] overflow-hidden bg-[#1e2735] shadow-[0_6px_28px_rgba(0,0,0,0.08)] select-none"
      >
        {/* Large Industrial Image */}
        <Image
          src="/images/vision-industrial.jpg"
          alt="Prixtara machine vision operating in an industrial environment"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Soft Vignette / Depth Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none"
          aria-hidden="true"
        />

        {/* Editorial Text Overlay (Top-Right) */}
        <div className="absolute top-5 right-6 sm:top-6 sm:right-7 xl:top-7 xl:right-8 text-right z-10 select-none pointer-events-none">
          <div className="text-white text-[11px] sm:text-[11.5px] xl:text-[12px] font-bold tracking-[0.16em] leading-[1.4] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-sans">
            <p>REAL</p>
            <p>ENVIRONMENTS.</p>
            <p>REAL IMPACT.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
