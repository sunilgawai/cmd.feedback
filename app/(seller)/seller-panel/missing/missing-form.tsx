"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";

const teamFormSchema = z.object({
  image: z
    .string()
    .min(2, "Team name must be at least 2 characters.")
    .max(50, "Team name must be less than 50 characters."),
  amount: z
    .string()
    .min(2, "Team name must be at least 2 characters.")
    .max(50, "Team name must be less than 50 characters."),
});

type TeamFormValues = z.infer<typeof teamFormSchema>;

export function MissingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      image: "",
      amount: "",
    },
  });

  async function onSubmit(data: TeamFormValues) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      const team = await response.json();
      toast.success("Team created successfully");
      router.push(`/dashboard/teams/${team.slug}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Image</FormLabel>
              <FormControl>
                <Input placeholder="UPI ID..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Amount</FormLabel>
              <FormControl>
                <Input placeholder="UPI Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={isLoading}>
          Upload
        </LoadingButton>
      </form>
    </Form>
  );
}
