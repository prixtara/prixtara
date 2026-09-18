"use client";

import { motion } from "framer-motion";
import HeroCard from "./HeroCard";

interface FeatureCardGroupProps {
  className?: string;
}

export default function FeatureCardGroup({ className = "" }: FeatureCardGroupProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-[16px] z-30 select-none ${className}`}>
      {/* Card 1: AI VISION (Target width: 240px, height: 249px) */}
      <motion.div initial={{ opacity: 1, y: 0 }}>
        <HeroCard
          title="AI VISION"
          subtitle="Automated quality inspection"
          imageSrc="/images/card-ai-vision.jpg"
          imageAlt="Automated robotic laser quality inspection"
          width="w-[240px]"
        />
      </motion.div>

      {/* Card 2: ON-DEVICE AI (Target width: 235px, height: 249px) */}
      <motion.div initial={{ opacity: 1, y: 0 }}>
        <HeroCard
          title="ON-DEVICE AI"
          subtitle="Private. Local. Safe."
          imageSrc="/images/card-on-device-ai.jpg"
          imageAlt="Private edge AI hardware compute device"
          width="w-[235px]"
        />
      </motion.div>
    </div>
  );
}
