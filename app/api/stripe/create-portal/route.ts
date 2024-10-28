import { auth } from "@/app/auth"
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await auth()
    const user = session?.user

    if (!user || !user.stripeCustomerId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: absoluteUrl("/dashboard/billing"),
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error("Error:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
