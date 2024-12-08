import { getAgentById } from "@/app/actions/agent-action";
import AgentForm from "@/components/forms/customer-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
}

const AgentCreatePage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
  const mode = searchParams.mode as "create" | "edit";
  const agentId = parseInt(searchParams.id as string);
  console.log({ params, searchParams, slug, query, mode });

  let agent;
  if (agentId) {
    agent = await getAgentById(agentId);
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <Link href="/dashboard/agents">
          <Button>
            <RiArrowGoBackLine className="mr-2 h-4 w-4" />
            Back to Agents
          </Button>
        </Link>
      </div>
      <AgentForm mode={mode} id={agentId} agentData={agent} />
    </div>
  );
};

export default AgentCreatePage;
