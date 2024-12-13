"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

interface ExportDialogProps {
  data: any; // Replace 'any' with your actual loyalty data type
}

export function ExportDialog({ data }: ExportDialogProps) {
  const [open, setOpen] = useState(false);

  let export_data = [];
  if (typeof data === "object") {
    export_data = [data];
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(export_data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Loyalty Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(dataBlob, "loyalty_data.xlsx");
  };

  const exportToCSV = () => {
    const headers = Object.keys(data).join(",");
    const values = Object.values(data).join(",");
    const csvContent = `${headers}\n${values}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    FileSaver.saveAs(blob, "loyalty_data.csv");
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    FileSaver.saveAs(blob, "loyalty_data.json");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Loyalty Data</DialogTitle>
          <DialogDescription>
            Choose a format to export your loyalty data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={exportToExcel}>Export to Excel</Button>
          <Button onClick={exportToCSV}>Export to CSV</Button>
          <Button onClick={exportToJSON}>Export to JSON</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
