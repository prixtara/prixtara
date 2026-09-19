"use client";

import React from "react";
import { motion } from "framer-motion";
import WhyPrinciple, { PrincipleItem } from "./WhyPrinciple";

export const principles: PrincipleItem[] = [
  {
    number: "01",
    title: "EDGE-FIRST",
    description: "Intelligence where the work happens.",
    lines: ["Intelligence where", "the work happens."],
  },
  {
    number: "02",
    title: "PRIVATE",
    description: "Sensitive information can stay closer to where it is created.",
    lines: ["Sensitive information", "can stay closer to where", "it is created."],
  },
  {
    number: "03",
    title: "PRACTICAL",
    description: "Designed around real-world environments and workflows.",
    lines: ["Designed around real-world", "environments and workflows."],
  },
  {
    number: "04",
    title: "HUMAN",
    description: "Technology that improves how people work, communicate and interact.",
    lines: ["Technology that improves", "how people work, communicate", "and interact."],
  },
];

export default function WhyPrixtaraSection() {
  return (
    <section
      id="why-prixtara"
      aria-label="Why Prixtara — Core Principles"
      className="relative w-full bg-[#eeeff1] pt-8 sm:pt-10 xl:pt-12 pb-20 sm:pb-24 xl:pb-[96px] px-6 sm:px-10 lg:px-12 xl:px-[68px] 2xl:px-[80px] overflow-hidden"
    >
      <div className="w-full">
        {/* Top Section Heading: strictly left-aligned, single line on desktop */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: 0.06,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[56px] 2xl:text-[60px] font-extrabold uppercase tracking-[-0.03em] leading-[1.05] text-[#0a0e17] font-sans text-left mb-8 sm:mb-10 xl:mb-12 select-none"
        >
          WHY PRIXTARA?
        </motion.h2>

        {/* Four Column Horizontal Information Band */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch w-full">
          {principles.map((principle, index) => (
            <WhyPrinciple
              key={principle.number}
              principle={principle}
              index={index}
              total={principles.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
