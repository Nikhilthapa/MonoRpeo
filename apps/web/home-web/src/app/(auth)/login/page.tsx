"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { ForgotPasswordLink } from "@/components/auth/ForgotPasswordLink";
import { GoogleButtonWrapper } from "@/components/auth/GoogleButtonWrapper";
import { GoogleButton, Input, PasswordInput, SubmitButton } from "@org/ui";
import { API_ENDPOINTS, ROUTES } from "@/constants";
import { useAuth } from "@/hooks";
import { post } from "@/lib/api";
import { setStoredUser } from "@/lib/auth";
import { loginSchema, type LoginFormData } from "@/schemas";

export default function LoginPage() {
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema as any),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await post(API_ENDPOINTS.AUTH.LOGIN, {
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        alert(response.error);
        return;
      }

      if (response.data && typeof window !== "undefined") {
        const userData = response.data;
        if (userData.token) {
          setStoredUser({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || data.email,
            phone: userData.phone || "",
            token: userData.token,
          });
          router.push(ROUTES.DASHBOARD);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    // TODO: Implement Google OAuth integration
  };

  return (
    <AuthPageLayout
      title={<AuthTitle>Welcome Back!</AuthTitle>}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref={ROUTES.SIGNUP}
    >
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter Your Email"
        />

        <div>
          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Enter Your Password"
          />
          <ForgotPasswordLink href={ROUTES.FORGOT_PASSWORD} />
        </div>

        <SubmitButton isSubmitting={isSubmitting} submittingText="Logging in...">
          LOG IN NOW
        </SubmitButton>
      </AuthForm>

      <GoogleButtonWrapper>
        <GoogleButton onClick={handleGoogleLogin} />
      </GoogleButtonWrapper>
    </AuthPageLayout>
  );
}
