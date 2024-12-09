"use client";
import { Button } from "@/components/ui/button";
import AlertModel from "@/components/alert-model";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { prisma } from "@/lib/prisma";

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
      await prisma.user.delete({where: {id: data.id}})
      setOpen(false);
      router.push("/dashboard/customer");
    } catch(e:any){
      setLoading(true);
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
      <Button variant="destructive" size="sm">
        <Trash className="mr-1 h-4 w-4" /> Delete
      </Button>
    </>
  );
};
