"use client";

import { useState } from "react";

export default function AuthPage() {
  const [currentForm, setCurrentForm] = useState<
    "login" | "signup" | "forgotPassword" | "forgotEmail"
  >("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1>Auth Page</h1>
    </div>
  );
}
