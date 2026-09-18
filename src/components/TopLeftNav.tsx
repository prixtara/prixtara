"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { name: "Home", href: "#" },
  { name: "Solutions", href: "#solutions" },
  { name: "Technology", href: "#technology" },
  { name: "About", href: "#about" },
];

interface TopLeftNavProps {
  className?: string;
}

export default function TopLeftNav({ className = "" }: TopLeftNavProps) {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <header className={`shrink-0 z-30 select-none ${className}`}>
      <nav
        aria-label="Main Navigation"
        className="inline-flex items-center justify-between w-[384px] max-w-[calc(100vw-30px)] h-[58px] p-1.5 rounded-full nav-capsule"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className={`relative flex items-center justify-center h-[46px] px-5 rounded-full text-[13px] transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-white text-[#0a0e17] font-bold shadow-[0_1px_3px_rgba(15,23,42,0.10),0_0_0_1px_rgba(80,95,110,0.12)]"
                  : "text-[#323d4c] hover:text-[#0a0e17] font-semibold hover:bg-black/[0.03]"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
