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
const formSchema = z.object({
  name: z.string().max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  wing: z.string().optional(),
});

const LoginModal = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      wing: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await submitFirstForm(
        values as { name: string; email: string; phone: string; wing?: string }
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
        wing: "",
      });
      window.location.replace("/home");
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
              wing: "",
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
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Please fill in the form to create an account
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
                  <FormDescription>
                    it will be used as you username
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
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter phone number "
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    please enter your phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's app no.</FormLabel>
                  <FormControl>
                    <Input placeholder="whats app number" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your whats app number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Account</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
