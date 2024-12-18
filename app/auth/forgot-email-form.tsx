"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotEmail } from "@/app/actions/auth";
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

const forgotEmailSchema = z.object({
  phoneNumber: z.string().min(10),
});

type ForgotEmailFormProps = {
  onFormSwitch: (form: "login") => void;
};

export default function ForgotEmailForm({
  onFormSwitch,
}: ForgotEmailFormProps) {
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof forgotEmailSchema>>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotEmailSchema>) {
    try {
      const email = await forgotEmail(values.phoneNumber as any);
      setMessage(`Your email is: ${email}`);
    } catch (error) {
      setMessage("Error retrieving email. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Forgot Email</h2>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {message && <p className="text-blue-500">{message}</p>}
        <Button type="submit" className="w-full">
          Retrieve Email
        </Button>
        <Button variant="link" onClick={() => onFormSwitch("login")}>
          Back to Login
        </Button>
      </form>
    </Form>
  );
}
