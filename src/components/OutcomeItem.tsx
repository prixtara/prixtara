"use client";

import React from "react";
import { motion } from "framer-motion";

export interface OutcomeData {
  icon: "bolt" | "chart" | "shield" | "workflow" | "users";
  lines: [string, string];
}

interface OutcomeItemProps {
  outcome: OutcomeData;
  index: number;
  total: number;
}

/**
 * Editorial line icons crafted with 100% fidelity to the visual reference:
 * - Consistent 1.75px stroke width
 * - Muted dark blue-gray (#334155 / #1e293b)
 * - Outline geometry, zero fill
 */
export function OutcomeIcon({
  icon,
  className = "w-[30px] h-[30px] xl:w-[32px] xl:h-[32px] text-[#334155]",
}: {
  icon: OutcomeData["icon"];
  className?: string;
}) {
  switch (icon) {
    case "bolt":
      // Sharp geometric lightning bolt outline
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <polygon points="13 2 4 13.5 11 13.5 10 22 20 9.5 13 9.5 13 2" />
        </svg>
      );

    case "chart":
      // Three rising vertical arched pillars resting on baseline matching reference
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M4 20v-6a2 2 0 0 1 4 0v6" />
          <path d="M10 20v-10a2 2 0 0 1 4 0v10" />
          <path d="M16 20V5a2 2 0 0 1 4 0v15" />
        </svg>
      );

    case "shield":
      // Smooth contoured shield outline with crowned top and soft tapered point
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 21.5C12 21.5 19 17 19 10.5V5.5C19 4.67 18.33 4 17.5 4H6.5C5.67 4 5 4.67 5 5.5V10.5C5 17 12 21.5 12 21.5Z" />
        </svg>
      );

    case "workflow":
      // Two users: foreground user with circle head + secondary user behind to upper right
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="8.5" cy="8.5" r="3.2" />
          <path d="M3 20a5.5 5.5 0 0 1 11 0" />
          <circle cx="16.5" cy="7" r="2.8" />
          <path d="M14.5 14.5a4.5 4.5 0 0 1 6.5 4.5" />
        </svg>
      );

    case "users":
      // Three users: center user flanked by left and right users matching reference
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="7.5" r="3" />
          <path d="M7 20a5 5 0 0 1 10 0" />
          <circle cx="5" cy="9" r="2.4" />
          <path d="M2 20a3.8 3.8 0 0 1 3.8-3.2" />
          <circle cx="19" cy="9" r="2.4" />
          <path d="M18.2 16.8a3.8 3.8 0 0 1 3.8 3.2" />
        </svg>
      );

    default:
      return null;
  }
}

export default function OutcomeItem({ outcome, index }: OutcomeItemProps) {
  const numberStr = `0${index + 1}`;

  return (
    <>
      {/* =====================================================================
          DESKTOP & TABLET COLUMN VIEW (≥ 768px)
          - Subtle vertical divider on the left of each outcome column
          - Vertical centering
          - Locked icon height and baseline
      ===================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.5,
          delay: 0.12 + index * 0.07,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="relative hidden md:flex flex-col items-center justify-center text-center px-2 lg:px-3 xl:px-4 2xl:px-6 h-full py-2 select-none"
      >
        {/* Subtle vertical divider on the left: 1px light cool gray with ~14% opacity */}
        <div
          className="absolute left-0 top-1 bottom-1 w-[1px] bg-[#0a0e17]/[0.12] pointer-events-none"
          aria-hidden="true"
        />

        {/* Icon Container: rigidly constrained to guarantee exact baseline alignment */}
        <div className="h-[36px] xl:h-[38px] flex items-center justify-center mb-3.5 xl:mb-4">
          <OutcomeIcon
            icon={outcome.icon}
            className="w-[28px] h-[28px] xl:w-[32px] xl:h-[32px] text-[#334155]"
          />
        </div>

        {/* Outcome Label: Strictly 2 lines, uppercase, near-black, tight leading */}
        <div className="flex flex-col items-center justify-start min-h-[36px] xl:min-h-[40px]">
          <h3 className="text-[13px] lg:text-[13.5px] xl:text-[14.5px] 2xl:text-[15.5px] font-bold tracking-[-0.015em] text-[#0a0e17] leading-[1.18] uppercase text-center font-sans whitespace-nowrap">
            <span className="block">{outcome.lines[0]}</span>
            <span className="block">{outcome.lines[1]}</span>
          </h3>
        </div>
      </motion.div>

      {/* =====================================================================
          MOBILE STACKED VIEW (< 768px)
          - 01 / icon / label stacked row
          - Subtle horizontal separator
      ===================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.45,
          delay: 0.08 + index * 0.06,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="flex md:hidden items-center justify-between py-4 border-b border-[#0a0e17]/[0.08] last:border-b-0 w-full select-none"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-[12px] font-mono font-semibold tracking-wider text-[#64748b]">
            {numberStr}
          </span>
          <div className="w-8 h-8 flex items-center justify-center">
            <OutcomeIcon icon={outcome.icon} className="w-6 h-6 text-[#334155]" />
          </div>
        </div>

        <div className="text-right">
          <h3 className="text-[13.5px] font-bold uppercase tracking-[-0.01em] text-[#0a0e17] leading-[1.2] font-sans">
            <span className="block">{outcome.lines[0]}</span>
            <span className="block">{outcome.lines[1]}</span>
          </h3>
        </div>
      </motion.div>
    </>
  );
}
