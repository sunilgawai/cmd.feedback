"use client";
import AgentForm from "@/components/forms/agent-form";
import { Button } from "@/components/ui/button";
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
      <AgentForm />
      {/* <CreateAgentForm /> */}
    </div>
  );
};

export default AgentCreatePage;
