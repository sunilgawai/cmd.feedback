"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPassword } from "@/app/actions/auth";
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

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormProps = {
  onFormSwitch: (form: "login") => void;
};

export default function ForgotPasswordForm({
  onFormSwitch,
}: ForgotPasswordFormProps) {
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    try {
      await forgotPassword(values.email as any);
      setMessage("Password reset instructions sent to your email.");
    } catch (error) {
      setMessage("Error sending reset instructions. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
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
        {message && <p className="text-blue-500">{message}</p>}
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
        <Button variant="link" onClick={() => onFormSwitch("login")}>
          Back to Login
        </Button>
      </form>
    </Form>
  );
}
