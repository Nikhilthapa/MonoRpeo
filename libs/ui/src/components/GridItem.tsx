import React from "react";

interface ResponsiveSpan {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface GridItemProps {
  span?: number | ResponsiveSpan;
  offset?: number | ResponsiveSpan;
  children: React.ReactNode;
  className?: string;
}

const spanClassMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const offsetClassMap: Record<number, string> = {
  0: "col-start-1",
  1: "col-start-2",
  2: "col-start-3",
  3: "col-start-4",
  4: "col-start-5",
  5: "col-start-6",
  6: "col-start-7",
  7: "col-start-8",
  8: "col-start-9",
  9: "col-start-10",
  10: "col-start-11",
  11: "col-start-12",
};

export const GridItem: React.FC<GridItemProps> = ({
  span = 12,
  offset,
  children,
  className = "",
}) => {
  const getSpanClasses = (spanValue: number | ResponsiveSpan): string => {
    if (typeof spanValue === "number") {
      return spanClassMap[spanValue] || "";
    }

    const classes: string[] = [];
    if (spanValue.sm !== undefined && spanClassMap[spanValue.sm]) {
      classes.push(`sm:${spanClassMap[spanValue.sm]}`);
    } else if (spanValue.md !== undefined && !spanValue.sm) {
      classes.push("col-span-12");
    }
    if (spanValue.md !== undefined && spanClassMap[spanValue.md]) {
      classes.push(`md:${spanClassMap[spanValue.md]}`);
    }
    if (spanValue.lg !== undefined && spanClassMap[spanValue.lg]) {
      classes.push(`lg:${spanClassMap[spanValue.lg]}`);
    }
    if (spanValue.xl !== undefined && spanClassMap[spanValue.xl]) {
      classes.push(`xl:${spanClassMap[spanValue.xl]}`);
    }
    return classes.join(" ");
  };

  const getOffsetClasses = (offsetValue: number | ResponsiveSpan): string => {
    if (typeof offsetValue === "number") {
      return offsetClassMap[offsetValue] || "";
    }

    const classes: string[] = [];
    if (offsetValue.sm !== undefined && offsetClassMap[offsetValue.sm]) {
      classes.push(`sm:${offsetClassMap[offsetValue.sm]}`);
    }
    if (offsetValue.md !== undefined && offsetClassMap[offsetValue.md]) {
      classes.push(`md:${offsetClassMap[offsetValue.md]}`);
    }
    if (offsetValue.lg !== undefined && offsetClassMap[offsetValue.lg]) {
      classes.push(`lg:${offsetClassMap[offsetValue.lg]}`);
    }
    if (offsetValue.xl !== undefined && offsetClassMap[offsetValue.xl]) {
      classes.push(`xl:${offsetClassMap[offsetValue.xl]}`);
    }
    return classes.join(" ");
  };

  const spanClasses = getSpanClasses(span);
  const offsetClasses = offset ? getOffsetClasses(offset) : "";

  return <div className={`${spanClasses} ${offsetClasses} ${className}`.trim()}>{children}</div>;
};

