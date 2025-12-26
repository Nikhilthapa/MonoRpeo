import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import React, { useMemo } from "react";

export type IconSize = "sm" | "md" | "lg";

type LucideIconKeys = keyof typeof LucideIcons;
type PascalCaseIconName = Extract<LucideIconKeys, string>;
export type IconName = PascalCaseIconName;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: IconName;
  icon?: LucideIcon | React.ReactNode;
  size?: IconSize;
  className?: string;
}

const sizeMap: Record<IconSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const convertKebabToPascal = (kebabCase: string): string => {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const getIconComponent = (iconName: string): LucideIcon | null => {
  const pascalName = convertKebabToPascal(iconName);
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[pascalName];
  return IconComponent && typeof IconComponent === "function" ? IconComponent : null;
};

export const Icon: React.FC<IconProps> = ({
  name,
  icon,
  size = "md",
  className = "",
  ...props
}) => {
  const IconComponent = useMemo(() => {
    if (icon) {
      if (React.isValidElement(icon)) {
        return null;
      }
      return icon as LucideIcon;
    }

    if (name) {
      return getIconComponent(name);
    }

    return null;
  }, [name, icon]);

  if (icon && React.isValidElement(icon)) {
    return <>{icon}</>;
  }

  if (IconComponent) {
    const componentName = IconComponent.name || "";
    const isLoader =
      name === "Loader2" || componentName === "Loader2" || componentName === "Loader";
    return (
      <IconComponent
        className={`${sizeMap[size]} ${isLoader ? "animate-spin" : ""} ${className}`}
        {...props}
      />
    );
  }

  return null;
};

Icon.displayName = "Icon";

