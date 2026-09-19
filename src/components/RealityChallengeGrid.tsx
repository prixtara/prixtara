"use client";

import React from "react";
import RealityChallengeCard from "./RealityChallengeCard";

export interface Challenge {
  title: string;
  description: string;
  image: string;
}

export const challenges: Challenge[] = [
  {
    title: "INDUSTRY",
    description: "Quality decisions at\nproduction speed.",
    image: "/images/industry-card.jpg",
  },
  {
    title: "PRIVACY",
    description: "Sensitive intelligence should\nnot always leave the device.",
    image: "/images/privacy-card.jpg",
  },
  {
    title: "ACCESS",
    description: "Technology should work\nfor people, not exclude them.",
    image: "/images/access-card.jpg",
  },
];

export default function RealityChallengeGrid() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-4.5 xl:gap-5">
      {challenges.map((challenge, index) => (
        <RealityChallengeCard
          key={challenge.title}
          title={challenge.title}
          description={challenge.description}
          image={challenge.image}
          index={index}
        />
      ))}
    </div>
  );
}
