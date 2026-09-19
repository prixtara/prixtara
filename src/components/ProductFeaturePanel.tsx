"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface ProductFeatureProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cta: string;
  ctaHref: string;
  image: string;
}

export default function ProductFeaturePanel({
  id,
  title,
  description,
  tags,
  cta,
  ctaHref,
  image,
}: ProductFeatureProps) {
  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative w-full h-[460px] sm:h-[500px] lg:h-full min-h-[460px] lg:min-h-[530px] xl:min-h-[545px] rounded-[20px] overflow-hidden bg-[#0d121a] select-none flex flex-col justify-between p-7 sm:p-8 xl:p-9"
      aria-label={`${title} product expression`}
    >
      {/* Background Industrial Image */}
      <Image
        src={image}
        alt="Automated visual inspection line powered by Prixtara AI Vision"
        fill
        sizes="(max-width: 1024px) 100vw, 62vw"
        priority
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      {/* Editorial Gradient Overlays for High Legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Top / Upper-Left Content */}
      <div className="relative z-10 max-w-[420px]">
        {/* Product Title */}
        <h3 className="text-[22px] sm:text-[24px] xl:text-[26px] font-extrabold text-white tracking-[-0.01em] uppercase font-sans mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[14px] sm:text-[15px] xl:text-[15.5px] text-white/90 font-normal leading-[1.48] whitespace-pre-line mb-5">
          {description}
        </p>

        {/* Feature Tags / Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[10px] xl:text-[10.5px] font-semibold tracking-[0.08em] text-white/95 uppercase px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Understated CTA */}
      <div className="relative z-10 pt-6">
        <Link
          href={ctaHref}
          className="group/cta inline-flex items-center gap-2 text-[13.5px] xl:text-[14px] font-semibold text-white/95 hover:text-white transition-colors"
        >
          <span>{cta}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover/cta:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
