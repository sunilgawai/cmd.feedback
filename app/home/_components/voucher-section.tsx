import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// This would typically come from an API or database
const vouchers = [
  { id: 1, code: "SUMMER10", discount: "10%" },
  { id: 2, code: "FREESHIP", discount: "Free Shipping" },
];

export function VoucherSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Vouchers</CardTitle>
        <CardDescription>Your available discount vouchers</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {vouchers.map((voucher) => (
            <li
              key={voucher.id}
              className="flex justify-between items-center bg-muted p-2 rounded"
            >
              <span className="font-medium">{voucher.code}</span>
              <span>{voucher.discount}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
