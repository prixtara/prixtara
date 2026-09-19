"use client";

import React from "react";
import { motion } from "framer-motion";
import PersonProfile, { PersonProfileData } from "./PersonProfile";

const people: PersonProfileData[] = [
  {
    role: "FOUNDER",
    name: "Name to be provided",
    description: "Leading Prixtara's vision for real-world intelligence.",
    image: "/images/founder-portrait-v3.jpg",
    imageAlt: "Technical founder and systems engineer portrait placeholder",
    isPrimary: true,
  },
  {
    role: "LEADERSHIP",
    name: "Details to be provided",
    description: "Driving technology, impact and growth.",
    image: "/images/leadership-portrait-v3.jpg",
    imageAlt: "Technology and operations leadership portrait placeholder",
    isPrimary: false,
  },
];

interface PeopleBehindPrixtaraProps {
  className?: string;
}

export default function PeopleBehindPrixtara({
  className = "",
}: PeopleBehindPrixtaraProps) {
  return (
    <div
      className={`relative flex flex-col justify-between w-full h-full ${className}`}
    >
      {/* =========================================================================
          HEADER: Eyebrow + 3-Line Display Headline
          - Exact copy: BUILDING THE INTELLIGENCE OF TOMORROW.
          - Display typography consistent with other homepage chapters
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
          THE PEOPLE BEHIND PRIXTARA
        </motion.p>

        {/* Headline: strictly 3 lines, high-impact display scale */}
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
          <span className="block whitespace-nowrap">BUILDING</span>
          <span className="block whitespace-nowrap">THE INTELLIGENCE</span>
          <span className="block whitespace-nowrap">
            OF TOMORROW<span className="-ml-1.5 sm:-ml-2 inline-block">.</span>
          </span>
        </motion.h2>
      </div>

      {/* =========================================================================
          EDITORIAL PEOPLE AREA: Founder (Primary) & Leadership (Secondary)
          - Side-by-side editorial portrait + description matching reference
          - Direct placement on page background without container cards
      ========================================================================= */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start lg:items-end gap-7 sm:gap-8 md:gap-7 xl:gap-8 2xl:gap-10 mt-8 sm:mt-10 lg:mt-12 xl:mt-14">
        {people.map((person, index) => (
          <PersonProfile
            key={person.role}
            person={person}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
