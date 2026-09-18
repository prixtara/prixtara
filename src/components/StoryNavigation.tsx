"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface StoryNavigationProps {
  className?: string;
}

const STORY_LINKS = [
  { label: "AI VISION", href: "#ai-vision" },
  { label: "ON-DEVICE AI", href: "#on-device-ai" },
  { label: "SAMBHASHI", href: "#sambhashi" },
];

export default function StoryNavigation({ className = "" }: StoryNavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      aria-label="Story Navigation"
      className={`flex items-center gap-8 sm:gap-10 xl:gap-12 z-20 select-none ${className}`}
    >
      {STORY_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="group flex items-center gap-1.5 text-[11px] xl:text-[11.5px] font-extrabold tracking-[0.14em] text-[#0d121a] uppercase hover:text-black transition-colors whitespace-nowrap"
        >
          <span>{link.label}</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      ))}
    </motion.nav>
  );
}
