import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function EmailDocs() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>
            NextLaunch uses Resend for sending transactional emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Environment Setup</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Email Configuration in .env
RESEND_API_KEY=re_123456789
EMAIL_FROM=notifications@yourdomain.com`}</code>
            </pre>
            
            <h4 className="font-medium">Getting Started with Resend</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>Sign up at <a href="https://resend.com" className="text-primary hover:underline" target="_blank">Resend</a></li>
              <li>Create an API key</li>
              <li>Verify your domain</li>
              <li>Add your API key to .env</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Available Email Templates</h3>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Welcome Email</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`import WelcomeEmail from "@/emails/welcome-email";

await sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  template: WelcomeEmail,
  props: {
    name: "John",
    verificationUrl: "https://..."
  },
});`}</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Magic Link Email</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`import MagicLinkEmail from "@/emails/magic-link-email";

await sendEmail({
  to: "user@example.com",
  subject: "Sign in to Your Account",
  template: MagicLinkEmail,
  props: {
    loginUrl: "https://...",
    email: "user@example.com"
  },
});`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Creating Custom Templates</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { BaseEmail } from "./components/base-email";
import { Button, Text } from "@react-email/components";

interface CustomEmailProps {
  name: string;
  actionUrl: string;
}

export default function CustomEmail({ name, actionUrl }: CustomEmailProps) {
  return (
    <BaseEmail preview="Your email preview">
      <Text>Hello {name},</Text>
      <Button href={actionUrl}>
        Click me
      </Button>
    </BaseEmail>
  );
}`}</code>
            </pre>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testing Emails</CardTitle>
          <CardDescription>
            Tools and utilities for testing email templates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-4">
            <h4 className="font-medium">Development Testing</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Start the email preview server
npm run email dev

# Send a test email
curl http://localhost:3000/api/test-email`}</code>
            </pre>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
