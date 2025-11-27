import React from "react";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const isCircular = variant === "circular";

  const baseShape = isCircular
    ? "p-2 rounded-full flex items-center justify-center cursor-pointer"
    : "px-4 py-2 rounded-md cursor-pointer";

  const baseStyles = `${baseShape} font-medium transition-all duration-200 text-sm disabled:opacity-50`;

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20",
    secondary:
      "bg-transparent hover:bg-zinc-800 text-sky-50 border border-zinc-700 hover:border-zinc-600",
    ghost: "bg-transparent hover:bg-zinc-800 text-sky-50",
    circular:
      "bg-black/50 hover:bg-blue-600 text-white border border-transparent",
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
