import React from "react";
import clsx from "clsx";

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        // ⭐ same vibe as toolbar
        "bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "p-4", // nhỏ hơn card cũ cho minimal
        className
      )}
      {...props}
    />
  );
}
