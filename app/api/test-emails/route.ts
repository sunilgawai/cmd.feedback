import { sendEmail } from "@/lib/emails";
import WelcomeEmail from "@/emails/welcome-email";
import SubscriptionEmail from "@/emails/subscription-email";
import { NextResponse } from "next/server";

type SubscriptionType = "created" | "updated" | "cancelled";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "welcome";
  const email = searchParams.get("email") || "your-email@example.com";

  try {
    let result;

    switch (type) {
      case "welcome":
        result = await sendEmail({
          to: email,
          subject: "Welcome to Our Platform",
          template: WelcomeEmail,
          props: {
            name: "Test User",
            verificationUrl: "http://localhost:3000/verify",
          },
        });
        break;

      case "subscription": {
        const subscriptionType: SubscriptionType = "created"; // You can make this dynamic if needed
        result = await sendEmail({
          to: email,
          subject: "Subscription Update",
          template: SubscriptionEmail,
          props: {
            name: "Test User",
            type: subscriptionType,
          },
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Failed to send test email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
