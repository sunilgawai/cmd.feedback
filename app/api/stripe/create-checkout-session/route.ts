import { auth } from "../../../../app/auth";
import { stripe } from "../../../../lib/stripe";
import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return new NextResponse("Price ID is required", { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      metadata: {
        userId: user.id,
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: absoluteUrl("/dashboard?success=true"),
      cancel_url: absoluteUrl("/dashboard?canceled=true"),
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
