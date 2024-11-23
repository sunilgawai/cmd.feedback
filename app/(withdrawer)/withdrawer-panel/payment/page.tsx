import React from "react";
import { PaymentCard } from "./payment-card";
import { AddPaymentDialog } from "./add-payment-dialog";

const PaymentsPage = () => {
  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Agents</h1>
        <AddPaymentDialog />
      </div>
      <div className="grid grid-cols-3">
        <PaymentCard />
        <PaymentCard />
        <PaymentCard />
      </div>
    </div>
  );
};

export default PaymentsPage;
