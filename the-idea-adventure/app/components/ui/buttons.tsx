import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/utils";

export const buttonVariants = cva(
  "btn-base",
  {
    variants: {
      variant: {
        default: "btn-default",
        outline: "btn-outline",
        ghost: "btn-ghost",
      },
      size: {
        default: "btn-md",
        sm: "btn-sm",
        lg: "btn-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean; 
  };

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
