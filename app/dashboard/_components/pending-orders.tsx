import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pendingOrders = [
  {
    id: "1",
    agentId: "A001",
    amount: 100,
    date: "2023-04-01",
  },
  {
    id: "2",
    agentId: "A002",
    amount: 200,
    date: "2023-04-02",
  },
  {
    id: "3",
    agentId: "A003",
    amount: 150,
    date: "2023-04-03",
  },
  {
    id: "4",
    agentId: "A004",
    amount: 300,
    date: "2023-04-04",
  },
  {
    id: "5",
    agentId: "A005",
    amount: 250,
    date: "2023-04-05",
  },
];

export function PendingOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Agent ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pendingOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.agentId}</TableCell>
            <TableCell>${order.amount}</TableCell>
            <TableCell>{order.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
