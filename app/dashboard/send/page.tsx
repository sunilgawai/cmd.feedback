"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

const SendEmailsPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const extractedEmails = jsonData
          .map((row: any) => row.Email)
          .filter((email: string | undefined) => email && email.trim() !== "");

        setEmails(extractedEmails);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleJobs = async (emails: string[]) => {
    // Create background job
    try {
      const response = await fetch("/api/email/create-bulk-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails }),
      });
      const { jobId: createdJobId, message } = await response.json();
      toast.success(message);
      console.table({ job: jobId });
      setJobId(createdJobId);
      pollJobStatus(createdJobId);
    } catch (err) {
      toast.error("Error creating jon");
      console.error("JOBS ERROR", err);
      return;
    }
  };

  const handleEmailSending = async (emails: string[]) => {
    try {
      const sendResponse = await fetch("/api/email/parse-and-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails }),
      });
      const result = await sendResponse.json();
      console.table({ result: result });

      setMessage(result.message);
      if (result.success) {
        toast.success("Emails sent successfully");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while sending emails");
      toast.error("Error sending emails");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);

    await handleJobs(emails);

    await handleEmailSending(emails);

    setIsLoading(false);
  };

  const pollJobStatus = async (jobId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/email/job-status?jobId=${jobId}`
        );
        const status = await response.json();
        console.log("status", status);
        setJobStatus(status);

        // Stop polling if job is completed
        if (status.status === "COMPLETED" || status.status === "FAILED") {
          clearInterval(intervalId);
        }
      } catch (error) {
        toast.error("Error Fetching Job Status");
        console.error(error);
        clearInterval(intervalId);
        toast.error("Error fetching job status");
      }
    }, 5000); // Poll every 5 seconds
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Send Emails</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        {emails.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Imported Emails:</h2>
            <ul className="list-disc pl-5 max-h-64 overflow-y-auto">
              {emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" disabled={!file || isLoading}>
          {isLoading ? "Sending..." : "Send Emails"}
        </Button>
      </form>

      {jobId && (
        <div>
          <h2>Job Status</h2>
          <p>Total Emails: {jobStatus?.totalEmails}</p>
          <p>Sent Emails: {jobStatus?.sentEmails}</p>
          <p>Failed Emails: {jobStatus?.failedEmails}</p>
          <p>Status: {jobStatus?.status}</p>
        </div>
      )}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default SendEmailsPage;
