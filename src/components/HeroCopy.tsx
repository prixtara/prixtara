"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PrixtaraLogo from "./PrixtaraLogo";

interface HeroCopyProps {
  className?: string;
}

export default function HeroCopy({ className = "" }: HeroCopyProps) {
  return (
    <div className={`flex flex-col z-20 ${className}`}>
      {/* 1. Eyebrow (target y ≈ 228px) */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-[10px] xl:text-[10.5px] font-bold tracking-[0.24em] text-[#556070] uppercase mb-5 xl:mb-6 whitespace-nowrap select-none"
      >
        <span>EDGE AI</span>
        <span className="text-slate-400 font-bold text-[7.5px]">•</span>
        <span>INDUSTRIAL VISION</span>
        <span className="text-slate-400 font-bold text-[7.5px]">•</span>
        <span>REAL IMPACT</span>
      </motion.div>

      {/* 2. Brand Wordmark (target y ≈ 271px) */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="mb-5 xl:mb-6"
      >
        <PrixtaraLogo className="w-[338px] xl:w-[344px] h-auto" />
      </motion.div>

      {/* 3. Primary Headline (target y ≈ 369px to 522px) */}
      <motion.h1
        initial={{ opacity: 1, y: 0 }}
        className="text-[44px] sm:text-[46px] xl:text-[48px] font-extrabold uppercase tracking-[-0.035em] leading-[1.14] text-[#0d121a] max-w-[370px] mb-6 xl:mb-7 font-sans select-none"
      >
        <span className="block whitespace-nowrap">INTELLIGENCE,</span>
        <span className="block whitespace-nowrap">BUILT FOR THE</span>
        <span className="block whitespace-nowrap">REAL WORLD.</span>
      </motion.h1>

      {/* 4. Description Subtitle (target y ≈ 558px) */}
      <motion.p
        initial={{ opacity: 1, y: 0 }}
        className="text-[13.5px] xl:text-[14px] text-[#4d5765] font-normal leading-[1.48] max-w-[325px] mb-10 xl:mb-11 select-none"
      >
        AI that sees, understands and acts —
        <br />
        where the work happens.
      </motion.p>

      {/* 5. CTA Area (target y ≈ 644px) */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 whitespace-nowrap select-none"
      >
        {/* Primary Explore Solutions Pill */}
        <Link
          href="#solutions"
          className="group inline-flex items-center justify-between w-[195px] h-[44px] px-5 bg-[#0d121a] hover:bg-black text-white text-[12px] font-semibold rounded-full shadow-[0_4px_14px_rgba(13,18,26,0.18)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Explore Solutions</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        {/* Secondary About Us Link */}
        <Link
          href="#about"
          className="group inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0d121a] hover:text-black transition-all duration-200"
        >
          <span className="border-b border-[#0d121a]/60 group-hover:border-[#0d121a] pb-0.5">About Us</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  );
}
