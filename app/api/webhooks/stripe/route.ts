import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendSubscriptionEmail } from "@/lib/emails";
import type Stripe from "stripe";

async function handleEmailNotification(
  user: { email: string | null; name: string | null },
  type: "created" | "updated" | "cancelled"
) {
  if (!user.email) return;

  try {
    const result = await sendSubscriptionEmail(user.email, user.name, type);
    if (!result.success) {
      console.error("Failed to send subscription email:", result.error);
    }
  } catch (error) {
    console.error("Error sending subscription email:", error);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Webhook signature verification failed:", error.message);
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }
    return new NextResponse("Unknown webhook error", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode !== "subscription") break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const user = await prisma.user.update({
          where: {
            id: session.metadata?.userId,
          },
          data: {
            stripeCustomerId: subscription.customer as string,
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
          },
        });

        await handleEmailNotification(user, "created");
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        const user = await prisma.user.findUnique({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });

        if (!user) break;

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            subscriptionStatus: subscription.status,
          },
        });

        await handleEmailNotification(user, "updated");
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const user = await prisma.user.findUnique({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });

        if (!user) break;

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            subscriptionStatus: subscription.status,
            subscriptionId: null,
          },
        });

        await handleEmailNotification(user, "cancelled");
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        if (!invoice.subscription) break;

        const user = await prisma.user.findUnique({
          where: {
            stripeCustomerId: invoice.customer as string,
          },
          select: {
            id: true,
          },
        });

        if (!user) break;

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            subscriptionStatus: "active",
          },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        const user = await prisma.user.findUnique({
          where: {
            stripeCustomerId: invoice.customer as string,
          },
          select: {
            id: true,
          },
        });

        if (!user) break;

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            subscriptionStatus: "past_due",
          },
        });
        break;
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Webhook handler failed", { status: 400 });
  }
}
