import React from "react";

export function ScrollArea({ children, className = "" }) {
  return (
    <div
      className={`
        overflow-y-auto
        overflow-x-hidden
        custom-scrollbar
        h-[calc(100vh-4rem)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
