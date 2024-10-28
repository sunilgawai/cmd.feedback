import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthDocs() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Setup</CardTitle>
          <CardDescription>
            NextLaunch uses NextAuth.js for authentication with support for
            multiple providers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Environment Variables</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Authentication (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`}</code>
            </pre>

            <h4 className="font-medium">Getting Google OAuth Credentials</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Go to the{" "}
                <a
                  href="https://console.cloud.google.com/"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Google Cloud Console
                </a>
              </li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the Google OAuth API</li>
              <li>Configure the OAuth consent screen</li>
              <li>
                Create OAuth 2.0 credentials (Client ID and Client Secret)
              </li>
              <li>
                Add authorized redirect URI:{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  http://localhost:3000/api/auth/callback/google
                </code>
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">
              Available Authentication Methods
            </h3>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Magic Links (Email)</h4>
                <p className="text-sm text-muted-foreground">
                  Passwordless authentication using email magic links. Users
                  receive a login link via email.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Google OAuth</h4>
                <p className="text-sm text-muted-foreground">
                  Social authentication using Google accounts. Requires Google
                  OAuth credentials.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Usage Example</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { auth } from "@/app/auth"

export default async function Page() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return <div>Welcome {session.user.name}!</div>
}`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Protected API Routes</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { auth } from "@/app/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // Your protected API logic here
}`}</code>
            </pre>
          </section>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customization</CardTitle>
          <CardDescription>
            Learn how to customize the authentication experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Adding New Providers</h3>
            <p className="text-sm text-muted-foreground">
              You can add more authentication providers by updating the{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">
                app/auth.ts
              </code>{" "}
              file:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    // Existing providers...
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
}`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Custom Login Page</h3>
            <p className="text-sm text-muted-foreground">
              The login page can be customized by modifying{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">
                app/login/page.tsx
              </code>{" "}
              and{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded">
                components/login-form.tsx
              </code>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
