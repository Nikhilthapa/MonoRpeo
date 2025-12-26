import React from "react";

interface OTPResendButtonProps {
  onClick: () => void;
  disabled: boolean;
  isResending: boolean;
  text?: string;
  sendingText?: string;
}

export const OTPResendButton: React.FC<OTPResendButtonProps> = ({
  onClick,
  disabled,
  isResending,
  text = "Didn't receive the code? Re-Send",
  sendingText = "Sending...",
}) => {
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="text-sm text-primary transition-colors hover:text-primary-dark disabled:opacity-50"
      >
        {isResending ? sendingText : text}
      </button>
    </div>
  );
};
