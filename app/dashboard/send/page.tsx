"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  createBulkEmailJob,
  getBulkEmailJobStatus,
  parseFileAndSendEmails,
} from "@/app/actions/email-actions";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { auth } from "@/app/auth";

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
        // console.log("extractedEmails", extractedEmails);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Create background job
      const createdJobId = await createBulkEmailJob(emails);
      setJobId(createdJobId);
      const result = await parseFileAndSendEmails(emails);
      console.log("result", result);
      setMessage(result.message);
      if (result.success) {
        toast.success("Emails sent successfully");
      }
      // Optional: Start polling for job status
      pollJobStatus(createdJobId);
    } catch (error) {
      setMessage("An error occurred while sending emails");
      toast.error("Error sending emails");
      console.log("Error sending emails", error);
    } finally {
      setIsLoading(false);
    }
  };

  const pollJobStatus = async (jobId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const status = await getBulkEmailJobStatus(jobId);
        setJobStatus(status);

        // Stop polling if job is completed
        if (status.status === "COMPLETED" || status.status === "FAILED") {
          clearInterval(intervalId);
        }
      } catch (error) {
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
