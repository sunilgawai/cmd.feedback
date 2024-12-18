import { Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyVouchers = [
  {
    id: "1",
    code: "SUMMER20",
    description: "20% off on summer bookings",
    validFrom: "2023-06-01",
    validTo: "2023-08-31",
  },
  {
    id: "2",
    title: "WEEKEND3",
    description: "3rd night free on weekend stays",
    validFrom: "2023-07-01",
    validTo: "2023-12-31",
  },
  {
    id: "3",
    title: "DINING15",
    description: "15% off at our restaurants",
    validFrom: "2023-06-15",
    validTo: "2023-09-30",
  },
];

export default function VouchersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">My Vouchers</h1>
      <div className="space-y-4">
        {dummyVouchers.map((voucher) => (
          <Card key={voucher.id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                {voucher.code}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{voucher.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                Valid from {new Date(voucher.validFrom).toLocaleDateString()} to{" "}
                {new Date(voucher.validTo).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
