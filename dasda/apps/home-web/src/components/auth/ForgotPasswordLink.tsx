import React from "react";

interface ForgotPasswordLinkProps {
  href: string;
  text?: string;
}

export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  href,
  text = "Forget Password?",
}) => {
  return (
    <div className="mt-1.5 flex justify-end">
      <a
        href={href}
        className="text-xs font-medium text-primary transition-colors hover:text-primary-dark"
      >
        {text}
      </a>
    </div>
  );
};
