"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroMediaProps {
  className?: string;
}

export default function HeroMedia({ className = "" }: HeroMediaProps) {
  return (
    <div className={`relative z-10 flex flex-col items-center justify-start ${className}`}>
      {/* Precision SVG Definition for Scalable Rounded Chamfer */}
      <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none opacity-0">
        <defs>
          <clipPath id="hero-chamfer" clipPathUnits="objectBoundingBox">
            <path
              d="M 0.035,0 
                 L 0.965,0 
                 Q 1,0 1,0.032 
                 L 1,0.968 
                 Q 1,1 0.965,1 
                 L 0.185,1 
                 Q 0.142,1 0.115,0.955 
                 L 0.015,0.745 
                 Q 0,0.715 0,0.675 
                 L 0,0.032 
                 Q 0,0 0.035,0 
                 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Hero Media Container */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#9eaec0] hero-chamfer-box select-none"
      >
        <Image
          src="/images/hero-camera-v2.jpg"
          alt="Prixtara Industrial Machine Vision Device"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-[50%_32%] scale-[1.15] transform hover:scale-[1.17] transition-transform duration-700 ease-out"
        />

        {/* Subtle studio ambient lighting vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none" />
      </motion.div>
    </div>
  );
}
