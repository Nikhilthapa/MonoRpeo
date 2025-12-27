import React from "react";

import { Button } from "./Button";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSubmitting?: boolean;
  submittingText?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  isSubmitting = false,
  submittingText,
  ...props
}) => {
  return (
    <Button type="submit" disabled={isSubmitting} className="mt-3 sm:mt-4" {...props}>
      {isSubmitting ? submittingText || "Submitting..." : children}
    </Button>
  );
};

