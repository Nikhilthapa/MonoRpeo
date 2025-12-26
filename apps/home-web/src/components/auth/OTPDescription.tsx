import React from "react";

interface OTPDescriptionProps {
  email: string;
}

export const OTPDescription: React.FC<OTPDescriptionProps> = ({ email }) => {
  return (
    <>
      We've sent you a One Time Password (OTP) to your email{" "}
      <span className="font-semibold text-primary">{email}</span>
    </>
  );
};
