import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-0.5 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "rounded-full border-transparent bg-primary text-primary-foreground",
        secondary:
          "rounded-full border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "rounded-full border-transparent bg-destructive text-destructive-foreground",
        outline: "rounded-full text-foreground border border-foreground/10",
        // OKLCH colors for perceptually uniform blue shades
        // Hue 252 = blue, consistent across light/dark modes
        featured: "rounded-full bg-[oklch(0.94_0.04_252)] text-[oklch(0.55_0.2_252)] dark:bg-[oklch(0.25_0.08_252)] dark:text-[oklch(0.72_0.14_252)]",
        // Live variant - green with flat style and dot
        live: "rounded-md bg-[oklch(0.94_0.04_142)] text-[oklch(0.45_0.15_142)] dark:bg-[oklch(0.25_0.08_142)] dark:text-[oklch(0.70_0.12_142)]",
        // In-flight variant - blue with flat style and dot
        "in-flight": "rounded-md bg-[oklch(0.94_0.04_252)] text-[oklch(0.55_0.2_252)] dark:bg-[oklch(0.25_0.08_252)] dark:text-[oklch(0.72_0.14_252)]",
        // Tested variant - orange with flat style and dot
        tested: "rounded-md bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
        // Flat grey pill, no dot (same flat style as featured/live but neutral)
        grey: "rounded-full border-transparent bg-[oklch(96.7%_0.003_264.542)] text-[oklch(44.6%_0.03_256.802)] dark:bg-[oklab(70.7%_-0.00331825_-0.0217483/0.1)] dark:text-[oklch(70.7%_0.022_261.325)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  const showDot = variant === "live" || variant === "in-flight" || variant === "tested";
  
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }

