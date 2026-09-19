"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterBrandProps {
  tagline?: string;
  className?: string;
}

export default function FooterBrand({
  tagline = "Intelligence, built for the real world.",
  className = "",
}: FooterBrandProps) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      {/* Brand Logo: 4-pointed spark symbol + crisp Prixtara wordmark */}
      <Link
        href="/"
        aria-label="Prixtara Home"
        className="inline-flex items-center gap-2.5 sm:gap-3 group select-none transition-opacity duration-150 hover:opacity-85"
      >
        {/* Four-pointed spark mark */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] text-[#0a0e17] shrink-0 pointer-events-none"
          aria-hidden="true"
        >
          <path d="M12 0C12.3 6.6 17.4 11.7 24 12C17.4 12.3 12.3 17.4 12 24C11.7 17.4 6.6 12.3 0 12C6.6 11.7 11.7 6.6 12 0Z" />
        </svg>

        {/* Prixtara crisp wordmark */}
        <div className="relative w-[130px] sm:w-[145px] xl:w-[155px] h-auto pointer-events-none">
          <Image
            src="/images/prixtara-logo-crisp.png"
            alt="Prixtara"
            width={450}
            height={88}
            className="w-full h-auto object-contain"
          />
        </div>
      </Link>

      {/* Brand Tagline */}
      <p className="text-[14px] sm:text-[14.5px] xl:text-[15px] text-[#546276] font-normal leading-relaxed mt-3.5 sm:mt-4 select-none">
        {tagline}
      </p>
    </div>
  );
}
