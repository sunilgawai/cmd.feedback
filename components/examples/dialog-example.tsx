"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";

export function DialogExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Action confirmed!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmDialog
      title="Delete Item"
      description="Are you sure you want to delete this item? This action cannot be undone."
      onConfirm={handleConfirm}
      variant="destructive"
      loading={isLoading}
    />
  );
}
