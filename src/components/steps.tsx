"use client";

import { useState } from "react";
import { StepItem, StepVariant, StepState } from "./step-item";

// ============================================================================
// Demo Data
// ============================================================================

interface StepData {
  id: string;
  variant: StepVariant;
  state: StepState;
  thoughts?: string[];
  searchResults?: Array<{ title: string; url: string }>;
  inventoryUrl?: string;
  resultCount?: number;
  estimatedMinutes?: number;
  agentName?: string;
}

const demoSteps: StepData[] = [
  {
    id: "thinking-done",
    variant: "thinking",
    state: "done",
    thoughts: [
      "I'll need to search for information about safe used cars and compile recommendations based on crash test ratings, reliability data, and consumer reports.",
      "Let me also check current inventory to find vehicles that match these safety criteria in the customer's preferred color and make.",
    ],
  },
  {
    id: "knowledge-done",
    variant: "knowledge-search",
    state: "done",
    resultCount: 10,
    searchResults: [
      { title: "Top 10 Safest Used Cars for 2025", url: "https://www.consumerreports.org/cars/safety" },
      { title: "IIHS Top Safety Pick Awards", url: "https://www.iihs.org/ratings/top-safety-picks" },
      { title: "NHTSA 5-Star Safety Ratings Explained", url: "https://www.nhtsa.gov/ratings" },
      { title: "Best Used Cars for Teen Drivers", url: "https://www.edmunds.com/teen-drivers" },
      { title: "Reliability Rankings by Model Year", url: "https://www.jdpower.com/reliability" },
    ],
  },
  {
    id: "inventory-done",
    variant: "inventory-search",
    state: "done",
    resultCount: 225,
    inventoryUrl: "https://www.carmax.com/cars/toyota/camry?color=red",
  },
  {
    id: "escalation-done",
    variant: "escalation",
    state: "done",
    agentName: "Alice",
  },
];

// ============================================================================
// Steps Component
// ============================================================================

export function Steps() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="steps-container divide-y divide-step-hover rounded-2xl border border-step-border overflow-hidden">
      {demoSteps.map((step) => (
        <StepItem
          key={step.id}
          variant={step.variant}
          state={step.state}
          isExpanded={expandedId === step.id}
          onToggle={() => handleToggle(step.id)}
          thoughts={step.thoughts}
          searchResults={step.searchResults}
          inventoryUrl={step.inventoryUrl}
          resultCount={step.resultCount}
          estimatedMinutes={step.estimatedMinutes}
          agentName={step.agentName}
        />
      ))}
    </div>
  );
}
