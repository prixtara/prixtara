"use client";

import Link from "next/link";
import { User } from "lucide-react";

interface TopRightControlsProps {
  className?: string;
}

export default function TopRightControls({ className = "" }: TopRightControlsProps) {
  return (
    <div className={`shrink-0 z-30 select-none ${className}`}>
      <div className="inline-flex items-center justify-between w-[375px] max-w-[calc(100vw-30px)] h-[58px] p-1.5 rounded-full nav-capsule">
        {/* Contact Button - occupies the large majority of capsule width */}
        <Link
          href="#contact"
          className="flex-1 flex items-center justify-center h-[46px] px-7 bg-white hover:bg-slate-50 text-[#0a0e17] text-[13px] font-bold tracking-[0.16em] uppercase rounded-full shadow-[0_1px_3px_rgba(15,23,42,0.10),0_0_0_1px_rgba(80,95,110,0.12)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
        >
          CONTACT
        </Link>

        {/* Divider between Contact and User */}
        <div className="w-[1px] h-5 bg-[rgba(80,95,110,0.22)] mx-1 shrink-0" />

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          {/* User Profile Button */}
          <button
            type="button"
            aria-label="User Profile"
            className="w-[46px] h-[46px] rounded-full bg-white hover:bg-slate-50 shadow-[0_1px_3px_rgba(15,23,42,0.10),0_0_0_1px_rgba(80,95,110,0.12)] flex items-center justify-center text-[#0d121a] hover:text-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shrink-0"
          >
            <User className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Divider between User and Menu */}
          <div className="w-[1px] h-5 bg-[rgba(80,95,110,0.22)] mx-0.5 shrink-0" />

          {/* Menu Hamburger Button */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="w-[46px] h-[46px] rounded-full bg-white hover:bg-slate-50 shadow-[0_1px_3px_rgba(15,23,42,0.10),0_0_0_1px_rgba(80,95,110,0.12)] flex items-center justify-center text-[#0d121a] hover:text-black transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shrink-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
