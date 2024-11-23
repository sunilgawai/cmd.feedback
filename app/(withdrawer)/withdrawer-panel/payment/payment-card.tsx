import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function PaymentCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="font-semibold text-lg">Network: sunilgawai@upi</CardTitle>
        <CardTitle className="font-semibold text-lg">Binance ID: Sunil Gawai</CardTitle>
      </CardHeader>
    </Card>
  );
}
