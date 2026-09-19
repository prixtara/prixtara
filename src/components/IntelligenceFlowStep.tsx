"use client";

import React from "react";
import { motion } from "framer-motion";

export interface FlowStepData {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IntelligenceFlowStepProps {
  step: FlowStepData;
  index: number;
  total?: number;
  isLast?: boolean;
}

export default function IntelligenceFlowStep({
  step,
  index,
  isLast = false,
}: IntelligenceFlowStepProps) {
  const IconComponent = step.icon;

  return (
    <div className="flex items-center">
      {/* Step Icon & Label Block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.5,
          delay: 0.15 + index * 0.08,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="flex flex-col items-center justify-center text-center select-none group min-w-[64px] sm:min-w-[76px] xl:min-w-[88px]"
      >
        {/* Step Icon Container */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/90 group-hover:text-white transition-colors duration-200">
          <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>

        {/* Step Label */}
        <span className="mt-2.5 text-[10.5px] sm:text-[11.5px] xl:text-[12px] font-semibold tracking-[0.14em] text-[#cfd6df] uppercase whitespace-nowrap font-sans">
          {step.label}
        </span>
      </motion.div>

      {/* Directional Connecting Arrow (only between steps) */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{
            duration: 0.4,
            delay: 0.2 + index * 0.08,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mx-1.5 sm:mx-2.5 md:mx-3 xl:mx-4 mb-6 flex items-center justify-center text-slate-400/70 shrink-0"
          aria-hidden="true"
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-3 sm:w-5 sm:h-3.5 xl:w-5.5 xl:h-4 text-slate-400/80"
          >
            <line x1="2" y1="8" x2="20" y2="8" />
            <polyline points="14 2 20 8 14 14" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
