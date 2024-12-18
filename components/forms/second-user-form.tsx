"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RainbowButton } from "../ui/rainbow-button";

const formSchema = z.object({
  name_7034338615: z.string().min(6).max(10),
  email: z.string(),
  phone_no: z.number().min(10).max(10),
  wing_no: z.number().min(6).max(100).optional(),
});

export default function SecondUserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name_7034338615"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="john x. doe" type="text" {...field} />
              </FormControl>
              <FormDescription>please enter your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>it will be used as you username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="enter phone number "
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormDescription>please enter your phone number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wing_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>wing no.</FormLabel>
              <FormControl>
                <Input placeholder="wing no" type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col my-2 gap-4 sm:flex-row sm:justify-center">
          <Link href="/app">
            <RainbowButton type="submit">
              Let's Start the Journey 🚀
              {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
            </RainbowButton>
          </Link>
        </div>
      </form>
    </Form>
  );
}
