import { Check, Bookmark } from "lucide-react";
import React, { useState } from "react";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  variant?: "standard" | "bookmark";
  label?: string;
  error?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = "standard",
      label,
      error,
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

    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 11)}`;

    const baseInputStyles =
      "sr-only peer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded";

    const standardCheckboxStyles =
      "relative flex h-5 w-5 items-center justify-center rounded border-2 border-tertiary bg-transparent transition-all peer-checked:bg-tertiary peer-checked:border-tertiary peer-focus:ring-2 peer-focus:ring-primary peer-disabled:opacity-50 peer-disabled:cursor-not-allowed";

    const bookmarkCheckboxStyles =
      "relative flex h-5 w-5 items-center justify-center text-tertiary transition-all peer-checked:text-tertiary peer-focus:ring-2 peer-focus:ring-primary peer-disabled:opacity-50 peer-disabled:cursor-not-allowed";

    return (
      <div className={`flex flex-col ${className}`}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className={baseInputStyles}
              aria-checked={checked}
              aria-invalid={!!error}
              aria-describedby={error ? `${checkboxId}-error` : undefined}
              {...props}
            />
            <label
              htmlFor={checkboxId}
              className={`${variant === "standard" ? standardCheckboxStyles : bookmarkCheckboxStyles} ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {variant === "standard" && checked && <Check className="h-3 w-3 text-white" />}
              {variant === "bookmark" && (
                <Bookmark className="h-5 w-5" fill={checked ? "currentColor" : "none"} />
              )}
            </label>
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className={`text-sm font-medium text-white ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <span id={`${checkboxId}-error`} className="mt-1 text-xs text-alert-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

