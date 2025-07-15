import * as React from "react";

import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={clsx(
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "bg-primary text-white hover:bg-primary/90",
          "h-10 px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
