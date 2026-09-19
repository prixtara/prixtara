"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface ProductMiniProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cta: string;
  ctaHref: string;
  image: string;
  theme: "light" | "dark-image";
  index: number;
}

export default function ProductMiniPanel({
  id,
  title,
  description,
  tags,
  cta,
  ctaHref,
  image,
  theme,
  index,
}: ProductMiniProps) {
  const isLight = theme === "light";

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: 0.1 * index,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`group relative w-full h-[250px] sm:h-[255px] xl:h-[262px] rounded-[20px] overflow-hidden select-none flex ${
        isLight
          ? "bg-[#f5f6f8] border border-[#dce0e6] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          : "bg-[#0d121a] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
      }`}
      aria-label={`${title} product expression`}
    >
      {isLight ? (
        /* LIGHT THEME (ON-DEVICE AI): Left Content + Right Hardware Image */
        <div className="relative z-10 w-full h-full flex items-center justify-between">
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col justify-between h-full p-6 sm:p-7 xl:p-8 z-10 pr-2">
            <div>
              <h4 className="text-[19px] sm:text-[20px] xl:text-[21px] font-extrabold text-[#0a0e17] tracking-[-0.01em] uppercase font-sans mb-1.5">
                {title}
              </h4>
              <p className="text-[13px] sm:text-[13.5px] xl:text-[14px] text-[#475569] font-normal leading-[1.4] whitespace-pre-line mb-3.5 max-w-[240px] xl:max-w-[270px]">
                {description}
              </p>
              {/* Outline Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-[9px] xl:text-[9.5px] font-semibold tracking-[0.08em] text-[#334155] uppercase px-2.5 py-0.5 rounded-full border border-slate-300/90 bg-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Understated CTA */}
            <div className="pt-2">
              <Link
                href={ctaHref}
                className="group/cta inline-flex items-center gap-2 text-[12.5px] sm:text-[13px] xl:text-[13.5px] font-semibold text-[#0a0e17] hover:text-black transition-colors"
              >
                <span>{cta}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-200 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Hardware Device Image */}
          <div className="relative w-[44%] sm:w-[46%] lg:w-[48%] h-full overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt="Prixtara on-device edge computing hardware"
              fill
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Subtle soft gradient fade into the card background on the left of the image */}
            <div
              className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#f5f6f8] to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      ) : (
        /* DARK IMAGE THEME (SAMBHASHI): Background Photograph + Overlaid Content */
        <>
          <Image
            src={image}
            alt="Human-centered multilingual AI interface Sambhashi"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />

          {/* Dark Contrast Gradient Overlay for Sharp Left Text Legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#060a11]/95 via-[#060a11]/65 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Overlaid Content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-7 xl:p-8 max-w-[320px] sm:max-w-[340px]">
            <div>
              <h4 className="text-[19px] sm:text-[20px] xl:text-[21px] font-extrabold text-white tracking-[-0.01em] uppercase font-sans mb-1.5">
                {title}
              </h4>
              <p className="text-[13px] sm:text-[13.5px] xl:text-[14px] text-white/90 font-normal leading-[1.4] whitespace-pre-line mb-3.5">
                {description}
              </p>
              {/* Outline Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-[9px] xl:text-[9.5px] font-semibold tracking-[0.08em] text-white/95 uppercase px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Understated CTA */}
            <div className="pt-2">
              <Link
                href={ctaHref}
                className="group/cta inline-flex items-center gap-2 text-[12.5px] sm:text-[13px] xl:text-[13.5px] font-semibold text-white/95 hover:text-white transition-colors"
              >
                <span>{cta}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-200 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </>
      )}
    </motion.article>
  );
}
