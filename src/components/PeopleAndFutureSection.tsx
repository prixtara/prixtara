"use client";

import React from "react";
import PeopleBehindPrixtara from "./PeopleBehindPrixtara";
import FutureDirection from "./FutureDirection";

export default function PeopleAndFutureSection() {
  return (
    <section
      id="about"
      aria-label="The People Behind Prixtara and What's Next"
      className="relative w-full bg-[#eeeff1] py-20 sm:py-24 lg:py-24 xl:py-[96px] 2xl:py-[104px] px-6 sm:px-10 lg:px-12 xl:px-[76px] 2xl:px-[88px] overflow-hidden select-none border-t border-[#0a0e17]/[0.06] scroll-mt-6"
    >
      <span id="people-and-future" className="sr-only" />
      {/* Full-width editorial dual-story composition */}
      <div className="relative z-10 w-full min-h-[640px] lg:min-h-[720px] xl:min-h-[760px] flex flex-col lg:flex-row items-stretch justify-between gap-14 lg:gap-10 xl:gap-14 2xl:gap-16">
        {/* =========================================================================
            LEFT REGION: THE PEOPLE BEHIND PRIXTARA (~53–54%)
            - Eyebrow: THE PEOPLE BEHIND PRIXTARA
            - 3-Line Display Headline: BUILDING THE INTELLIGENCE OF TOMORROW.
            - Founder & Leadership portraits directly on page
        ========================================================================= */}
        <div className="w-full lg:w-[54%] xl:w-[53%] flex items-stretch shrink-0">
          <PeopleBehindPrixtara />
        </div>

        {/* =========================================================================
            RIGHT REGION: WHAT'S NEXT (~46–47%)
            - Atmospheric mountain landscape
            - Eyebrow: WHAT'S NEXT
            - 3-Line Display Headline: FROM SEEING THE WORLD TO ACTING IN IT.
            - 5-stage strategic roadmap
        ========================================================================= */}
        <div className="w-full lg:w-[46%] xl:w-[47%] flex items-stretch flex-1">
          <FutureDirection />
        </div>
      </div>
    </section>
  );
}
