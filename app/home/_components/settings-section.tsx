"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function SettingsSection() {
  const { toast } = useToast();

  const handleChangePassword = () => {
    // Here you would typically navigate to a change password page or open a modal
    console.log("Navigating to change password page");
    toast({
      title: "Change Password",
      description: "Navigating to change password page...",
    });
  };

  const handleContactSupport = () => {
    // Here you would typically open a support chat or navigate to a contact page
    console.log("Opening support chat");
    toast({
      title: "Contact Support",
      description: "Opening support chat...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleChangePassword}
          variant="outline"
          className="w-full"
        >
          Change Password
        </Button>
        <Button
          onClick={handleContactSupport}
          variant="outline"
          className="w-full"
        >
          Contact Support
        </Button>
      </CardContent>
    </Card>
  );
}
