import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const agentScores = [
  {
    id: "A001",
    name: "John Doe",
    score: 95,
    completedOrders: 100,
    canceledOrders: 2,
  },
  {
    id: "A002",
    name: "Jane Smith",
    score: 88,
    completedOrders: 80,
    canceledOrders: 5,
  },
  {
    id: "A003",
    name: "Bob Johnson",
    score: 92,
    completedOrders: 90,
    canceledOrders: 3,
  },
  {
    id: "A004",
    name: "Alice Brown",
    score: 97,
    completedOrders: 110,
    canceledOrders: 1,
  },
  {
    id: "A005",
    name: "Charlie Davis",
    score: 85,
    completedOrders: 75,
    canceledOrders: 7,
  },
];

export function AgentScores() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Completed Orders</TableHead>
          <TableHead>Canceled Orders</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agentScores.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>{agent.id}</TableCell>
            <TableCell>{agent.name}</TableCell>
            <TableCell>{agent.score}</TableCell>
            <TableCell>{agent.completedOrders}</TableCell>
            <TableCell>{agent.canceledOrders}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
