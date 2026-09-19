"use client";

import React from "react";
import Link from "next/link";

interface FooterLegalProps {
  copyrightYear?: number;
  companyName?: string;
  privacyHref?: string;
  termsHref?: string;
  className?: string;
}

export const copyrightYear = 2024;

export default function FooterLegal({
  copyrightYear: year = copyrightYear,
  companyName = "Prixtara Technologies",
  privacyHref = "#privacy",
  termsHref = "#terms",
  className = "",
}: FooterLegalProps) {
  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-6 sm:py-7 text-[13px] sm:text-[13.5px] xl:text-[14px] text-[#546276] select-none ${className}`}
    >
      {/* Copyright Notice */}
      <p className="font-normal">
        © {year} {companyName}
      </p>

      {/* Privacy & Terms Links */}
      <div className="flex items-center gap-6 sm:gap-8 font-normal">
        <Link
          href={privacyHref}
          className="hover:text-[#0a0e17] transition-colors duration-150 underline-offset-4 hover:underline"
        >
          Privacy
        </Link>
        <Link
          href={termsHref}
          className="hover:text-[#0a0e17] transition-colors duration-150 underline-offset-4 hover:underline"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}
