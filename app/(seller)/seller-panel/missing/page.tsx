import React from "react";
import { Delete, View } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddMissingDialog } from "./add-missing-dialog";
import Link from "next/link";

const notifications = [
  {
    title: "Missing ID:",
    description: "XXXNNNDXX",
  },
  {
    title: "Missing Date:",
    description: "30/09/2001",
  },
  {
    title: "Missing Price:",
    description: "$4000",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function MissingCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Missings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button variant="outline" size="icon" className="w-full">
          <View /> View
        </Button>
        <Button variant="destructive" size="icon" className="w-full">
          <Delete /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

const Missing = () => {
  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <Link href="/seller-panel">
          <Button>Go Back</Button>
        </Link>
        <AddMissingDialog />
      </div>
      {/* <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Missings</h1>
        <AddMissingDialog />
      </div> */}
      <div className="grid grid-cols-3 gap-4">
        <MissingCard />
        <MissingCard />
        <MissingCard />
        <MissingCard />
      </div>
    </div>
  );
};

export default Missing;
