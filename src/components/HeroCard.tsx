"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  width?: string;
  className?: string;
}

export default function HeroCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  width = "w-[240px]",
  className = "",
}: HeroCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-[22px] p-2.5 sm:p-3 border border-black/[0.07] shadow-[0_12px_32px_rgba(12,18,28,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(12,18,28,0.12)] ${width} h-[249px] shrink-0 cursor-pointer select-none flex flex-col justify-between ${className}`}
    >
      {/* Top Image */}
      <div className="relative w-full h-[162px] rounded-[15px] overflow-hidden bg-slate-900 shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Card Info Bottom Row */}
      <div className="pt-2 pb-0.5 px-1 flex items-center justify-between gap-2">
        <div className="flex flex-col min-w-0 pr-1">
          <h3 className="text-[13px] font-extrabold tracking-wider text-[#0d121a] uppercase leading-tight font-sans truncate">
            {title}
          </h3>
          <p className="text-[10px] text-slate-500 font-normal mt-0.5 whitespace-nowrap">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Explore ${title}`}
          className="w-7 h-7 rounded-full bg-[#0d121a] group-hover:bg-black text-white flex items-center justify-center transition-all duration-200 group-hover:scale-105 shrink-0 shadow-xs"
        >
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
        </button>
      </div>
    </div>
  );
}
