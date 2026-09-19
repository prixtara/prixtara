"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ctaContent = {
  eyebrow: "LET'S WORK TOGETHER",
  title: ["READY TO BUILD", "FOR THE REAL WORLD?"],
  description:
    "Talk to the Prixtara team about intelligent systems for your environment.",
  primary: {
    label: "Talk to Prixtara",
    href: "#contact",
  },
  secondary: {
    label: "Explore Products",
    href: "#solutions",
  },
};

interface CTAEyebrowProps {
  text: string;
}

export function CTAEyebrow({ text }: CTAEyebrowProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-bold uppercase tracking-[0.2em] text-[#546276] font-sans mb-3.5 sm:mb-4 lg:mb-4.5 select-none"
    >
      {text}
    </motion.p>
  );
}

interface CTAHeadingProps {
  lines: string[];
}

export function CTAHeading({ lines }: CTAHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[68px] 2xl:text-[72px] font-extrabold uppercase tracking-[-0.035em] leading-[1.02] text-[#0a0e17] font-sans max-w-[760px] mx-auto mb-6 sm:mb-7 lg:mb-8 select-none"
    >
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="block sm:whitespace-nowrap"
        >
          {line}
        </span>
      ))}
    </motion.h2>
  );
}

interface CTADescriptionProps {
  text: string;
}

export function CTADescription({ text }: CTADescriptionProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: 0.16,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="text-[15px] sm:text-[16.5px] lg:text-[18px] text-[#475569] font-normal leading-[1.6] max-w-[660px] mx-auto mb-8 sm:mb-9 lg:mb-10 select-none px-4"
    >
      {text}
    </motion.p>
  );
}

interface CTAButtonProps {
  label: string;
  href: string;
}

export function TalkToPrixtaraButton({ label, href }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-between w-full sm:w-[260px] lg:w-[270px] h-[58px] sm:h-[60px] lg:h-[62px] px-6 sm:px-7 bg-[#0a0e17] hover:bg-black text-white text-[15px] sm:text-[16px] font-semibold rounded-full shadow-[0_4px_16px_rgba(10,14,23,0.16)] hover:shadow-[0_6px_22px_rgba(10,14,23,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.99] select-none"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function ExploreProductsButton({ label, href }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-between w-full sm:w-[240px] lg:w-[250px] h-[58px] sm:h-[60px] lg:h-[62px] px-6 sm:px-7 bg-[#f7f9fa] hover:bg-white border border-[#0a0e17]/20 hover:border-[#0a0e17]/40 text-[#0a0e17] text-[15px] sm:text-[16px] font-semibold rounded-full shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.99] select-none"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 text-[#0a0e17]/70 group-hover:text-[#0a0e17]" />
    </Link>
  );
}

interface CTAButtonsProps {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export function CTAButtons({ primary, secondary }: CTAButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: 0.24,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-[540px] sm:max-w-none px-4"
    >
      <TalkToPrixtaraButton label={primary.label} href={primary.href} />
      <ExploreProductsButton label={secondary.label} href={secondary.href} />
    </motion.div>
  );
}

export default function FinalCTASection() {
  return (
    <section
      id="contact"
      aria-label="Let's Work Together — Call to Action"
      className="relative w-full bg-[#eeeff1] min-h-[580px] lg:min-h-[640px] xl:min-h-[660px] py-24 sm:py-28 lg:py-32 xl:py-[120px] 2xl:py-[128px] px-6 sm:px-10 lg:px-12 xl:px-16 flex flex-col items-center justify-center text-center overflow-hidden border-b border-[#0a0e17]/[0.06] scroll-mt-6"
    >
      <span id="final-cta" className="sr-only" />
      <div className="relative z-10 w-full max-w-[960px] mx-auto flex flex-col items-center justify-center text-center">
        {/* Eyebrow */}
        <CTAEyebrow text={ctaContent.eyebrow} />

        {/* 2-Line Desktop Display Headline */}
        <CTAHeading lines={ctaContent.title} />

        {/* Supporting Description */}
        <CTADescription text={ctaContent.description} />

        {/* Side-by-side CTA Group */}
        <CTAButtons
          primary={ctaContent.primary}
          secondary={ctaContent.secondary}
        />
      </div>
    </section>
  );
}
