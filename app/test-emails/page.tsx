'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestEmailsPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sendTestEmail = async (type: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/test-emails?type=${type}&email=${email}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error sending test email:', error);
      setResult({ error: 'Failed to send email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Test Emails</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Enter test email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-4">
            <Button
              onClick={() => sendTestEmail('welcome')}
              disabled={loading || !email}
            >
              Test Welcome Email
            </Button>
            <Button
              onClick={() => sendTestEmail('subscription')}
              disabled={loading || !email}
            >
              Test Subscription Email
            </Button>
          </div>
          {result && (
            <pre className="mt-4 p-4 bg-gray-100 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
