// Reusable content wrapper with consistent outer/inner block structure
// Outer: full viewport width + responsive padding (px-8 mobile, px-16 desktop)
// Inner: max-width constraint (if any) + centered

interface ContentWrapperProps {
  children: React.ReactNode;
  /** Use full max-width (608px) for text content, false for full-bleed content like images */
  hasMaxWidth?: boolean;
  /** Additional classes for the inner container */
  className?: string;
  /** Inline styles for the inner container */
  style?: React.CSSProperties;
  /** Element type for outer container */
  as?: "div" | "header" | "section" | "main" | "footer";
  /** Spacing variant - uses collapsing margins */
  spacing?: "none" | "text" | "media";
}

const spacingClasses = {
  none: "",
  text: "my-6", // 24px - collapses to 24px between adjacent text blocks
  media: "my-[72px]", // 72px - collapses with adjacent media or dominates over text
};

export function ContentWrapper({
  children,
  hasMaxWidth = true,
  className = "",
  style,
  as: Component = "div",
  spacing = "none",
}: ContentWrapperProps) {
  return (
    <Component className={`w-full px-8 sm:px-16 ${spacingClasses[spacing]}`.trim()}>
      <div
        className={`${hasMaxWidth ? "max-w-[608px] mx-auto" : "w-full"} ${className}`.trim()}
        style={style}
      >
        {children}
      </div>
    </Component>
  );
}
