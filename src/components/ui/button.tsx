import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-3xl gap-2 text-center font-bold text-md ring-offset-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        black: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
        red: 'bg-red-800 text-red-100 hover:bg-red-700',
        sky: 'bg-sky-500 text-sky-100 hover:bg-sky-400',
        link: 'text-zinc-100 underline-offset-4 hover:underline',
      },
      size: {
        lg: 'h-12 px-6 py-3',
        sm: 'h-10 px-5 py-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'black',
      size: 'lg',
    },
  },
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
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
