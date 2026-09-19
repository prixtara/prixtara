"use client";

import React from "react";
import { motion } from "framer-motion";

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
  lines?: string[];
}

interface WhyPrincipleProps {
  principle: PrincipleItem;
  index: number;
  total: number;
}

export default function WhyPrinciple({
  principle,
  index,
  total,
}: WhyPrincipleProps) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: 0.1 + index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`
        relative flex flex-col items-start justify-start select-none h-full
        /* Mobile divider: clean horizontal separator between items */
        pb-8 mb-8 border-b border-[#708296]/30 last:border-b-0 last:pb-0 last:mb-0
        /* Tablet 2-col layout with dividers */
        md:mb-0 md:border-b-0 md:pb-0
        ${index % 2 === 0 ? "md:pr-8 md:border-r md:border-[#708296]/45" : "md:pl-8"}
        ${index < 2 ? "md:border-b md:border-[#708296]/45 md:pb-8" : "md:pt-8"}
        /* Desktop 4-col layout: padding */
        lg:border-b-0 lg:border-r-0 lg:pt-0 lg:pb-0
        ${isFirst ? "lg:pl-0 lg:pr-8 xl:pr-10" : ""}
        ${!isFirst && !isLast ? "lg:px-8 xl:px-10" : ""}
        ${isLast ? "lg:pl-8 xl:pl-10 lg:pr-0" : ""}
      `}
    >
      {/* 01 / 02 / 03 / 04 Number */}
      <span className="text-[34px] sm:text-[38px] xl:text-[42px] font-medium tracking-[-0.02em] leading-none text-[#7b8c9f] mb-3.5 sm:mb-4 block font-sans">
        {principle.number}
      </span>

      {/* Principle Title */}
      <h3 className="text-[19px] sm:text-[20px] xl:text-[22px] 2xl:text-[23px] font-bold uppercase tracking-[-0.01em] leading-tight text-[#0a0e17] font-sans mb-2.5 sm:mb-3">
        {principle.title}
      </h3>

      {/* Principle Description with intentional editorial line wrapping */}
      <p className="text-[14.5px] sm:text-[15px] xl:text-[16px] text-[#4a5568] font-normal leading-[1.5] max-w-[240px] xl:max-w-[265px] font-sans">
        {principle.lines ? (
          principle.lines.map((line, idx) => (
            <span key={idx} className="block md:inline lg:block">
              {line}{idx < principle.lines!.length - 1 ? " " : ""}
            </span>
          ))
        ) : (
          principle.description
        )}
      </p>

      {/* Desktop Dedicated Vertical Separation Line: Crisp, clearly visible, 1px slate-gray */}
      {!isLast && (
        <div
          className="hidden lg:block absolute right-0 top-0.5 bottom-1 w-px bg-[#708296]"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
