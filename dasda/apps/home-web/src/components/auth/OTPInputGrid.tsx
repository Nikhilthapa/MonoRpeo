import React from "react";

interface OTPInputGridProps {
  otp: string[];
  onOtpChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  error?: string;
  label?: string;
  length?: number;
}

export const OTPInputGrid: React.FC<OTPInputGridProps> = ({
  otp,
  onOtpChange,
  onKeyDown,
  onPaste,
  error,
  label = "Enter OTP",
  length = 6,
}) => {
  const otpArray = otp.length === length ? otp : Array.from({ length }, (_, i) => otp[i] || "");

  return (
    <div>
      <label className="mb-3 block text-center text-sm font-medium text-gray-300">{label}</label>
      <div className="flex justify-center gap-2">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => onOtpChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(index, e)}
            onPaste={index === 0 ? onPaste : undefined}
            className="h-14 w-12 rounded-lg border border-border bg-card text-center text-2xl font-semibold text-white transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        ))}
      </div>
      {error && <p className="mt-2 text-center text-sm text-red-400">{error}</p>}
    </div>
  );
};
