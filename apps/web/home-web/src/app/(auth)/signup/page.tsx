"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { GoogleButtonWrapper } from "@/components/auth/GoogleButtonWrapper";
import { FormGrid, GoogleButton, Input, PasswordInput, SubmitButton } from "@org/ui";
import { ProgressHeader } from "@org/ui";
import { API_ENDPOINTS, ROUTES } from "@/constants";
import { useAuth } from "@/hooks";
import { post } from "@/lib/api";
import { signupSchema, type SignupFormData } from "@/schemas";

export default function SignupPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema as any),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await post(API_ENDPOINTS.AUTH.REGISTER, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        alert(response.error);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "tempUser",
          JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
          })
        );
      }

      router.push(ROUTES.OTP);
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    // Placeholder for Google OAuth
    // TODO: Implement Google OAuth integration
  };

  return (
    <AuthPageLayout
      title={
        <>
          <AuthTitle variant="white">Find Your Next Big Opportunity!</AuthTitle>{" "}
          <AuthTitle>Create Your Profile</AuthTitle>
        </>
      }
      footerText="Already have an account?"
      footerLinkText="Login here"
      footerLinkHref={ROUTES.LOGIN}
      showProgressHeader={true}
      progressHeader={<ProgressHeader currentStep={1} />}
    >
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <FormGrid>
          <Input
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
            placeholder="Enter Your First Name"
          />
          <Input
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
            placeholder="Enter Your Last Name"
          />
        </FormGrid>

        <FormGrid>
          <Input
            label="Phone Number"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
            placeholder="Enter Your Phone Number"
          />
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Enter Your Email"
          />
        </FormGrid>

        <FormGrid>
          <PasswordInput
            label="Create Password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Enter Your Password"
          />
          <PasswordInput
            label="Confirm Your Password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="Enter Your Confirm Password"
          />
        </FormGrid>

        <SubmitButton isSubmitting={isSubmitting} submittingText="Signing up...">
          SIGN UP NOW
        </SubmitButton>
      </AuthForm>

      <GoogleButtonWrapper>
        <GoogleButton onClick={handleGoogleSignup} />
      </GoogleButtonWrapper>
    </AuthPageLayout>
  );
}
