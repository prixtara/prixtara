"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface ChallengeCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function RealityChallengeCard({
  title,
  description,
  image,
  index,
}: ChallengeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative w-full h-[285px] sm:h-[295px] xl:h-[305px] rounded-[20px] overflow-hidden bg-[#1e2735] shadow-[0_4px_20px_rgba(0,0,0,0.06)] select-none"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 32vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        priority={index === 0}
      />

      {/* Editorial Gradient Overlay for Text Legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#06090e]/95 via-[#06090e]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Card Content (Anchored to Bottom) */}
      <div className="absolute inset-x-0 bottom-0 p-6 xl:p-7 flex flex-col justify-end z-10">
        <h4 className="text-[15px] sm:text-[16px] xl:text-[16.5px] font-bold text-white tracking-[0.05em] uppercase font-sans mb-1.5">
          {title}
        </h4>
        <p className="text-[13px] sm:text-[13.5px] xl:text-[14px] text-white/90 font-normal leading-[1.42] whitespace-pre-line max-w-[320px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
