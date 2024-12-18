"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { sendBulkEmails } from "@/app/actions/email-actions";

const formSchema = z.object({
  file: z.instanceof(File),
  voucherId: z.string(),
});

export default function BulkEmailPage() {
  const [emails, setEmails] = useState<string[]>([]);
  const [vouchers, setVouchers] = useState([
    { id: "1", code: "SUMMER20", description: "20% off on summer bookings" },
    {
      id: "2",
      code: "WEEKEND3",
      description: "3rd night free on weekend stays",
    },
    { id: "3", code: "DINING15", description: "15% off at our restaurants" },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      form.setValue("file", selectedFile);
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const selectedVoucher = vouchers.find((v) => v.id === values.voucherId);
      if (!selectedVoucher) {
        throw new Error("Selected voucher not found");
      }
      await sendBulkEmails(emails, values.voucherId, {
        code: selectedVoucher.code,
        description: selectedVoucher.description,
      });
      toast.success("Bulk invitation emails sent successfully");
    } catch (error) {
      toast.error("Failed to send bulk invitation emails");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Send Bulk Invitation Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Excel or CSV file</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="voucherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Invitation Voucher</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a voucher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vouchers.map((voucher) => (
                          <SelectItem key={voucher.id} value={voucher.id}>
                            {voucher.code} - {voucher.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h3 className="font-semibold mb-2">Extracted Emails:</h3>
                <ul className="list-disc pl-5">
                  {emails.slice(0, 5).map((email, index) => (
                    <li key={index}>{email}</li>
                  ))}
                  {emails.length > 5 && (
                    <li>...and {emails.length - 5} more</li>
                  )}
                </ul>
              </div>

              <Button type="submit" disabled={emails.length === 0}>
                Send Bulk Invitation Emails
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
