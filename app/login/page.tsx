import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
