// Reusable content wrapper with consistent outer/inner block structure
// Outer: full viewport width + responsive padding (px-8 mobile, px-16 desktop)
// Inner: max-width constraint (if any) + centered

interface ContentWrapperProps {
  children: React.ReactNode;
  /** Use full max-width (608px) for text content, false for full-bleed content like images */
  hasMaxWidth?: boolean;
  /** When true, inner uses w-full instead of max-w (e.g. for sticky header when stuck) */
  forceFullWidth?: boolean;
  /** Additional classes for the inner container */
  className?: string;
  /** Additional classes for the outer container */
  outerClassName?: string;
  /** Inline styles for the inner container */
  style?: React.CSSProperties;
  /** Element type for outer container */
  as?: "div" | "header" | "section" | "main" | "footer";
  /** Spacing variant - uses collapsing margins */
  spacing?: "none" | "text" | "section" | "media" | "mediaBottom";
}

const spacingClasses = {
  none: "",
  text: "my-4", // 16px - collapses to 16px between adjacent text blocks
  section: "mt-[112px]", // 112px top margin for section headers
  media: "my-[112px]", // 112px - collapses with adjacent media or dominates over text
  mediaBottom: "mt-4 mb-[112px]", // 16px top, 112px bottom margin - for first/hero images
};

export function ContentWrapper({
  children,
  hasMaxWidth = true,
  forceFullWidth = false,
  className = "",
  outerClassName = "",
  style,
  as: Component = "div",
  spacing = "none",
}: ContentWrapperProps) {
  const innerWidthClass = forceFullWidth ? "w-full" : hasMaxWidth ? "max-w-[608px] mx-auto" : "w-full";
  return (
    <Component className={`w-full px-8 sm:px-16 ${spacingClasses[spacing]} ${outerClassName}`.trim()}>
      <div
        className={`${innerWidthClass} ${className}`.trim()}
        style={style}
      >
        {children}
      </div>
    </Component>
  );
}
