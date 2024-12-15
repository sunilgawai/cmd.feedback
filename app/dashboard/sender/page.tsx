"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function EmailSenderForm() {
  const [emails, setEmails] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate inputs
    const emailList = emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    if (emailList.length === 0 || !subject || !body) {
      toast.error("Validation error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails: emailList,
          subject,
          body,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message)
        // Clear form after successful submission
        setEmails("");
        setSubject("");
        setBody("");
      } else {
        toast.error("erro")
      }
    } catch (error) {
      toast.error("erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send Bulk Emails</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="emails" className="block mb-2">
              Email Addresses (comma-separated)
            </label>
            <Input
              id="emails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="Enter emails separated by commas"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2">
              Subject
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email Subject"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="body" className="block mb-2">
              Email Body
            </label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter email content"
              disabled={isLoading}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Emails"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
