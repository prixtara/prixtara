"use client";

import React from "react";
import IntelligenceFlowStep, { FlowStepData } from "./IntelligenceFlowStep";

/* Custom technical engineered line icons matching the reference screenshot */

function SensorIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Camera body */}
      <path d="M7 11.5h3.2l2-3h11.6l2 3H29a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-13a3 3 0 0 1 3-3z" />
      {/* Outer lens ring */}
      <circle cx="18" cy="19.5" r="5.5" />
      {/* Inner lens aperture */}
      <circle cx="18" cy="19.5" r="2.5" />
      {/* Optical sensor dot / flash */}
      <circle cx="26" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function EdgeComputeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Central chip body */}
      <rect x="9.5" y="9.5" width="17" height="17" rx="2" />
      {/* Core die */}
      <rect x="14" y="14" width="8" height="8" rx="1" strokeWidth="1.3" />
      {/* Top pins */}
      <line x1="13" y1="5.5" x2="13" y2="9.5" />
      <line x1="18" y1="5.5" x2="18" y2="9.5" />
      <line x1="23" y1="5.5" x2="23" y2="9.5" />
      {/* Bottom pins */}
      <line x1="13" y1="26.5" x2="13" y2="30.5" />
      <line x1="18" y1="26.5" x2="18" y2="30.5" />
      <line x1="23" y1="26.5" x2="23" y2="30.5" />
      {/* Left pins */}
      <line x1="5.5" y1="13" x2="9.5" y2="13" />
      <line x1="5.5" y1="18" x2="9.5" y2="18" />
      <line x1="5.5" y1="23" x2="9.5" y2="23" />
      {/* Right pins */}
      <line x1="26.5" y1="13" x2="30.5" y2="13" />
      <line x1="26.5" y1="18" x2="30.5" y2="18" />
      <line x1="26.5" y1="23" x2="30.5" y2="23" />
    </svg>
  );
}

function AiModelsIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Outer isometric cube hexagon */}
      <path d="M18 5.5L29 12V24L18 30.5L7 24V12L18 5.5Z" />
      {/* Internal coordinate axes */}
      <line x1="18" y1="18" x2="18" y2="30.5" />
      <line x1="18" y1="18" x2="7" y2="12" />
      <line x1="18" y1="18" x2="29" y2="12" />
      {/* Core neural / spherical node */}
      <circle cx="18" cy="18" r="4.2" strokeWidth="1.25" />
    </svg>
  );
}

function DecisionIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Outer circular badge */}
      <circle cx="18" cy="18" r="12.5" />
      {/* Crisp checkmark */}
      <path d="M12.5 18L16.2 21.8L23.8 14.2" strokeWidth="1.8" />
    </svg>
  );
}

function ActionIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Robotic arm mounting base */}
      <path d="M7 29.5h13" />
      <path d="M8.5 29.5v-2.2c0-1.2 1-2.2 2.2-2.2h5.6c1.2 0 2.2 1 2.2 2.2v2.2" />
      {/* Shoulder pivot joint */}
      <circle cx="13.5" cy="22" r="2.2" />
      {/* Lower boom arm */}
      <path d="M14.5 20L19.5 11" />
      {/* Elbow articulation joint */}
      <circle cx="20.5" cy="9.8" r="2.2" />
      {/* Forearm segment reaching downward-right */}
      <path d="M22.5 11.2L27 15" />
      {/* Wrist pivot */}
      <circle cx="27.5" cy="16.2" r="1.4" />
      {/* Precision gripper end-effector */}
      <path d="M28 18l1.5 2.5m-3.5-1.5l2 2.5m-0.8-3.8l3 1.2" strokeWidth="1.3" />
    </svg>
  );
}

export const flowSteps: FlowStepData[] = [
  {
    id: "sensors",
    label: "SENSORS",
    icon: SensorIcon,
  },
  {
    id: "edge-compute",
    label: "EDGE COMPUTE",
    icon: EdgeComputeIcon,
  },
  {
    id: "ai-models",
    label: "AI MODELS",
    icon: AiModelsIcon,
  },
  {
    id: "decision",
    label: "DECISION",
    icon: DecisionIcon,
  },
  {
    id: "action",
    label: "ACTION",
    icon: ActionIcon,
  },
];

export default function IntelligenceFlow() {
  return (
    <div
      className="flex items-center justify-center"
      aria-label="Intelligence Flow: Sensors to Edge Compute, AI Models, Decision, Action"
    >
      {/* Desktop & Tablet: continuous horizontal flow */}
      <div className="hidden sm:flex items-center justify-center">
        {flowSteps.map((step, index) => (
          <IntelligenceFlowStep
            key={step.id}
            step={step}
            index={index}
            total={flowSteps.length}
            isLast={index === flowSteps.length - 1}
          />
        ))}
      </div>

      {/* Mobile: two wrapped rows */}
      <div className="flex sm:hidden flex-col items-center gap-4 w-full">
        {/* Row 1: Sensors -> Edge Compute -> AI Models */}
        <div className="flex items-center justify-center w-full">
          {flowSteps.slice(0, 3).map((step, index) => (
            <IntelligenceFlowStep
              key={step.id}
              step={step}
              index={index}
              total={3}
              isLast={index === 2}
            />
          ))}
        </div>

        {/* Vertical connector on mobile */}
        <div className="text-slate-400/60 -my-1" aria-hidden="true">
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="2" x2="8" y2="16" />
            <polyline points="3 11 8 16 13 11" />
          </svg>
        </div>

        {/* Row 2: Decision -> Action */}
        <div className="flex items-center justify-center w-full">
          {flowSteps.slice(3).map((step, index) => (
            <IntelligenceFlowStep
              key={step.id}
              step={step}
              index={index + 3}
              total={2}
              isLast={index === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
