"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface ProgressionCardData {
  imageSrc: string;
  imageAlt: string;
  label: string;
}

interface ProgressionCardProps {
  card: ProgressionCardData;
  index: number;
}

export default function ProgressionCard({ card, index }: ProgressionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: 0.15 + index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group flex flex-col w-full"
    >
      {/* Image Container with rounded corners & smooth micro-zoom on hover */}
      <div className="relative w-full aspect-[4/3] sm:h-[190px] md:h-[200px] lg:h-[200px] xl:h-[220px] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-[#e2e8f0]">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          priority={false}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          sizes="(min-width: 1280px) 16vw, (min-width: 768px) 25vw, 100vw"
        />
        {/* Subtle top edge specular highlight */}
        <div
          className="absolute inset-0 ring-1 ring-inset ring-black/[0.06] rounded-[16px] sm:rounded-[18px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Label Underneath */}
      <div className="mt-2.5 sm:mt-3">
        <p className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-semibold text-[#334155] tracking-[0.01em] font-sans leading-tight">
          {card.label}
        </p>
      </div>
    </motion.div>
  );
}
