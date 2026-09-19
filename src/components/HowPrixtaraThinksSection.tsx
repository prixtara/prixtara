"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import IntelligenceFlow from "./IntelligenceFlow";

export default function HowPrixtaraThinksSection() {
  return (
    <section
      id="technology"
      aria-label="How Prixtara Thinks — From Data to Action"
      className="relative w-full bg-[#0b1420] overflow-hidden text-white border-t border-white/[0.06] select-none scroll-mt-6"
    >
      <span id="how-prixtara-thinks" className="sr-only" />
      {/* Subtle tonal gradient background for depth */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(16,27,40,0.8)_0%,rgba(11,20,32,1)_80%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Panoramic Banner Layout */}
      <div className="relative w-full min-h-[290px] xl:h-[320px] 2xl:h-[340px] flex flex-col lg:flex-row items-stretch justify-between">
        {/* =========================================================================
            ZONE 1: LEFT CONTENT (Eyebrow + Two-line Headline) (~28%)
        ========================================================================= */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:pl-12 lg:pr-4 xl:pl-[80px] xl:pr-6 py-8 lg:py-0 w-full lg:w-[30%] xl:w-[28%] shrink-0">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: 0.05,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8] font-sans mb-2 sm:mb-2.5"
          >
            HOW PRIXTARA THINKS
          </motion.p>

          {/* Headline: Strictly two lines, large display typography */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="text-[38px] sm:text-[46px] md:text-[52px] lg:text-[54px] xl:text-[58px] 2xl:text-[62px] font-extrabold uppercase tracking-[-0.035em] leading-[0.94] text-white font-sans whitespace-nowrap"
          >
            <span className="block">FROM DATA</span>
            <span className="block">TO ACTION.</span>
          </motion.h2>
        </div>

        {/* =========================================================================
            ZONE 2: CENTER PROCESS FLOW (5 Stages with Connecting Arrows) (~44%)
        ========================================================================= */}
        <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-2 py-6 lg:py-0 w-full lg:w-[44%] xl:w-[45%] shrink-0">
          <IntelligenceFlow />
        </div>

        {/* =========================================================================
            ZONE 3: RIGHT INDUSTRIAL VISUAL & EDITORIAL ANNOTATION (~28%)
        ========================================================================= */}
        <div className="relative flex items-center justify-end w-full lg:w-[26%] xl:w-[27%] min-h-[200px] lg:min-h-full overflow-hidden">
          {/* Industrial Scene Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/how-prixtara-thinks.jpg"
              alt="Industrial AI automation cell with machine vision camera and robotic arm"
              fill
              priority={false}
              className="object-cover object-center"
              sizes="(min-width: 1024px) 30vw, 100vw"
            />

            {/* Seamless gradient fade blending left edge into the dark canvas */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0b1420] via-[#0b1420]/45 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            {/* Top and bottom subtle dark edge feathering */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0b1420]/70 via-transparent to-[#0b1420]/70 pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Editorial Annotation: PHYSICAL INTELLIGENCE IN REAL TIME. */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: 0.35,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="relative z-10 mr-6 sm:mr-8 xl:mr-10 text-right select-none pointer-events-none py-6 lg:py-0"
          >
            <p className="text-[11px] xl:text-[11.5px] font-semibold tracking-[0.16em] uppercase text-[#cbd5e1] leading-[1.35] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-sans">
              PHYSICAL
              <br />
              INTELLIGENCE
              <br />
              IN REAL TIME.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
