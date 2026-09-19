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
      {/* 1. Eyebrow */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-[11px] sm:text-[11.5px] xl:text-[12px] font-medium tracking-[0.24em] text-[#475569] uppercase mb-4 xl:mb-5 whitespace-nowrap select-none"
      >
        <span>EDGE AI</span>
        <span className="text-slate-400 text-[8px]">•</span>
        <span>INDUSTRIAL VISION</span>
        <span className="text-slate-400 text-[8px]">•</span>
        <span>REAL IMPACT</span>
      </motion.div>

      {/* 2. Brand Wordmark (substantial brand mark scaled 5-8%) */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="mb-4 xl:mb-5"
      >
        <PrixtaraLogo className="w-[min(100%,320px)] sm:w-[350px] xl:w-[384px] h-auto" />
      </motion.div>

      {/* 3. Primary Headline (52px desktop, confident, tight leading, strictly 3 lines) */}
      <motion.h1
        initial={{ opacity: 1, y: 0 }}
        className="text-[36px] sm:text-[44px] md:text-[48px] xl:text-[52px] font-extrabold uppercase tracking-[-0.03em] leading-[1.06] text-[#0a0e17] max-w-[420px] mb-5 xl:mb-6 font-sans select-none"
      >
        <span className="block whitespace-nowrap">INTELLIGENCE,</span>
        <span className="block whitespace-nowrap">BUILT FOR THE</span>
        <span className="block whitespace-nowrap">REAL WORLD.</span>
      </motion.h1>

      {/* 4. Description Subtitle (17.5px desktop, clear dark slate, 2 lines) */}
      <motion.p
        initial={{ opacity: 1, y: 0 }}
        className="text-[15px] sm:text-[16px] xl:text-[17.5px] text-[#374353] font-normal leading-[1.56] max-w-[390px] mb-8 xl:mb-9 select-none"
      >
        AI that sees, understands and acts —
        <br />
        where the work happens.
      </motion.p>

      {/* 5. CTA Area */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 whitespace-nowrap select-none"
      >
        {/* Primary Explore Solutions Pill (14.5px text, compact & confident) */}
        <Link
          href="#solutions"
          className="group inline-flex items-center justify-between w-[214px] h-[46px] px-5 bg-[#0d121a] hover:bg-black text-white text-[14px] xl:text-[14.5px] font-semibold rounded-full shadow-[0_4px_14px_rgba(13,18,26,0.18)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Explore Solutions</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        {/* Secondary About Us Link (14.5px text, simple underlined text link) */}
        <Link
          href="#about"
          className="group inline-flex items-center gap-1.5 text-[14px] xl:text-[14.5px] font-bold text-[#0d121a] hover:text-black transition-all duration-200"
        >
          <span className="border-b border-[#0d121a]/60 group-hover:border-[#0d121a] pb-0.5">About Us</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  );
}
