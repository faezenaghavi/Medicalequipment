"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-zinc-950 text-slate-950 transition-colors dark:bg-zinc-900",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -inset-[10px] opacity-50 will-change-transform filter blur-[10px] invert dark:invert-0",
            "[background-image:var(--white-gradient),var(--aurora)]",
            "dark:[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]",
            "after:dark:[background-image:var(--dark-gradient),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference",
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
          )}
        />
      </div>

      {children}
    </div>
  );
};