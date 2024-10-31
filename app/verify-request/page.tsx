import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            A sign in link has been sent to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click the link in your email to sign in to your account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
