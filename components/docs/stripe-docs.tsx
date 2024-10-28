import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function StripeDocs() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Stripe Integration</CardTitle>
          <CardDescription>
            Handle payments and subscriptions with Stripe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Environment Setup</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Stripe Configuration in .env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=price_...`}</code>
            </pre>
            
            <h4 className="font-medium">Setting Up Stripe</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Create a <a href="https://stripe.com" className="text-primary hover:underline" target="_blank">Stripe account</a></li>
              <li>Set up your products and prices</li>
              <li>Configure webhook endpoints</li>
              <li>Add your API keys to .env</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Components</h3>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">PayButton Component</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`<PayButton
  priceId="price_xxx"
  amount={29}
  currency="USD"
  interval="month"
/>`}</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Subscription Management</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`<BillingForm
  onPortalClick={async () => {
    const response = await fetch('/api/stripe/create-portal');
    const data = await response.json();
    window.location.href = data.url;
  }}
/>`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Webhook Handler</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case "checkout.session.completed":
      // Handle successful checkout
      break;
    case "customer.subscription.updated":
      // Handle subscription updates
      break;
  }
}`}</code>
            </pre>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
