"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { saveLoyaltyForm } from "@/app/actions";

const formSchema = z.object({
  name: z.string().max(100),
  cafe_visits: z.string().max(100),
  preffered_visit_time: z.string(),
  usually_ordered: z.string(),
  average_bill_value: z.string(),
  part_of_any_other_proggram: z.string(),
  like_to_earn_reward_points: z.string(),
  how_important: z.string(),
  prefer_earning_cashback: z.string(),
  interested_in_membership: z.string(),
  will_participate: z.string(),
  prefer_subscription: z.string(),
  like_personalized_recommendations: z.string(),
  interested_in_gifting: z.string(),
  prefer_notifications: z.string(),
  value_experiences: z.string(),
  current_wallet: z.string(),
  flexibility_to_preload: z.string(),
  prefer_cashback: z.string(),
  wanted_feature: z.string().optional(),
  want_to_pay_anis_club: z.string(),
});

export default function LoyaltyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <>
          <pre>
            <strong>Loyalty Form Submission:</strong>
            <br />
            <br />
            {Object.entries(values).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </pre>
        </>
      );
      await saveLoyaltyForm(values as any);
      toast("Success", {
        description: "Feedback Taken. Please check your emails.",
        action: {
          label: "close",
          onClick: () => console.log("close clicked"),
        },
      });
      form.reset();
      window.location.replace("/home");
    } catch (error: any) {
      console.error("Form submission error", error);
      toast(error?.message || "Please Try Again Later", {
        cancel: {
          label: "Cancel",
          onClick: () => {
            console.log("cancel clicked");
            form.reset();
          },
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto"
      >
        <Card className="border-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Please tell us about you</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your name?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your name"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cafe_visits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How often do you visit this café? (e.g., daily, weekly,
                    occasionally)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How often do you visit this café?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preffered_visit_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What is your preferred time to visit the café?{" "}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="usually_ordered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you usually order at the café? </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="coffe">coffe</SelectItem>
                      <SelectItem value="tea">tea</SelectItem>
                      <SelectItem value="pizza">pizza</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="average_bill_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your average bill value</FormLabel>
                  <FormControl>
                    <Input placeholder="average bill" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="part_of_any_other_proggram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are you a part of any other loyalty programs?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle>Engagement and Preferences</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="like_to_earn_reward_points"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-start">
                  <FormLabel>
                    Would you like to earn rewards points every time you visit
                    or purchase something from the café?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="how_important"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How important are discounts and offers in deciding where to
                    dine or grab coffee?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="how important ?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="very much">very much</SelectItem>
                      <SelectItem value="a little">a little</SelectItem>
                      <SelectItem value="so much">so much</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prefer_earning_cashback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you prefer earning cashback in a wallet or collecting
                    points for future redemptions?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interested_in_membership"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are you interested in exclusive member benefits such as
                    priority service or special menus?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="will_participate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you participate in limited-time offers or challenges
                    to earn additional rewards?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle>Loyalty Program Features</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="prefer_subscription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you prefer a subscription-based model for your regular
                    café visits (e.g., daily coffee or snacks)?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="like_personalized_recommendations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you like to receive personalized recommendations or
                    offers based on your order history?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interested_in_gifting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are you interested in gifting or sharing wallet credits with
                    friends or family?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prefer_notifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you prefer notifications via email, SMS, or a mobile
                    app about your rewards and offers?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value_experiences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Do you value experiences like invites to special Star Anise
                    events eg; barista workshops?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle>Payment and Wallet</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="current_wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Do you currently use digital wallets or payment apps? If
                    yes, which ones?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="current wallet?"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>enter your current wallet </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flexibility_to_preload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Would you like the flexibility to preload your wallet and
                    get extra credits for doing so?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prefer_cashback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Do you prefer Cashback wallet points, Gaming prizes like
                    Spin a wheel/ scratch card or Direct Discounts.
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wanted_feature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are there any specific features you’d like to see in a café
                    loyalty program?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="specific features you’d like to see"
                      type=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="want_to_pay_anis_club"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Will you want to pay a Rs1000 Star Anise Club Saver
                    subscription fees and get a flat 15% waver on your bill.{" "}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button className="w-full justify-center" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
