"use client";

import TopLeftNav from "./TopLeftNav";
import TopRightControls from "./TopRightControls";
import HeroCopy from "./HeroCopy";
import HeroMedia from "./HeroMedia";
import FeatureCardGroup from "./FeatureCardGroup";
import IntroStatement from "./IntroStatement";
import StoryNavigation from "./StoryNavigation";

export default function HeroCanvas() {
  return (
    <main className="relative w-full min-h-[100dvh] xl:h-[100dvh] overflow-x-hidden xl:overflow-hidden bg-[#eeeff1] text-[#0d121a] select-none">
      {/* ========================================================================= */}
      {/* DESKTOP ART-DIRECTED FULL-VIEWPORT CANVAS (min-width: 1280px)            */}
      {/* Calibrated to 1586x992 Reference Art Direction                            */}
      {/* ========================================================================= */}
      <div className="hidden xl:block relative w-full h-full min-h-[100dvh]">
        {/* 1. Top Left Nav (left ≈ 1.0vw, top ≈ 1.1vh, w ≈ 24.2vw / 384px) */}
        <div className="absolute left-[1.0vw] top-[1.1vh] z-30">
          <TopLeftNav />
        </div>

        {/* 2. Top Right Controls (right ≈ 1.0vw, top ≈ 1.1vh, w ≈ 23.7vw / 375px) */}
        <div className="absolute right-[1.0vw] top-[1.1vh] z-30">
          <TopRightControls />
        </div>

        {/* 3. Central Hero Column (left ≈ 26.1vw, top ≈ 0.8vh, w ≈ 44.8vw, h ≈ 88.9vh) */}
        <div className="absolute left-[26.1vw] top-[0.8vh] w-[44.8vw] h-[88.9vh] z-10">
          <HeroMedia className="w-full h-full" />
        </div>

        {/* 4. Left Content Column (left ≈ 2.4vw, top ≈ 22.8vh, w ≈ 370px) */}
        <div className="absolute left-[2.4vw] top-[22.8vh] w-[clamp(345px,22.5vw,375px)] z-20">
          <HeroCopy />
        </div>

        {/* 5. Bottom Left Info Block (left ≈ 2.4vw, top ≈ 79.1vh, w ≈ 350px) */}
        <div className="absolute left-[2.4vw] top-[79.1vh] w-[clamp(330px,21.5vw,360px)] z-20">
          <IntroStatement />
        </div>

        {/* 6. Floating Feature Cards (left ≈ 64.7vw, top ≈ 28.5vh) */}
        <div className="absolute left-[64.7vw] top-[28.5vh] z-30">
          <FeatureCardGroup />
        </div>

        {/* 7. Bottom Right Story Navigation (right ≈ 4.5vw, top ≈ 85vh) */}
        <div className="absolute right-[4.5vw] top-[85vh] z-20">
          <StoryNavigation />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RESPONSIVE LAYOUT (Mobile & Tablet: < 1280px)                           */}
      {/* Recomposed cleanly in vertical sequence                                  */}
      {/* ========================================================================= */}
      <div className="flex xl:hidden flex-col gap-8 w-full max-w-2xl mx-auto py-4 px-3 sm:px-6">
        {/* Mobile Header Navs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          <TopLeftNav className="w-full sm:w-auto flex justify-center" />
          <TopRightControls className="w-full sm:w-auto flex justify-center" />
        </div>

        {/* Left Copy */}
        <div className="w-full">
          <HeroCopy />
        </div>

        {/* Hero Media Frame */}
        <div className="w-full aspect-[4/5] sm:aspect-[3/4] relative">
          <HeroMedia className="w-full h-full" />
        </div>

        {/* Feature Cards */}
        <div className="w-full flex justify-center">
          <FeatureCardGroup />
        </div>

        {/* Bottom Info & Story Nav */}
        <div className="w-full flex flex-col gap-6 pt-4 pb-8 border-t border-black/5">
          <IntroStatement />
          <StoryNavigation />
        </div>
      </div>
    </main>
  );
}
