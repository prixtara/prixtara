"use client";

import React from "react";
import Link from "next/link";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterColumnProps {
  title: string;
  links: FooterLinkItem[];
  className?: string;
}

export default function FooterColumn({
  title,
  links,
  className = "",
}: FooterColumnProps) {
  return (
    <nav
      aria-label={`${title} Navigation`}
      className={`flex flex-col items-start ${className}`}
    >
      {/* Column Heading */}
      <h3 className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-bold uppercase tracking-[0.14em] text-[#475569] mb-4 sm:mb-5 select-none">
        {title}
      </h3>

      {/* Column Links List */}
      <ul className="flex flex-col space-y-2.5 sm:space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14px] sm:text-[14.5px] xl:text-[15px] text-[#2b3748] hover:text-[#0a0e17] transition-colors duration-150 inline-block select-none"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
