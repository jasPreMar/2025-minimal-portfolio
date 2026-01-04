import { ReactNode } from "react";

interface PreviewProps {
  children: ReactNode;
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Preview is a generic container wrapper for interactive demos.
 * It provides consistent width constraints matching the site content
 * and a transparent background.
 */
export function Preview({ children, className = "" }: PreviewProps) {
  return (
    <div
      className={`
        preview-container
        w-full
        max-w-[608px]
        mx-auto
        bg-preview-background
        rounded-xl
        overflow-hidden
        p-6
        ${className}
      `}
      style={{
        boxShadow: "0 0 0 1px #00000014, 0px 2px 2px #0000000a",
      }}
    >
      {children}
    </div>
  );
}
