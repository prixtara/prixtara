"use client";

import Image from "next/image";

interface PrixtaraLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function PrixtaraLogo({
  className = "w-[348px] xl:w-[384px] h-auto",
}: PrixtaraLogoProps) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/images/prixtara-logo-crisp.png"
        alt="Prixtara"
        width={450}
        height={88}
        priority
        className="w-full h-auto object-contain pointer-events-none"
      />
    </div>
  );
}
