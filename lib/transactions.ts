import { Transaction } from "@/types/transaction";

const dummyTransactions: Transaction[] = [
  {
    id: 1,
    userId: "user1",
    agentId: "1",
    transactionType: "DEPOSIT",
    amount: 1000,
    status: "COMPLETED",
    timestamp: new Date("2023-11-23T08:00:00Z"),
  },
  {
    id: 2,
    userId: "user2",
    agentId: "1",
    transactionType: "WITHDRAWAL",
    amount: 500,
    status: "PENDING",
    timestamp: new Date("2023-11-23T09:30:00Z"),
  },
  {
    id: 3,
    userId: "user3",
    agentId: "1",
    transactionType: "DEPOSIT",
    amount: 750,
    status: "COMPLETED",
    timestamp: new Date("2023-11-23T11:15:00Z"),
  },
  {
    id: 4,
    userId: "user1",
    agentId: "1",
    transactionType: "WITHDRAWAL",
    amount: 250,
    status: "COMPLETED",
    timestamp: new Date("2023-11-23T14:45:00Z"),
  },
  {
    id: 5,
    userId: "user4",
    agentId: "1",
    transactionType: "DEPOSIT",
    amount: 1500,
    status: "FAILED",
    timestamp: new Date("2023-11-23T16:30:00Z"),
  },
];

export async function getAgentTransactions(
  agentId: string
): Promise<Transaction[]> {
  return dummyTransactions.filter((t) => t.agentId === agentId);
}
