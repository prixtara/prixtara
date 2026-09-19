"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface PersonProfileData {
  role: string;
  name: string;
  description: string;
  image: string;
  imageAlt?: string;
  isPrimary?: boolean;
}

interface PersonProfileProps {
  person: PersonProfileData;
  index?: number;
  className?: string;
}

export default function PersonProfile({
  person,
  index = 0,
  className = "",
}: PersonProfileProps) {
  const isFounder = person.isPrimary || person.role === "FOUNDER";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12 + 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`flex flex-col lg:flex-row items-start lg:items-end gap-3.5 sm:gap-4 xl:gap-4.5 ${className}`}
    >
      {/* =========================================================================
          PORTRAIT IMAGE CONTAINER
          - Founder: ~220–240px width, ~320–355px height
          - Leadership: ~145–165px width, ~215–235px height
          - Rounded corners (~16–18px), subtle border, direct editorial presentation
      ========================================================================= */}
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-[14px] sm:rounded-[16px] bg-[#dde0e4] border border-[#0a0e17]/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.06)] select-none shrink-0 ${
          isFounder
            ? "w-[190px] sm:w-[210px] md:w-[225px] xl:w-[235px] 2xl:w-[245px] h-[270px] sm:h-[300px] md:h-[325px] xl:h-[345px] 2xl:h-[360px]"
            : "w-[125px] sm:w-[135px] md:w-[145px] xl:w-[155px] 2xl:w-[165px] h-[180px] sm:h-[195px] md:h-[210px] xl:h-[225px] 2xl:h-[240px]"
        }`}
      >
        <Image
          src={person.image}
          alt={person.imageAlt || `${person.role} portrait placeholder`}
          fill
          sizes={
            isFounder
              ? "(min-width: 1280px) 245px, 210px"
              : "(min-width: 1280px) 165px, 140px"
          }
          className="object-cover object-center"
          priority={false}
        />
        {/* Subtle photographic vignette overlay */}
        <div
          className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[14px] sm:rounded-[16px] pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* =========================================================================
          EDITORIAL INFORMATION BLOCK (Role, Name, Description)
          - Aligned beside the portrait on desktop matching reference authority
          - Stacks below portrait on smaller viewports
      ========================================================================= */}
      <div
        className={`pb-1 ${
          isFounder
            ? "max-w-[170px] sm:max-w-[190px] xl:max-w-[205px]"
            : "max-w-[150px] sm:max-w-[170px] xl:max-w-[185px]"
        }`}
      >
        {/* Role eyebrow */}
        <p className="text-[11px] sm:text-[11.5px] xl:text-[12px] font-bold uppercase tracking-[0.16em] text-[#0a0e17] font-sans">
          {person.role}
        </p>

        {/* Name placeholder */}
        <p className="mt-1 text-[15px] sm:text-[15.5px] xl:text-[16.5px] font-bold text-[#0a0e17] tracking-[-0.015em] font-sans leading-tight">
          {person.name}
        </p>

        {/* Description */}
        <p className="mt-1.5 text-[12.5px] sm:text-[13px] xl:text-[13.5px] leading-[1.38] text-[#546276] font-sans">
          {person.description}
        </p>
      </div>
    </motion.div>
  );
}
