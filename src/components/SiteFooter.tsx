"use client";

import React from "react";
import FooterBrand from "./FooterBrand";
import FooterColumn, { FooterLinkItem } from "./FooterColumn";
import FooterSocials from "./FooterSocials";
import FooterLegal, { copyrightYear } from "./FooterLegal";

export interface FooterColumnData {
  title: string;
  links: FooterLinkItem[];
}

export const footerColumns: FooterColumnData[] = [
  {
    title: "PRODUCTS",
    links: [
      { label: "AI Vision", href: "#ai-vision" },
      { label: "On-Device AI", href: "#on-device-ai" },
      { label: "Sambhashi", href: "#sambhashi" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "Vision", href: "#reality-story" },
      { label: "About", href: "#about" },
      { label: "Leadership", href: "#about" },
      { label: "Roadmap", href: "#people-and-future" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Technology", href: "#technology" },
      { label: "News", href: "#" },
    ],
  },
  {
    title: "CONNECT",
    links: [
      { label: "Email", href: "mailto:contact@prixtara.com" },
      { label: "LinkedIn", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer
      id="site-footer"
      aria-label="Site Footer"
      className={`w-full bg-[#eeeff1] text-[#0d121a] flex flex-col ${className}`}
    >
      {/* 1. TOP DIVIDER: 1px subtle line with ~70-80px desktop horizontal padding */}
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-[72px] 2xl:px-[80px]">
        <div className="w-full border-t border-[#506478]/[0.15]" />
      </div>

      {/* 2. MAIN FOOTER CONTENT: Brand Block + 4 Navigation Groups + Far Right Social Links */}
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-[72px] 2xl:px-[80px]">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-10 sm:gap-12 lg:gap-6 xl:gap-8 pt-10 xl:pt-12 pb-12 xl:pb-14">
          {/* Brand Identity Block (~28-29% on desktop) */}
          <div className="w-full lg:w-[28%] xl:w-[29%] shrink-0">
            <FooterBrand />
          </div>

          {/* Four Navigation Groups (~14-15% each on desktop) */}
          <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 lg:gap-6 xl:gap-10">
            {footerColumns.map((col) => (
              <FooterColumn
                key={col.title}
                title={col.title}
                links={col.links}
              />
            ))}
          </div>

          {/* Social Icons Group (~11-12% on desktop, aligned top-right) */}
          <div className="w-full lg:w-auto lg:min-w-[120px] flex items-center lg:justify-end shrink-0 pt-1 lg:pt-0.5">
            <FooterSocials />
          </div>
        </div>
      </div>

      {/* 3. SECOND DIVIDER: subtle line creating copyright/legal separation */}
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-[72px] 2xl:px-[80px]">
        <div className="w-full border-t border-[#506478]/[0.15]" />
      </div>

      {/* 4. BOTTOM LEGAL BAR: Copyright left, Privacy & Terms right */}
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-[72px] 2xl:px-[80px]">
        <FooterLegal copyrightYear={copyrightYear} />
      </div>
    </footer>
  );
}
