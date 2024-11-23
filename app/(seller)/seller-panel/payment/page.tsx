import React from "react";
import { UpiCard } from "./upi-card";
import { AddUpiDialog } from "./add-upi-dialog";

const PaymentsPage = () => {
  return (
    <div className="container">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Agents</h1>
        <AddUpiDialog />
      </div>
      <div className="grid grid-cols-3">
        <UpiCard />
        <UpiCard />
        <UpiCard />
      </div>
    </div>
  );
};

export default PaymentsPage;
