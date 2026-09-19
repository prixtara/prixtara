"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductExpressionGrid from "./ProductExpressionGrid";

export function ProductExpressionsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 sm:mb-8 xl:mb-9 select-none">
      {/* LEFT HEADER: Eyebrow + Main Two-Line Headline */}
      <div className="flex flex-col items-start">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-[11.5px] sm:text-[12px] xl:text-[12.5px] font-bold tracking-[0.18em] text-[#546276] uppercase mb-2.5 sm:mb-3 xl:mb-3.5 font-sans"
        >
          WHAT WE BUILD
        </motion.span>

        {/* Main Section Headline: Strictly 2 lines on desktop */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: 0.08,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="text-[34px] sm:text-[44px] md:text-[50px] lg:text-[54px] xl:text-[58px] 2xl:text-[62px] font-extrabold uppercase tracking-[-0.03em] leading-[1.04] text-[#0a0e17] font-sans text-left"
        >
          <span className="block">THREE EXPRESSIONS</span>
          <span className="block">OF THE SAME IDEA.</span>
        </motion.h2>
      </div>

      {/* RIGHT POSITIONING STATEMENT: Editorial 3-line statement */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.55,
          delay: 0.12,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="md:text-right md:self-end pb-1 xl:pb-1.5"
      >
        <p className="text-[11.5px] sm:text-[12px] xl:text-[12.5px] font-bold tracking-[0.15em] text-[#546276] uppercase leading-[1.45] font-sans">
          <span className="block">INTELLIGENT SYSTEMS</span>
          <span className="block">FOR A MORE INCLUSIVE,</span>
          <span className="block">EFFICIENT WORLD.</span>
        </p>
      </motion.div>
    </div>
  );
}

export default function ProductExpressionsSection() {
  return (
    <section
      id="solutions"
      aria-label="What we build — Three expressions of the same idea"
      className="relative w-full bg-[#eeeff1] pt-14 sm:pt-16 xl:pt-[72px] pb-20 sm:pb-24 xl:pb-[96px] px-6 sm:px-10 lg:px-12 xl:px-[68px] 2xl:px-[80px] overflow-hidden"
    >
      <div className="w-full">
        {/* Top Two-Sided Header Area */}
        <ProductExpressionsHeader />

        {/* Asymmetric Product Expressions Grid */}
        <ProductExpressionGrid />
      </div>
    </section>
  );
}
