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
import { registerAgent } from "@/app/actions/agent-action";

const RoleEnum = z.enum([
  "AGENT",
  "SUPERADMIN",
  "SELLER_AGENT",
  "WITHDRAW_AGENT",
]);
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
  role: z.enum(["AGENT", "SUPERADMIN", "SELLER_AGENT", "WITHDRAW_AGENT"]),
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
      role: "AGENT",
    },
  });

  async function onSubmit(data: TeamFormValues) {
    console.log("data", data);
    setIsLoading(true);
    if (mode == "create") {
      try {
        const response = await registerAgent(data);
        console.log("response", response);
        if (!response) {
          throw new Error("Failed to create team");
        }

        toast.success("Agent added successfully");
        form.reset();
        router.push(`/dashboard/agents`);
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
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
              <FormLabel>Agent Username</FormLabel>
              <FormControl>
                <Input placeholder="Username..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Phone No.</FormLabel>
              <FormControl>
                <Input placeholder="Phone No..." {...field} />
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
              <FormLabel>Agent Password</FormLabel>
              <FormControl>
                <Input placeholder="Password..." {...field} />
              </FormControl>
              <FormDescription>
                Agent's password. (keep empty for default)
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
              <FormLabel>Agent Role</FormLabel>
              <FormControl>
                <Input placeholder="Role..." {...field} />
              </FormControl>
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
