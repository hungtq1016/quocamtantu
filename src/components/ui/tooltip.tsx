import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

/* simple class merge helper (khỏi cần utils.ts) */
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export const TooltipProvider = TooltipPrimitive.Provider

export const Tooltip = TooltipPrimitive.Root

export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-xl bg-black text-white text-xs px-3 py-1.5 shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))

TooltipContent.displayName = "TooltipContent"
