import { Resend } from "resend";
import SubscriptionEmail from "@/emails/subscription-email";
import { siteConfig } from "@/config/site";
import * as React from "react";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Generic email sending function
export async function sendEmail<T extends Record<string, unknown>>({
  to,
  subject,
  template: EmailTemplate,
  props,
}: {
  to: string;
  subject: string;
  template: React.ComponentType<T>;
  props: T;
}) {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to,
      subject,
      react: React.createElement(EmailTemplate, props),
    });

    console.log("data", data);

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

// Specific email functions
export async function sendSubscriptionEmail(
  email: string,
  name: string | null,
  type: "created" | "updated" | "cancelled"
) {
  const subject = {
    created: "Welcome to Your Subscription!",
    updated: "Your Subscription Has Been Updated",
    cancelled: "Your Subscription Has Been Cancelled",
  }[type];

  return sendEmail({
    to: email,
    subject,
    template: SubscriptionEmail,
    props: {
      name: name || "there",
      type,
    },
  });
}
