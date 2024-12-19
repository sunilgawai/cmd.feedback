"use client";

import FirstUserForm from "@/components/forms/first-user-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { submitFirstForm } from "@/app/actions";
import { useRouter } from "next/navigation";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const formSchema = z.object({
  name: z.string().max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  whatsapp: z.string().optional(),
  location: z.string().optional(),
});

const LoginModal = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      location:""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await submitFirstForm(
        values as { name: string; email: string; phone: string; whatsapp?: string }
      );
      toast("Success", {
        description: "Onboarding success. Please check your emails.",
        action: {
          label: "close",
          onClick: () => console.log("close clicked"),
        },
      });
      form.reset({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        location: "",
      });
      window.location.replace("/feedback");
    } catch (error: any) {
      console.error("Form submission error", error);
      toast(error?.message || "Please Try Again Later", {
        cancel: {
          label: "Cancel",
          onClick: () => {
            console.log("cancel clicked");
            form.reset({
              name: "",
              email: "",
              phone: "",
              whatsapp: "",
              location: "",
            });
          },
        },
      });
    }
  }

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Become a member</DialogTitle>
          <DialogDescription>
            Please fill in the form to recieve voucher details through email.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full  mx-auto py-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john x. doe" type="text" {...field} />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Whatsapp No.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter whatsapp number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please select a location.</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select location..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Colaba">Colaba</SelectItem>
                      <SelectItem value="weekly">Jogeshwari</SelectItem>
                      <SelectItem value="Bandra">Bandra</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="w-full" type="submit">Register</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
