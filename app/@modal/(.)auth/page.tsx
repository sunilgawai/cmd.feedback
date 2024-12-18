"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import ForgotPasswordForm from "./forgot-password-form";
import ForgotEmailForm from "./forgot-email-form";

export default function AuthPage() {
  const [currentForm, setCurrentForm] = useState<
    "login" | "signup" | "forgotPassword" | "forgotEmail"
  >("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {currentForm === "login" && <LoginForm onFormSwitch={setCurrentForm} />}
        {currentForm === "signup" && (
          <SignupForm onFormSwitch={setCurrentForm} />
        )}
        {currentForm === "forgotPassword" && (
          <ForgotPasswordForm onFormSwitch={setCurrentForm} />
        )}
        {currentForm === "forgotEmail" && (
          <ForgotEmailForm onFormSwitch={setCurrentForm} />
        )}
      </div>
    </div>
  );
}
