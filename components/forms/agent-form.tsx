"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Agent } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import { registerAgent, editAgent } from "@/app/actions/agent-action";

const RoleEnum = z.enum([
  "AGENT",
  "SUPER_ADMIN",
  "SELLER_AGENT",
  "WITHDRAWER_AGENT",
]);

const agentFormSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters.")
    .max(225, "Username must be less than 225 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(255, "Password must be less than 255 characters."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters.")
    .max(255, "Phone number must be less than 255 characters."),
  commision_rate: z.number().min(0).max(100).optional(),
  role: RoleEnum,
  contactNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters.")
    .max(255, "Phone number must be less than 255 characters.")
    .optional(),
  adminCommission: z.number().int().optional(),
  upiId: z.string().optional(),
  binanceId: z.string().optional(),
  walletId: z.string().optional(),
  walletBalance: z.number(),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

type CreateAgentFormProps = {
  mode?: "create" | "edit";
  id?: number;
  agentData?: Agent;
  // agentData?: Partial<AgentFormValues>;
};

const AgentForm = ({
  mode = "create",
  id = 99999999,
  agentData = {},
}: CreateAgentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  console.log("agentData", agentData);

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      username: "",
      password: "",
      phone: "",
      commision_rate: 0,
      role: "AGENT",
      walletBalance: 0,
      adminCommission: 0,
      binanceId: "",
      contactNumber: "",
      upiId: "",
      walletId: "",
    },
  });

  async function onSubmit(data: AgentFormValues) {
    setIsLoading(true);
    try {
      if (mode === "create") {
        const response = await registerAgent(data);
        console.log("response", response);
        if (!response) {
          throw new Error("Failed to create agent");
        }
      } else {
        const response = await editAgent({ ...data, id });
        console.log("response", response);
        if (!response) {
          throw new Error("Failed to update agent");
        }
      }
      toast.success("completed successfully successfully");
      form.reset();
      router.push(`/dashboard/agents`);
      router.refresh();
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
    try {
      console.log("Agent data", data);
      // if (mode === "create") {
      //   const response = await registerAgent(data);
      //   if (!response) {
      //     throw new Error("Failed to create agent");
      //   }
      //   toast.success("Agent added successfully");
      // } else {
      //   const response = await editAgent({ ...data, id });
      //   if (!response) {
      //     throw new Error("Failed to edit agent");
      //   }
      //   toast.success("Agent updated successfully");
      // }
      // form.reset();
      // router.push(`/dashboard/agents`);
      // router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className=" grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commision_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commission Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Commission rate"
                    // {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RoleEnum.options.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Contact number"
                    // {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adminCommission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Commission</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Admin commission"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <Input placeholder="UPI ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="binanceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Binance ID</FormLabel>
                <FormControl>
                  <Input placeholder="Binance ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingButton type="submit" loading={isLoading}>
          {mode === "create" ? "Create Agent" : "Update Agent"}
        </LoadingButton>
      </form>
    </Form>
  );
};

export default AgentForm;
