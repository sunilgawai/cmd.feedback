"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ComponentExampleProps {
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function ComponentExample({
  title,
  description,
  icon,
  children,
}: ComponentExampleProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
