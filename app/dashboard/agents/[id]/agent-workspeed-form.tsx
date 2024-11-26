"use client";

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
import { AgentWorkSpeedSlider } from "./agent-work-speed-slider";
import { toast } from "sonner";

const FormSchema = z.object({
  workSpeed: z.number().min(0).max(100),
});

export function AgentWorkSpeedForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workSpeed: 50,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log("data", data);
    toast.success("updated speed successfully");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="workSpeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Work Speed</FormLabel>
              <AgentWorkSpeedSlider
                value={field.value}
                onChange={field.onChange}
              />
              <FormDescription>
                Adjust the work percentage given to the agent.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
