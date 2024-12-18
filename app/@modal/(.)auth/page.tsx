"use client";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().max(100),
});

const LoginModal = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Manage dialog state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        toast("Success", {
          description: "Login successful.",
        });
        form.reset();
        setIsDialogOpen(false); // Close dialog after successful login
        router.push("/home"); // Redirect to home page
      }
    } catch (error: any) {
      console.error("Login error", error);
      toast(error?.message || "Login failed. Please try again.", {
        description: "Either password or email is wrong.",
      });
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (isDialogOpen) {
            router.back(); // Go back only if manually closed
          }
          setIsDialogOpen(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-[385px]">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome Back</DialogTitle>
          <DialogDescription className="text-center">
            Please fill in the form to login.
          </DialogDescription>
        </DialogHeader>
        <Image
          height={80}
          width={100}
          className="w-40 md:w-36 h-auto mx-auto"
          src="/logo_black.png"
          alt="logo"
          priority
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full mx-auto py-6"
          >
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password..."
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="w-full flex flex-col items-center justify-center">
              <Button className="w-full" type="submit">
                Login
              </Button>
              <Button className="w-full" asChild>
                <Link href="/onboard">Register</Link>
              </Button>
            </DialogFooter>
          </form>
          <div className="flex items-center justify-between gap-4 px-2">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              href="/forgot-email"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Email?
            </Link>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
