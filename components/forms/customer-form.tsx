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
import { CloudUpload, Paperclip } from "lucide-react";
import { updateCustomerData } from "@/app/actions";
// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem,
// } from "@/components/ui/file-upload";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  // image: z.string().optional(),
});

type CreateAgentFormProps = {
  mode?: "create" | "edit";
  id?: string;
  customerData?: any;
  // customerData?: Partial<AgentFormValues>;
};
export default function CustomerForm({
  mode,
  id,
  customerData,
}: CreateAgentFormProps) {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: customerData || {
      name: "",
      email: "",
      phoneNumber: null,
      // image: "",
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await updateCustomerData({ id, ...values } as {
        id: string;
        name: string;
        email: string;
        phoneNumber?: string;
      });
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      toast.success("data updated")
      window.location.replace("/dashboard/customers");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="customer name" type="text" {...field} />
              </FormControl>

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
              <FormDescription>
                it will be used as customer's username
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input placeholder="phone no." type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
