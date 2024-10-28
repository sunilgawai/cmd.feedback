import { sendEmail } from "@/lib/emails";
import WelcomeEmail from "@/emails/welcome-email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const result = await sendEmail({
      to: email,
      subject: "Welcome to Our Platform",
      template: WelcomeEmail,
      props: {
        name,
        verificationUrl: "https://your-app.com/verify?token=xyz",
      },
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
