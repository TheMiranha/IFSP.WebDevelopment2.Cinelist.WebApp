import React from "react";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  // Base styles applied to all buttons
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900";

  // Variants mapping
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-transparent hover:bg-zinc-800 text-sky-50 border border-zinc-700 hover:border-zinc-600 focus:ring-zinc-500",
    ghost: "bg-transparent hover:bg-zinc-800 text-sky-50 focus:ring-zinc-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
