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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";

const agentFormSchema = z.object({
  username: z
    .string()
    .min(6, "Agent name must be at least 2 characters.")
    .max(50, "Agent name must be less than 50 characters."),
  phone: z
    .string()
    .min(10, "Agent number must be at least 10 characters.")
    .max(10, "Agent name must be less than 10 characters."),
  password: z
    .string()
    .min(6, "Agent password must be at least 6 characters.")
    .max(50, "Agent password must be less than 50 characters."),
  role: z.string(),
});

type TeamFormValues = z.infer<typeof agentFormSchema>;

type CreateAgentFormProps = {
  mode?: "create" | "edit";
};
const CreateAgentForm = ({ mode = "create" }: CreateAgentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      username: "",
      phone: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(data: TeamFormValues) {
    setIsLoading(true);
    if (mode == "create") {
    }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
              </FormControl>
              <FormDescription>
                This is your agent's visible name within the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
              </FormControl>
              <FormDescription>
                This is your agent's visible name within the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
              </FormControl>
              <FormDescription>
                This is your agent's visible name within the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
              </FormControl>
              <FormDescription>
                This is your agent's visible name within the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={isLoading}>
          Create Agent
        </LoadingButton>
      </form>
    </Form>
  );
};

export default CreateAgentForm;