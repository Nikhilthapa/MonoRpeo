import React from "react";

interface GridProps {
  columns?: number;
  gap?: "xs" | "s" | "m" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | number;
  children: React.ReactNode;
  className?: string;
}

const gapClassMap: Record<string, string> = {
  xs: "gap-[5px]",
  s: "gap-[10px]",
  m: "gap-[15px]",
  xl: "gap-[30px]",
  "2xl": "gap-[32px]",
  "3xl": "gap-[40px]",
  "4xl": "gap-[50px]",
  "5xl": "gap-[60px]",
  "6xl": "gap-[100px]",
};

export const Grid: React.FC<GridProps> = ({
  columns = 12,
  gap = "2xl",
  children,
  className = "",
}) => {
  const gapClass =
    typeof gap === "number" ? `gap-[${gap}px]` : gapClassMap[gap] || gapClassMap["2xl"];

  const gridStyle: React.CSSProperties =
    columns !== 12 ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {};

  return (
    <div className={`grid grid-cols-12 ${gapClass} ${className}`} style={gridStyle}>
      {children}
    </div>
  );
};

