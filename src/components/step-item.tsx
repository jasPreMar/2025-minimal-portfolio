"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ============================================================================
// Types
// ============================================================================

export type StepVariant =
  | "thinking"
  | "knowledge-search"
  | "inventory-search"
  | "escalation";

export type StepState = "processing" | "done";

export interface StepItemProps {
  variant: StepVariant;
  state: StepState;
  isExpanded?: boolean;
  onToggle?: () => void;
  // Variant-specific content
  thoughts?: string[]; // thinking
  searchResults?: Array<{ title: string; url: string }>; // knowledge-search
  inventoryUrl?: string; // inventory-search
  resultCount?: number; // knowledge-search, inventory-search
  estimatedMinutes?: number; // escalation
  agentName?: string; // escalation (done state)
}

// ============================================================================
// Icon Components (inline SVGs with currentColor)
// ============================================================================

function LightBulbIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.67 9.22994C19.32 5.63994 16.47 2.73994 12.89 2.33994C10.69 2.08994 8.48998 2.78994 6.85998 4.24994C5.22998 5.70994 4.28998 7.80994 4.28998 9.99994C4.28998 12.3499 5.33998 14.5299 7.15998 15.9999C7.19998 16.0299 7.28998 16.1199 7.28998 16.2399V17.0099C7.28998 17.8499 7.67998 18.5999 8.28998 19.0899V20.0099C8.28998 20.9499 9.05998 21.7199 9.99998 21.7199H14C14.94 21.7199 15.71 20.9499 15.71 20.0099V19.0899C16.32 18.5899 16.71 17.8499 16.71 17.0099V16.2499C16.71 16.1299 16.8 16.0399 16.84 16.0099C18.87 14.3799 19.92 11.8499 19.67 9.23994V9.22994ZM15.95 14.8899C15.53 15.2299 15.29 15.7199 15.29 16.2399V16.9999C15.29 17.7099 14.71 18.2899 14 18.2899H12.71V15.2899L14.5 13.4999C14.78 13.2199 14.78 12.7699 14.5 12.4999C14.22 12.2299 13.77 12.2199 13.5 12.4999L12 13.9999L10.5 12.4999C10.22 12.2199 9.76998 12.2199 9.49998 12.4999C9.22998 12.7799 9.21998 13.2299 9.49998 13.4999L11.29 15.2899V18.2899H9.99998C9.28998 18.2899 8.70998 17.7099 8.70998 16.9999V16.2299C8.70998 15.7099 8.46998 15.2199 8.04998 14.8899C6.55998 13.6999 5.70998 11.9099 5.70998 9.99994C5.70998 8.20994 6.46998 6.49994 7.80998 5.30994C8.97998 4.26994 10.44 3.70994 12 3.70994C12.24 3.70994 12.49 3.71994 12.74 3.74994C15.61 4.06994 17.99 6.47994 18.27 9.35994C18.48 11.4899 17.61 13.5599 15.96 14.8899H15.95Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PaperMagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.99998 20.29H7.99998C6.18998 20.29 4.70998 18.81 4.70998 17V6.99998C4.70998 5.18998 6.18998 3.70998 7.99998 3.70998H12.29V6.01998C12.29 7.50998 13.51 8.72998 15 8.72998H17.29V12C17.29 12.39 17.61 12.71 18 12.71C18.39 12.71 18.71 12.39 18.71 12V7.84998C18.71 7.13998 18.42 6.43998 17.92 5.93998L15.09 3.08998C14.59 2.57998 13.89 2.28998 13.17 2.28998H7.99998C5.39998 2.28998 3.28998 4.39998 3.28998 6.99998V17C3.28998 19.6 5.39998 21.71 7.99998 21.71H9.99998C10.39 21.71 10.71 21.39 10.71 21C10.71 20.61 10.39 20.29 9.99998 20.29ZM16.91 6.93998C17.02 7.04998 17.1 7.17998 17.16 7.30998H15C14.29 7.30998 13.71 6.72998 13.71 6.01998V3.83998C13.85 3.89998 13.97 3.97998 14.08 4.08998L16.91 6.93998Z"
        fill="currentColor"
      />
      <path
        d="M20.5 21.5L18.93 19.93C19.42 19.24 19.71 18.41 19.71 17.5C19.71 15.18 17.82 13.29 15.5 13.29C13.18 13.29 11.29 15.18 11.29 17.5C11.29 19.82 13.18 21.71 15.5 21.71C16.4 21.71 17.24 21.42 17.93 20.93L19.5 22.5C19.64 22.64 19.82 22.71 20 22.71C20.18 22.71 20.36 22.64 20.5 22.5C20.78 22.22 20.78 21.77 20.5 21.5ZM12.71 17.5C12.71 15.96 13.96 14.71 15.5 14.71C17.04 14.71 18.29 15.96 18.29 17.5C18.29 19.04 17.04 20.29 15.5 20.29C13.96 20.29 12.71 19.04 12.71 17.5Z"
        fill="currentColor"
      />
      <path
        d="M13.71 11C13.71 10.61 13.39 10.29 13 10.29H7.99998C7.60998 10.29 7.28998 10.61 7.28998 11C7.28998 11.39 7.60998 11.71 7.99998 11.71H13C13.39 11.71 13.71 11.39 13.71 11Z"
        fill="currentColor"
      />
      <path
        d="M7.99998 14.29C7.60998 14.29 7.28998 14.61 7.28998 15C7.28998 15.39 7.60998 15.71 7.99998 15.71H8.99998C9.38998 15.71 9.70998 15.39 9.70998 15C9.70998 14.61 9.38998 14.29 8.99998 14.29H7.99998Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CarMagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 11.29H16.38L16.34 11.08C15.9 8.88998 13.96 7.28998 11.72 7.28998H8.27998C6.03998 7.28998 4.09998 8.87998 3.65998 11.08L3.61998 11.29H1.99998C1.60998 11.29 1.28998 11.61 1.28998 12C1.28998 12.39 1.60998 12.71 1.99998 12.71H3.32998L3.28998 12.91C2.67998 13.41 2.28998 14.15 2.28998 15V20C2.28998 20.94 3.05998 21.71 3.99998 21.71C4.93998 21.71 5.70998 20.94 5.70998 20V19.71H14.29V20C14.29 20.94 15.06 21.71 16 21.71C16.94 21.71 17.71 20.94 17.71 20V15C17.71 14.16 17.31 13.41 16.71 12.91L16.67 12.71H18C18.39 12.71 18.71 12.39 18.71 12C18.71 11.61 18.39 11.29 18 11.29ZM4.99998 18.29C4.28998 18.29 3.70998 17.71 3.70998 17V15C3.70998 14.29 4.28998 13.71 4.99998 13.71H15C15.71 13.71 16.29 14.29 16.29 15V17C16.29 17.71 15.71 18.29 15 18.29H4.99998ZM8.27998 8.70998H11.72C13.28 8.70998 14.64 9.81998 14.95 11.35L15.14 12.3C15.14 12.3 15.05 12.29 15 12.29H4.99998C4.99998 12.29 4.90998 12.3 4.85998 12.3L5.04998 11.35C5.35998 9.81998 6.70998 8.70998 8.27998 8.70998Z"
        fill="currentColor"
      />
      <path
        d="M14 17C14.5523 17 15 16.5523 15 16C15 15.4477 14.5523 15 14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17Z"
        fill="currentColor"
      />
      <path
        d="M5.99998 17C6.55226 17 6.99998 16.5523 6.99998 16C6.99998 15.4477 6.55226 15 5.99998 15C5.44769 15 4.99998 15.4477 4.99998 16C4.99998 16.5523 5.44769 17 5.99998 17Z"
        fill="currentColor"
      />
      <path
        d="M21.5 7.49998L20.42 6.41998C20.75 5.89998 20.95 5.28998 20.95 4.61998C20.95 2.77998 19.45 1.28998 17.62 1.28998C15.79 1.28998 14.29 2.78998 14.29 4.61998C14.29 6.44998 15.79 7.94998 17.62 7.94998C18.28 7.94998 18.9 7.74998 19.42 7.41998L20.5 8.49998C20.64 8.63998 20.82 8.70998 21 8.70998C21.18 8.70998 21.36 8.63998 21.5 8.49998C21.78 8.21998 21.78 7.76998 21.5 7.49998ZM17.62 6.53998C16.56 6.53998 15.7 5.67998 15.7 4.61998C15.7 3.55998 16.56 2.69998 17.62 2.69998C18.68 2.69998 19.54 3.55998 19.54 4.61998C19.54 5.67998 18.68 6.53998 17.62 6.53998Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BadgePersonIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 3.29H14.71V3C14.71 2.06 13.94 1.29 13 1.29H11C10.06 1.29 9.28998 2.06 9.28998 3V3.29H8.99998C6.39998 3.29 4.28998 5.4 4.28998 8V17C4.28998 19.6 6.39998 21.71 8.99998 21.71H15C17.6 21.71 19.71 19.6 19.71 17V8C19.71 5.4 17.6 3.29 15 3.29ZM10.71 3C10.71 2.84 10.84 2.71 11 2.71H13C13.16 2.71 13.29 2.84 13.29 3V4C13.29 4.71 12.71 5.29 12 5.29C11.29 5.29 10.71 4.71 10.71 4V3ZM18.29 17C18.29 18.81 16.81 20.29 15 20.29H8.99998C7.18998 20.29 5.70998 18.81 5.70998 17V8C5.70998 6.19 7.18998 4.71 8.99998 4.71H9.39998C9.70998 5.86 10.76 6.71 12 6.71C13.24 6.71 14.29 5.86 14.6 4.71H15C16.81 4.71 18.29 6.19 18.29 8V17Z"
        fill="currentColor"
      />
      <path
        d="M12 12.71C13.2205 12.71 14.21 11.7206 14.21 10.5C14.21 9.27945 13.2205 8.29 12 8.29C10.7794 8.29 9.78998 9.27945 9.78998 10.5C9.78998 11.7206 10.7794 12.71 12 12.71Z"
        fill="currentColor"
      />
      <path
        d="M12.5 13.29H11.5C10.01 13.29 8.78998 14.51 8.78998 16V17C8.78998 17.39 9.10998 17.71 9.49998 17.71H14.5C14.89 17.71 15.21 17.39 15.21 17V16C15.21 14.51 13.99 13.29 12.5 13.29Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.93005 9.81999C4.93005 9.63999 5.00005 9.45999 5.14005 9.31999C5.42005 9.03999 5.87005 9.03999 6.14005 9.31999L12.0001 15.18L17.8601 9.31999C18.1401 9.03999 18.5901 9.03999 18.8601 9.31999C19.1301 9.59999 19.1401 10.05 18.8601 10.32L12.5001 16.68C12.2201 16.96 11.7701 16.96 11.5001 16.68L5.14005 10.32C5.00005 10.18 4.93005 9.99999 4.93005 9.81999Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.0002 14.0699C19.0002 14.2499 18.9302 14.4299 18.7902 14.5699C18.5102 14.8499 18.0602 14.8499 17.7902 14.5699L11.9302 8.70994L6.07024 14.5699C5.79024 14.8499 5.34024 14.8499 5.07024 14.5699C4.80024 14.2899 4.79024 13.8399 5.07024 13.5699L11.4302 7.20994C11.7102 6.92994 12.1602 6.92994 12.4302 7.20994L18.7902 13.5699C18.9302 13.7099 19.0002 13.8899 19.0002 14.0699Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 13.29C14.61 13.29 14.29 13.61 14.29 14V14.75C14.29 15.6 13.6 16.29 12.75 16.29H8.25004C7.40004 16.29 6.71004 15.6 6.71004 14.75V10.25C6.71004 9.39998 7.40004 8.70998 8.25004 8.70998H9.00004C9.39004 8.70998 9.71004 8.38998 9.71004 7.99998C9.71004 7.60998 9.39004 7.28998 9.00004 7.28998H8.25004C6.62004 7.28998 5.29004 8.61998 5.29004 10.25V14.75C5.29004 16.38 6.62004 17.71 8.25004 17.71H12.75C14.38 17.71 15.71 16.38 15.71 14.75V14C15.71 13.61 15.39 13.29 15 13.29Z"
        fill="currentColor"
      />
      <path
        d="M18.66 4.72999C18.59 4.55999 18.45 4.41999 18.28 4.34999C18.19 4.30999 18.1 4.29999 18.01 4.29999H12.35C11.96 4.29999 11.64 4.61999 11.64 5.00999C11.64 5.39999 11.96 5.71999 12.35 5.71999H16.29L10.5 11.51C10.22 11.79 10.22 12.24 10.5 12.51C10.64 12.65 10.82 12.72 11 12.72C11.18 12.72 11.36 12.65 11.5 12.51L17.29 6.71999V10.66C17.29 11.05 17.61 11.37 18 11.37C18.39 11.37 18.71 11.05 18.71 10.66V4.99999C18.71 4.90999 18.69 4.81999 18.66 4.72999Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

function getIconForVariant(variant: StepVariant) {
  switch (variant) {
    case "thinking":
      return LightBulbIcon;
    case "knowledge-search":
      return PaperMagnifyingGlassIcon;
    case "inventory-search":
      return CarMagnifyingGlassIcon;
    case "escalation":
      return BadgePersonIcon;
  }
}

function getMainText(variant: StepVariant, state: StepState, props: StepItemProps): string {
  switch (variant) {
    case "thinking":
      return state === "processing"
        ? "Orchestrating comprehensive car research"
        : "Orchestrated comprehensive car research";
    case "knowledge-search":
      return state === "processing"
        ? "Searching for safest used cars in 2025"
        : "Safest used cars in 2025";
    case "inventory-search":
      return state === "processing"
        ? "Finding Red Toyota Camrys"
        : "Red Toyota Camrys";
    case "escalation":
      return state === "processing"
        ? "Finding a teammate to help"
        : `${props.agentName || "Alice"} has joined the chat`;
  }
}

function getRightText(variant: StepVariant, state: StepState, props: StepItemProps): string | null {
  // Processing state: only escalation shows right text
  if (state === "processing") {
    if (variant === "escalation" && props.estimatedMinutes !== undefined) {
      return `Estimated ${props.estimatedMinutes} minute${props.estimatedMinutes !== 1 ? "s" : ""}`;
    }
    return null;
  }

  // Done state
  switch (variant) {
    case "thinking":
      return null;
    case "knowledge-search":
    case "inventory-search":
      return props.resultCount !== undefined ? `${props.resultCount} results` : null;
    case "escalation":
      return null;
  }
}

function isExpandable(variant: StepVariant): boolean {
  return variant === "thinking" || variant === "knowledge-search";
}

function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// ============================================================================
// StepItem Component
// ============================================================================

export function StepItem({
  variant,
  state,
  isExpanded: controlledExpanded,
  onToggle,
  thoughts = [],
  searchResults = [],
  inventoryUrl,
  resultCount,
  estimatedMinutes,
  agentName,
}: StepItemProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);

  // Use controlled or internal state
  const isExpanded = controlledExpanded ?? internalExpanded;
  const toggleExpanded = onToggle ?? (() => setInternalExpanded((prev) => !prev));

  const IconComponent = getIconForVariant(variant);
  const mainText = getMainText(variant, state, { variant, state, agentName });
  const rightText = getRightText(variant, state, { variant, state, resultCount, estimatedMinutes });
  const canExpand = isExpandable(variant) && state === "done";
  const isLink = variant === "inventory-search" && state === "done";

  // Determine icon color: secondary (grey) when processing, accent (blue) when done
  const iconColorClass = state === "processing" ? "text-step-secondary" : "text-step-accent";

  // Show right section: 
  // - thinking: only chevron when done
  // - knowledge-search: results + chevron when done
  // - inventory-search: results + external link when done
  // - escalation: estimated time when processing, nothing when done
  const showRightSection =
    (variant === "thinking" && state === "done") ||
    (variant === "knowledge-search" && state === "done") ||
    (variant === "inventory-search" && state === "done") ||
    (variant === "escalation" && state === "processing" && estimatedMinutes !== undefined);

  const handleClick = () => {
    if (isLink && inventoryUrl) {
      window.open(inventoryUrl, "_blank", "noopener,noreferrer");
    } else if (canExpand) {
      toggleExpanded();
    }
  };

  const headerContent = (
    <div
      className={`
        step-item-header
        flex items-center gap-3 px-4 py-3
        font-[family-name:var(--font-lato)]
        transition-colors duration-150
        ${canExpand || isLink ? "cursor-pointer hover:bg-step-hover" : ""}
      `}
      onClick={handleClick}
    >
      {/* Left side: icon + text */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <IconComponent className={`flex-shrink-0 ${iconColorClass}`} />
        <span className="text-step-primary text-base truncate">{mainText}</span>
      </div>

      {/* Right side: text + chevron/icon */}
      {showRightSection && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {rightText && (
            <span className="text-step-secondary text-sm">{rightText}</span>
          )}
          {variant === "inventory-search" ? (
            <ExternalLinkIcon className="text-step-secondary" />
          ) : variant === "escalation" ? null : (
            isExpanded ? (
              <ChevronUpIcon className="text-step-secondary" />
            ) : (
              <ChevronDownIcon className="text-step-secondary" />
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="step-item border-b-0">
      {headerContent}

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {canExpand && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 font-[family-name:var(--font-lato)]">
              {/* Thinking variant: paragraphs */}
              {variant === "thinking" && thoughts.length > 0 && (
                <div className="space-y-2">
                  {thoughts.map((thought, index) => (
                    <p key={index} className="text-step-secondary text-sm leading-relaxed">
                      {thought}
                    </p>
                  ))}
                </div>
              )}

              {/* Knowledge search variant: list of results */}
              {variant === "knowledge-search" && searchResults.length > 0 && (
                <ul className="space-y-1">
                  {searchResults.map((result, index) => (
                    <li key={index} className="py-1.5">
                      <div className="text-step-primary text-sm">{result.title}</div>
                      <div className="text-step-secondary text-xs">{extractDomain(result.url)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
