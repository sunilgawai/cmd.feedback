"use client";
import { Button } from "@/components/ui/button";
import AlertModel from "@/components/alert-model";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {deleteVoucher} from "@/app/actions";

interface DeleteActionProps {
  data: any;
}

export const DeleteAction: React.FC<DeleteActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true);
    try {
      // Implement your delete logic here
      // Example: await axios.delete(`/api/posts/${data.id}`);
      const result = await deleteVoucher(data.id);
      if (result) {
        toast("Success", {
          description: "Delete successfully",
          action: {
            label: "close",
            onClick: () => console.log("close clicked"),
          },
        });
        router.push("/dashboard/vouchers");
        return;
      }
      throw new Error("Operation failed");
    } catch (error) {
      setLoading(false);
      setOpen(false);
      toast(error?.message || "Please Try Again Later", {
        dismissible: true,
        closeButton: true,
      });
    }
  };

  return (
    <>
      <AlertModel
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button onClick={() => setOpen(true)} variant="destructive" size="sm">
        <Trash className="mr-1 h-4 w-4" /> Delete
      </Button>
    </>
  );
};
