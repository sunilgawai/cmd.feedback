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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
  "SUPERADMIN",
  "SELLER_AGENT",
  "WITHDRAW_AGENT",
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
  contactNumber: z.bigint().optional(),
  adminCommission: z.number().int().optional(),
  upiId: z.string().optional(),
  isNewAccount: z.boolean(),
  assignAdmin: z.string().optional(),
  status: z.boolean(),
  binanceId: z.string().optional(),
  referUsers: z.string().optional(),
  walletId: z.string().optional(),
  walletBalance: z.number(),
  distributedAmount: z.number(),
  todayDistributedAmount: z.number(),
  todayTotalRequest: z.number().int(),
  todayTotalAcceptTime: z.number().int(),
  todayAverageAcceptTime: z.number().optional(),
  todayPositivePoints: z.number().int(),
  todayNegativePoints: z.number().int(),
  totalRequest: z.number().int(),
  totalAcceptTime: z.number().int(),
  averageAcceptTime: z.number().optional(),
  positivePoints: z.number().int(),
  negativePoints: z.number().int(),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

type CreateAgentFormProps = {
  mode?: "create" | "edit";
  id?: number;
  initialData?: Partial<AgentFormValues>;
};

const AgentForm = ({
  mode = "create",
  id = 99999999,
  initialData = {},
}: CreateAgentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      username: "",
      password: "",
      phone: "",
      commision_rate: 0,
      role: "AGENT",
      isNewAccount: false,
      status: true,
      walletBalance: 0,
      distributedAmount: 0,
      todayDistributedAmount: 0,
      todayTotalRequest: 0,
      todayTotalAcceptTime: 0,
      todayPositivePoints: 0,
      todayNegativePoints: 0,
      totalRequest: 0,
      totalAcceptTime: 0,
      positivePoints: 0,
      negativePoints: 0,
      ...initialData,
    },
  });

  async function onSubmit(data: AgentFormValues) {
    setIsLoading(true);
    try {
      if (mode === "create") {
        const response = await registerAgent(data);
        if (!response) {
          throw new Error("Failed to create agent");
        }
        toast.success("Agent added successfully");
      } else {
        const response = await editAgent({ ...data, id });
        if (!response) {
          throw new Error("Failed to edit agent");
        }
        toast.success("Agent updated successfully");
      }
      form.reset();
      router.push(`/dashboard/agents`);
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
        <div className="grid grid-cols-2 gap-4">
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
                    {...field}
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
                    {...field}
                    onChange={(e) => field.onChange(BigInt(e.target.value))}
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
            name="isNewAccount"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">New Account</FormLabel>
                  <FormDescription>Is this a new account?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignAdmin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign Admin</FormLabel>
                <FormControl>
                  <Input placeholder="Assign admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Status</FormLabel>
                  <FormDescription>Is this account active?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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
          <FormField
            control={form.control}
            name="referUsers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refer Users</FormLabel>
                <FormControl>
                  <Input placeholder="Refer users" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="walletId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet ID</FormLabel>
                <FormControl>
                  <Input placeholder="Wallet ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="walletBalance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Balance</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Wallet balance"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distributedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distributed Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Distributed amount"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="todayDistributedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Today's Distributed Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Today's distributed amount"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="todayTotalRequest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Today's Total Requests</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Today's total requests"
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
            name="todayTotalAcceptTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Today's Total Accept Time</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Today's total accept time"
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
            name="todayAverageAcceptTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Today's Average Accept Time</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Today's average accept time"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="todayPositivePoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Today's Positive Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Today's positive points"
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
            name="todayNegativePoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Today's Negative Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Today's negative points"
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
            name="totalRequest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Requests</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Total requests"
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
            name="totalAcceptTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Accept Time</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Total accept time"
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
            name="averageAcceptTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Accept Time</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Average accept time"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="positivePoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Positive Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Positive points"
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
            name="negativePoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Negative Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Negative points"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
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
