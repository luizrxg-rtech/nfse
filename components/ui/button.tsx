import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(`
    inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background
    transition-all duration-100
    disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  `,
  {
    variants: {
      variant: {
        default: 'bg-accent text-white hover:scale-105 active:scale-95',
        destructive: 'bg-destructive text-destructive-foreground hover:scale-105 active:scale-95',
        outline: 'border border-input bg-background hover:scale-105 active:scale-95',
        secondary: 'bg-secondary text-secondary-foreground hover:scale-105 active:scale-95',
        ghost: 'bg-background hover:scale-105 active:scale-95',
        translucid: 'bg-transparent text-foreground-600 hover:bg-black/10 active:scale-95',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-8 py-3',
        sm: 'h-9 px-6',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
