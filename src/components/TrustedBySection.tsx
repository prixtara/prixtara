"use client";

import React from "react";
import {
  CarFront,
  Heart,
  Landmark,
  FlaskConical,
  Crosshair,
  type LucideProps,
} from "lucide-react";

// =============================================================================
// ORIGINAL PLACEHOLDER ICONS (Clean, lightweight line icons, stroke-width ~1.4)
// =============================================================================

function ManufacturingIcon(props: LucideProps) {
  const { size = 28, strokeWidth = 1.4, className, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {/* 4-lobed industrial interconnected node / knot */}
      <rect x="7.5" y="2.5" width="9" height="19" rx="4.5" />
      <rect x="2.5" y="7.5" width="19" height="9" rx="4.5" />
    </svg>
  );
}

// =============================================================================
// DATA-DRIVEN INDUSTRY LIST
// =============================================================================

interface Industry {
  name: string;
  icon: React.ComponentType<LucideProps>;
}

const industries: Industry[] = [
  {
    name: "Manufacturing",
    icon: ManufacturingIcon,
  },
  {
    name: "Automotive",
    icon: CarFront,
  },
  {
    name: "Healthcare",
    icon: Heart,
  },
  {
    name: "Public Services",
    icon: Landmark,
  },
  {
    name: "Research",
    icon: FlaskConical,
  },
  {
    name: "And more",
    icon: Crosshair,
  },
];

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

export function TrustedByLabel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`shrink-0 flex items-center select-none ${className}`}
      aria-label="Trusted by industries"
    >
      <span className="text-[13px] sm:text-[14px] font-bold tracking-[0.14em] text-[#1e2735] uppercase">
        TRUSTED BY
      </span>
    </div>
  );
}

export function IndustryItem({
  industry,
  className = "",
}: {
  industry: Industry;
  className?: string;
}) {
  const Icon = industry.icon;
  return (
    <div
      className={`group flex items-center gap-3 sm:gap-3.5 select-none transition-colors duration-200 ${className}`}
    >
      <Icon
        size={27}
        strokeWidth={1.4}
        className="shrink-0 text-[#546276] group-hover:text-[#1e2735] transition-colors duration-200"
        aria-hidden="true"
      />
      <span className="text-[14.5px] sm:text-[15px] font-medium text-[#465366] group-hover:text-[#111827] tracking-[-0.01em] whitespace-nowrap transition-colors duration-200">
        {industry.name}
      </span>
    </div>
  );
}

export function IndustryList({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {industries.map((item) => (
        <IndustryItem key={item.name} industry={item} />
      ))}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT: TrustedBySection
// =============================================================================

export default function TrustedBySection() {
  return (
    <section
      id="trusted-by"
      aria-label="Trusted by"
      className="relative w-full bg-[#eeeff1] border-t border-b border-[#0d121a]/[0.08] overflow-hidden"
    >
      {/* --------------------------------------------------------------------- */}
      {/* DESKTOP LAYOUT (>= 1280px): Single horizontal row, evenly distributed */}
      {/* Height: ~135–155px, Side padding: 65–70px                             */}
      {/* --------------------------------------------------------------------- */}
      <div className="hidden xl:flex items-center h-[142px] px-[68px] w-full">
        {/* CSS Grid ensures mathematically balanced distribution across row */}
        <div className="w-full grid grid-cols-[140px_repeat(6,1fr)] items-center gap-4 2xl:gap-8">
          <TrustedByLabel />
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              className={`flex items-center ${
                index === 5
                  ? "justify-end"
                  : index === 0
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              <IndustryItem industry={industry} />
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* TABLET LAYOUT (768px – 1279px): Responsive balanced grid             */}
      {/* --------------------------------------------------------------------- */}
      <div className="hidden md:flex xl:hidden flex-col gap-6 py-10 px-8 sm:px-12">
        <TrustedByLabel />
        <div className="grid grid-cols-3 gap-x-8 gap-y-5">
          {industries.map((industry) => (
            <IndustryItem key={industry.name} industry={industry} />
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* MOBILE LAYOUT (< 768px): Header + clean 2-column industry matrix      */}
      {/* --------------------------------------------------------------------- */}
      <div className="flex md:hidden flex-col gap-5 py-8 px-5 sm:px-7">
        <TrustedByLabel />
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {industries.map((industry) => (
            <IndustryItem key={industry.name} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
