"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { BackButton } from "@/components/auth/BackButton";
import { OTPDescription } from "@/components/auth/OTPDescription";
import { OTPForm } from "@/components/auth/OTPForm";
import { OTPInfoText } from "@/components/auth/OTPInfoText";
import { OTPInputGrid } from "@/components/auth/OTPInputGrid";
import { OTPPageLayout } from "@/components/auth/OTPPageLayout";
import { OTPResendButton } from "@/components/auth/OTPResendButton";
import { Button } from "@org/ui";
import { API_ENDPOINTS, ROUTES } from "@/constants";
import { post } from "@/lib/api";
import { setStoredUser } from "@/lib/auth";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user email from temp storage
    if (typeof window !== "undefined") {
      const tempUser = localStorage.getItem("tempUser");
      if (tempUser) {
        const user = JSON.parse(tempUser);
        setUserEmail(user.email || "your email");
      } else {
        router.push(ROUTES.SIGNUP);
      }
    }
  }, [router]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ""); // Only numbers

    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }

    setOtp(newOtp);

    // Focus last filled input or first empty
    const lastFilledIndex = newOtp.findIndex((val, idx) => idx >= pastedData.length || !val);
    const focusIndex = lastFilledIndex === -1 ? 5 : Math.min(lastFilledIndex, 5);
    const nextInput = document.getElementById(`otp-${focusIndex}`);
    nextInput?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await post<{ token: string; user: any }>(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        otp: otpValue,
      });

      if (response.error) {
        setError(response.error);
        setIsSubmitting(false);
        return;
      }

      if (response.data) {
        const tempUser = localStorage.getItem("tempUser");
        if (tempUser) {
          const user = JSON.parse(tempUser);
          setStoredUser({
            ...user,
            token: response.data.token,
          });
          localStorage.removeItem("tempUser");
        }

        router.push(ROUTES.DASHBOARD);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    try {
      const response = await post(API_ENDPOINTS.AUTH.RESEND_OTP, {});

      if (response.error) {
        setError(response.error);
      } else {
        alert("OTP has been resent to your email");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <OTPPageLayout
      currentStep={2}
      backButton={<BackButton onClick={() => router.push(ROUTES.SIGNUP)}>Go Back</BackButton>}
      title="Otp Verification"
      description={<OTPDescription email={userEmail} />}
    >
      <OTPForm onSubmit={handleSubmit}>
        <OTPInputGrid
          otp={otp}
          onOtpChange={handleOtpChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          error={error}
        />

        <OTPInfoText>OTP is valid for 10 minutes</OTPInfoText>

        <OTPResendButton onClick={handleResend} disabled={isResending} isResending={isResending} />

        <Button type="submit" disabled={isSubmitting || otp.some((d) => !d)}>
          {isSubmitting ? "Verifying..." : "SIGN UP NOW"}
        </Button>
      </OTPForm>
    </OTPPageLayout>
  );
}
