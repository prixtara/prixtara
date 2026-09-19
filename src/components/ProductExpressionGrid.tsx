"use client";

import React from "react";
import ProductFeaturePanel from "./ProductFeaturePanel";
import ProductMiniPanel from "./ProductMiniPanel";

export const products = {
  aiVision: {
    id: "ai-vision",
    title: "AI VISION",
    description: "Automated visual inspection\nfor production environments.",
    tags: [
      "COMPUTER VISION",
      "QUALITY INSPECTION",
      "AUTOMATION",
    ],
    cta: "Explore AI Vision",
    ctaHref: "#ai-vision",
    image: "/images/product-ai-vision.jpg",
  },
  onDeviceAI: {
    id: "on-device-ai",
    title: "ON-DEVICE AI",
    description: "Private intelligence,\nrunning locally.",
    tags: [
      "LOCAL",
      "PRIVATE",
      "OFFLINE",
    ],
    cta: "Explore On-Device AI",
    ctaHref: "#on-device-ai",
    image: "/images/product-on-device-ai.jpg",
  },
  sambhashi: {
    id: "sambhashi",
    title: "SAMBHASHI",
    description: "Inclusive communication through\noffline multilingual AI.",
    tags: [
      "REAL",
      "MULTILINGUAL",
      "EDGE AI",
    ],
    cta: "Explore Sambhashi",
    ctaHref: "#sambhashi",
    image: "/images/product-sambhashi.jpg",
  },
};

export default function ProductExpressionGrid() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.54fr_1fr] gap-4 xl:gap-[16px] items-stretch">
      {/* LEFT DOMINANT HERO PANEL: AI VISION (~60-61% width on desktop) */}
      <div className="w-full h-full">
        <ProductFeaturePanel
          id={products.aiVision.id}
          title={products.aiVision.title}
          description={products.aiVision.description}
          tags={products.aiVision.tags}
          cta={products.aiVision.cta}
          ctaHref={products.aiVision.ctaHref}
          image={products.aiVision.image}
        />
      </div>

      {/* RIGHT STACKED PANELS: ON-DEVICE AI + SAMBHASHI (~39-40% width on desktop) */}
      <div className="w-full flex flex-col justify-between gap-4 xl:gap-[16px]">
        {/* TOP RIGHT: ON-DEVICE AI (Light Theme) */}
        <ProductMiniPanel
          id={products.onDeviceAI.id}
          title={products.onDeviceAI.title}
          description={products.onDeviceAI.description}
          tags={products.onDeviceAI.tags}
          cta={products.onDeviceAI.cta}
          ctaHref={products.onDeviceAI.ctaHref}
          image={products.onDeviceAI.image}
          theme="light"
          index={1}
        />

        {/* BOTTOM RIGHT: SAMBHASHI (Dark Photographic Theme) */}
        <ProductMiniPanel
          id={products.sambhashi.id}
          title={products.sambhashi.title}
          description={products.sambhashi.description}
          tags={products.sambhashi.tags}
          cta={products.sambhashi.cta}
          ctaHref={products.sambhashi.ctaHref}
          image={products.sambhashi.image}
          theme="dark-image"
          index={2}
        />
      </div>
    </div>
  );
}
