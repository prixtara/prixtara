"use client";

import React from "react";
import Link from "next/link";

export interface SocialLinkItem {
  name: string;
  href: string;
  label: string;
}

export const socialLinks: SocialLinkItem[] = [
  { name: "LinkedIn", href: "#", label: "Prixtara on LinkedIn" },
  { name: "X", href: "#", label: "Prixtara on X (formerly Twitter)" },
  { name: "YouTube", href: "#", label: "Prixtara on YouTube" },
];

interface FooterSocialsProps {
  className?: string;
}

export default function FooterSocials({ className = "" }: FooterSocialsProps) {
  return (
    <div
      aria-label="Social links"
      className={`flex items-center gap-4 sm:gap-5 select-none ${className}`}
    >
      {/* LinkedIn */}
      <Link
        href={socialLinks[0].href}
        aria-label={socialLinks[0].label}
        className="text-[#0a0e17] hover:text-black transition-opacity duration-150 hover:opacity-75"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[19px] h-[19px] sm:w-[21px] sm:h-[21px]"
          aria-hidden="true"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74V9.92H5.06v8.58h2.8z" />
        </svg>
      </Link>

      {/* X (formerly Twitter) */}
      <Link
        href={socialLinks[1].href}
        aria-label={socialLinks[1].label}
        className="text-[#0a0e17] hover:text-black transition-opacity duration-150 hover:opacity-75"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>

      {/* YouTube */}
      <Link
        href={socialLinks[2].href}
        aria-label={socialLinks[2].label}
        className="text-[#0a0e17] hover:text-black transition-opacity duration-150 hover:opacity-75"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[21px] h-[21px] sm:w-[23px] sm:h-[23px]"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </Link>
    </div>
  );
}
