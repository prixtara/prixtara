"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TestimonialNavigation from "./TestimonialNavigation";

interface TestimonialBlockProps {
  className?: string;
}

export default function TestimonialBlock({ className = "" }: TestimonialBlockProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 5;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative w-full bg-white/95 rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 md:p-8 xl:p-9 border border-[#0a0e17]/[0.05] shadow-[0_4px_24px_-6px_rgba(15,23,42,0.03)] flex flex-col md:flex-row items-stretch justify-between gap-6 lg:gap-6 xl:gap-8 ${className}`}
    >
      {/* =========================================================================
          LEFT SUB-PANEL: EYEBROW + QUOTATION + CREDENTIALS + NAV CONTROLS (~54%)
      ========================================================================= */}
      <div className="flex flex-col justify-between w-full md:w-[54%] xl:w-[55%] shrink-0">
        <div>
          {/* Eyebrow */}
          <p className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-[#546276] font-sans mb-4 sm:mb-6">
            WHAT PEOPLE SAY
          </p>

          {/* Quotation with stylized quote glyph */}
          <div className="relative mt-2 sm:mt-3 mb-6 sm:mb-8">
            <blockquote className="text-[28px] sm:text-[32px] md:text-[34px] xl:text-[38px] 2xl:text-[40px] font-semibold text-[#0a0e17] leading-[1.16] tracking-[-0.025em] font-sans">
              <span
                className="inline-block text-[#0a0e17] font-serif text-[34px] sm:text-[40px] xl:text-[44px] leading-none mr-1 sm:mr-1.5 select-none -translate-y-0.5"
                aria-hidden="true"
              >
                “
              </span>
              Customer perspective will appear here.”
            </blockquote>
          </div>

          {/* Customer Identification Placeholders */}
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[15px] sm:text-[16px] font-bold text-[#0a0e17] tracking-[-0.01em] font-sans">
              Name to be provided
            </p>
            <p className="text-[13.5px] sm:text-[14.5px] font-normal text-[#64748b] tracking-[0.01em] font-sans">
              Organization to be provided
            </p>
          </div>
        </div>

        {/* Carousel Slide Navigation Controls */}
        <div className="pt-6 sm:pt-8 md:pt-10">
          <TestimonialNavigation
            currentIndex={activeSlide}
            total={totalSlides}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* =========================================================================
          RIGHT SUB-PANEL: CONTEXTUAL PHOTOGRAPH (~46%)
      ========================================================================= */}
      <div className="relative w-full md:w-[46%] xl:w-[45%] min-h-[240px] sm:min-h-[280px] md:min-h-[300px] lg:min-h-[320px] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-[#e2e8f0]">
        <Image
          src="/images/testimonial-placeholder.jpg"
          alt="Technical engineer monitoring industrial machine vision telemetry"
          fill
          priority={false}
          className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw"
        />
        {/* Very subtle cool gradient feather for depth */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
