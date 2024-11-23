"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const teamFormSchema = z.object({
  usdt_address: z
    .string()
    .min(2, "Team name must be at least 2 characters.")
    .max(50, "Team name must be less than 50 characters."),
  withdrawal_amount: z
    .string()
    .min(2, "Team name must be at least 2 characters.")
    .max(50, "Team name must be less than 50 characters."),
});

type TeamFormValues = z.infer<typeof teamFormSchema>;

const WithdrawPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      usdt_address: "",
      withdrawal_amount: "",
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
    <div className="container space-y-4">
      <div className="flex justify-between items-center my-8">
        <Link href="/seller-panel">
          <Button>Go Back</Button>
        </Link>
        <h1 className="text-2xl font-semibold">
          Available Balance &nbsp;
          <span className="text-green-500">$ 0.00</span> ~ 0.00 USDT
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="usdt_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USDT Address</FormLabel>
                <FormControl>
                  <Input placeholder="USDT address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="withdrawal_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Withdrawal Amount</FormLabel>
                <FormControl>
                  <Input placeholder="withdrawal amount..." {...field} />
                </FormControl>
                <FormDescription>~ 0.00 USDT ($1 = $82.00)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isLoading}>
            Withdraw
          </LoadingButton>
        </form>
      </Form>

      <Separator />

      <h1>Withdrawal Records</h1>
    </div>
  );
};

export default WithdrawPage;
