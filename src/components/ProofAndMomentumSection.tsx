"use client";

import React from "react";
import Image from "next/image";
import TestimonialBlock from "./TestimonialBlock";
import BuiltToMove from "./BuiltToMove";

export default function ProofAndMomentumSection() {
  return (
    <section
      id="proof-and-momentum"
      aria-label="Proof and Momentum — What People Say and Built to Move"
      className="relative w-full bg-[#eeeff1] py-16 sm:py-20 lg:py-20 xl:py-[96px] 2xl:py-[104px] px-6 sm:px-10 lg:px-12 xl:px-[76px] 2xl:px-[88px] overflow-hidden select-none border-t border-[#0a0e17]/[0.06]"
    >
      {/* =========================================================================
          ATMOSPHERIC BACKGROUND LAYER: Mountain & Alpine Clouds Silhouette
          - Anchored strictly to the upper right quadrant
          - Radial elliptical mask ensures soft, organic edge dissolution without any hard box edges
      ========================================================================= */}
      <div
        className="absolute top-0 right-0 w-[58%] lg:w-[52%] xl:w-[50%] h-[380px] sm:h-[440px] lg:h-[480px] pointer-events-none select-none overflow-hidden z-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 85% at 82% 18%, black 25%, rgba(0,0,0,0.5) 60%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 85% at 82% 18%, black 25%, rgba(0,0,0,0.5) 60%, transparent 95%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/movement-landscape.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-right-top mix-blend-multiply opacity-80"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {/* Full-width editorial dual-story composition */}
      <div className="relative z-10 w-full min-h-[580px] lg:min-h-[660px] xl:min-h-[680px] flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-8 xl:gap-12 2xl:gap-14">
        {/* =========================================================================
            LEFT REGION: WHAT PEOPLE SAY (~48%)
            - Customer perspective testimonial card
            - Stylized quotation & identification
            - Photographic proof & pagination controls
        ========================================================================= */}
        <div className="w-full lg:w-[48%] xl:w-[48%] flex items-stretch shrink-0">
          <TestimonialBlock />
        </div>

        {/* =========================================================================
            RIGHT REGION: BUILT TO MOVE (~52%)
            - Atmospheric mountain horizon
            - Two-line display headline: FROM IDEA TO REALITY.
            - 3-step operational progression grid
        ========================================================================= */}
        <div className="w-full lg:w-[52%] xl:w-[52%] flex items-stretch flex-1">
          <BuiltToMove />
        </div>
      </div>
    </section>
  );
}
