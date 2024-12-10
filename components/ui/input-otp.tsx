"use client";

import * as React from "react";
import { OTPInput } from "input-otp";
import { cn } from "@/lib/utils";

// @ts-ignore
interface InputOTPProps extends React.ComponentProps<typeof OTPInput> {
  maxLength: number;
  className?: string;
  children: React.ReactNode;
}

interface InputOTPGroupProps {
  className?: string;
  children: React.ReactNode;
}

interface InputOTPSlotProps extends React.ComponentProps<"div"> {
  char?: string;
  hasFakeCaret?: boolean;
  isActive?: boolean;
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  )
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ char, hasFakeCaret, isActive, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-10 w-10 rounded-md border border-input bg-background text-center text-sm shadow-sm transition-all",
        isActive && "ring-2 ring-offset-background ring-ring",
        className
      )}
      {...props}
    >
      {char && (
        <div className="absolute inset-0 flex items-center justify-center">
          {char}
        </div>
      )}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
);
InputOTPSlot.displayName = "InputOTPSlot";

export { InputOTP, InputOTPGroup, InputOTPSlot };
