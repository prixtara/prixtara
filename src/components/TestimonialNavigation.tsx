"use client";

import React from "react";

interface TestimonialNavigationProps {
  currentIndex?: number;
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

export default function TestimonialNavigation({
  currentIndex = 0,
  total = 5,
  onPrev,
  onNext,
  className = "",
}: TestimonialNavigationProps) {
  return (
    <div
      className={`flex items-center gap-3 sm:gap-3.5 select-none ${className}`}
      role="group"
      aria-label="Testimonial navigation"
    >
      {/* Previous Slide Button */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous testimonial"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#cbd5e1] hover:border-[#0a0e17] flex items-center justify-center text-[#546276] hover:text-[#0a0e17] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0e17]"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-1" aria-hidden="true">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <span
              key={index}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2 h-2 bg-[#0a0e17]"
                  : "w-1.5 h-1.5 bg-[#cbd5e1] hover:bg-[#94a3b8]"
              }`}
            />
          );
        })}
      </div>

      {/* Next Slide Button */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next testimonial"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#cbd5e1] hover:border-[#0a0e17] flex items-center justify-center text-[#546276] hover:text-[#0a0e17] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0e17]"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
