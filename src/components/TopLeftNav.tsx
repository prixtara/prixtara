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
        className="inline-flex items-center justify-between w-[384px] max-w-[calc(100vw-30px)] h-[58px] p-1.5 rounded-full nav-capsule shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className={`relative flex items-center justify-center h-full px-5 rounded-full text-[12.5px] transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-white text-[#0d121a] font-bold shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-[#3e4856] hover:text-black font-semibold hover:bg-black/[0.02]"
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
