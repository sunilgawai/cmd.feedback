import { getCustomerById } from "@/app/actions";
import CustomerForm from "@/components/forms/customer-form";
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

const CustomerCreatePage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
  const mode = searchParams.mode as "create" | "edit";
  const customerId = searchParams.id as string;
  console.log({ params, searchParams, slug, query, mode });

  let customer;
  if (customerId) {
    customer = await getCustomerById(customerId);
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <Link href="/dashboard/customers">
          <Button>
            <RiArrowGoBackLine className="mr-2 h-4 w-4" />
            Back to Customers
          </Button>
        </Link>
      </div>
      <CustomerForm mode={mode} id={customerId} customerData={customer} />
    </div>
  );
};

export default CustomerCreatePage;
