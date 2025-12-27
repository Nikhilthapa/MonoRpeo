import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import React from "react";

import { Icon, type IconName } from "./Icon";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "large"
  | "tertiary"
  | "outline"
  | "primary-nav"
  | "secondary-nav";
type ButtonSize = "sm" | "md" | "lg";
type IconType = string | LucideIcon | React.ReactNode;

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      fullWidth = false,
      loading = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2.5 text-sm gap-2.5",
      lg: "px-6 py-3 text-base gap-3",
    };

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "rounded-lg bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/50 focus:ring-primary",
      secondary: "rounded-lg bg-black-shade text-white hover:opacity-90 focus:ring-black-shade",
      large:
        "rounded-lg bg-primary text-white hover:opacity-90 uppercase font-semibold w-full focus:ring-primary",
      tertiary: "rounded-lg bg-tertiary text-white hover:opacity-90 focus:ring-tertiary",
      outline:
        "rounded-lg border border-text-second bg-transparent text-text-second hover:border-white hover:text-white focus:ring-text-second",
      "primary-nav":
        "px-[30px] py-[15px] rounded-xl bg-primary text-white hover:opacity-90 focus:ring-primary",
      "secondary-nav":
        "px-[30px] py-[15px] rounded-xl bg-black-shade text-white hover:opacity-90 focus:ring-black-shade",
    };

    const widthClass = fullWidth || variant === "large" ? "w-full" : "w-auto";

    const getIconSize = (buttonSize: ButtonSize): "sm" | "md" | "lg" => {
      return buttonSize === "sm" ? "sm" : buttonSize === "lg" ? "lg" : "md";
    };

    const renderIcon = () => {
      if (loading) {
        const iconSize = getIconSize(buttonSize);
        return (
          <Loader2
            className={`${iconSize === "sm" ? "h-4 w-4" : iconSize === "lg" ? "h-6 w-6" : "h-5 w-5"} animate-spin`}
          />
        );
      }

      if (!icon) return null;

      if (typeof icon === "string") {
        const iconName = icon === "arrow" ? "chevron-right" : icon;
        return <Icon name={iconName as IconName} size={getIconSize(buttonSize)} />;
      }

      if (React.isValidElement(icon)) {
        return <>{icon}</>;
      }

      const IconComponent = icon as LucideIcon;
      const iconSize = getIconSize(buttonSize);
      const iconSizeClass =
        iconSize === "sm" ? "h-4 w-4" : iconSize === "lg" ? "h-6 w-6" : "h-5 w-5";
      return <IconComponent className={iconSizeClass} />;
    };

    const isDisabled = disabled || loading;
    const buttonSize = variant === "large" ? "md" : size;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[buttonSize]} ${variantStyles[variant]} ${widthClass} ${className}`}
        disabled={isDisabled}
        aria-busy={loading}
        aria-label={props["aria-label"] || (typeof children === "string" ? children : undefined)}
        {...props}
      >
        {iconPosition === "left" && renderIcon()}
        {children}
        {iconPosition === "right" && renderIcon()}
      </button>
    );
  }
);

Button.displayName = "Button";

