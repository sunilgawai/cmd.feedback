"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormProps = {
  onFormSwitch: (form: "signup" | "forgotPassword" | "forgotEmail") => void;
};

export default function LoginForm({ onFormSwitch }: LoginFormProps) {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      console.log("result", result);

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Redirect to dashboard or home page
        router.push("/home");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Image
          height={80}
          width={100}
          className="w-32 md:w-32 h-auto mx-auto"
          src="/logo_yellow.png"
          alt="logo"
          priority
        />
        <h2 className="text-md font-semibold  mb-4 text-center">Welcome Back</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button className="w-full" onClick={() => onFormSwitch("signup")}>
          Create an account
        </Button>
        <div className="flex justify-between mt-4">
          <Button variant="link" onClick={() => onFormSwitch("forgotPassword")}>
            Forgot Password?
          </Button>
          <Button variant="link" onClick={() => onFormSwitch("forgotEmail")}>
            Forgot Email?
          </Button>
        </div>
      </form>
    </Form>
  );
}
