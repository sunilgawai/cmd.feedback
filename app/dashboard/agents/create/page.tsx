"use client";
import CreateAgentForm from "@/components/forms/create-agent-form";
import { Button } from "@/components/ui/button";
import { Backpack, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

const AgentCreatePage = () => {
  const router = useRouter();
  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
          <Button onClick={() => router.back()}>
            <RiArrowGoBackLine className="mr-2 h-4 w-4" />
            Back to Agents
          </Button>
      </div>
      <CreateAgentForm />
    </div>
  );
};

export default AgentCreatePage;
