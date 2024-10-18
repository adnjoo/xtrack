import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-black rounded-none text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-transform transform active:translate-y-1 hover:-translate-y-1",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-gray-100 shadow-[6px_6px_0_0_#000] active:shadow-none",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-[6px_6px_0_0_#000] active:shadow-none",
        outline:
          "border-2 border-black bg-white text-black hover:bg-gray-100 shadow-[6px_6px_0_0_#000] active:shadow-none",
        secondary:
          "bg-gray-200 text-black hover:bg-gray-300 shadow-[6px_6px_0_0_#000] active:shadow-none",
        ghost: "bg-transparent hover:bg-gray-100 text-black shadow-none",
        link: "text-black underline underline-offset-4 hover:no-underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 py-2 text-xs",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }