import React, { useState } from "react";

interface ToggleProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "size"
> {
  label?: string;
  size?: "sm" | "md" | "lg";
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const sizeStyles = {
  sm: {
    track: "h-4 w-7",
    thumb: "h-3 w-3",
    translateChecked: "translate-x-3",
    translateUnchecked: "translate-x-0.5",
  },
  md: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translateChecked: "translate-x-4",
    translateUnchecked: "translate-x-0.5",
  },
  lg: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translateChecked: "translate-x-5",
    translateUnchecked: "translate-x-0.5",
  },
};

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      size = "md",
      checked: controlledChecked,
      defaultChecked,
      onChange,
      disabled,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked || false);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = (e.target as any).checked;
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }
      onChange?.(newChecked);
    };

    const toggleId = id || `toggle-${Math.random().toString(36).substring(2, 11)}`;
    const styles = sizeStyles[size];

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={toggleId}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="peer sr-only rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-checked={checked}
            aria-label={label || props["aria-label"]}
            {...props}
          />
          <label
            htmlFor={toggleId}
            className={`${styles.track} relative inline-flex cursor-pointer items-center rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${
              checked ? "bg-primary" : "bg-primary/50"
            }`}
          >
            <span
              className={`${styles.thumb} inline-block transform rounded-full bg-white transition-transform ${
                checked ? styles.translateChecked : styles.translateUnchecked
              }`}
            />
          </label>
        </div>
        {label && (
          <label
            htmlFor={toggleId}
            className={`text-sm font-medium text-white ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

