import React from "react";
import clsx from "clsx";

type Variant = "default" | "outline" | "ghost";
type Size = "normal" | "icon";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  className,
  variant = "default",
  size = "normal",
  ...props
}: ButtonProps) {
  const base =
    "rounded-xl text-sm font-medium transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center";

  const sizes: Record<Size, string> = {
    normal: "px-4 py-2",
    icon: "w-9 h-9 p-0" // ⭐ icon-only
  };

  const variants: Record<Variant, string> = {
    default: "bg-black text-white hover:opacity-85",
    outline: "border border-gray-300 hover:bg-gray-100",
    ghost: "hover:bg-gray-100"
  };

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
