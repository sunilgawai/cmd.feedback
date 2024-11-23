import { Order } from "@/types/order";

const dummyOrders: Order[] = [
  {
    id: 1,
    agentId: "1",
    userId: "user1",
    type: "REGULAR",
    amount: 100,
    status: "ACTIVE",
    createdAt: new Date("2023-11-23T07:00:00Z"),
  },
  {
    id: 2,
    agentId: "1",
    userId: "user2",
    type: "SUPER_ADMIN",
    amount: 500,
    status: "PENDING",
    createdAt: new Date("2023-11-23T08:30:00Z"),
  },
  {
    id: 3,
    agentId: "1",
    userId: "user3",
    type: "REGULAR",
    amount: 250,
    status: "COMPLETED",
    createdAt: new Date("2023-11-23T10:15:00Z"),
  },
  {
    id: 4,
    agentId: "1",
    userId: "user1",
    type: "REGULAR",
    amount: 150,
    status: "ACTIVE",
    createdAt: new Date("2023-11-23T12:45:00Z"),
  },
  {
    id: 5,
    agentId: "1",
    userId: "user4",
    type: "SUPER_ADMIN",
    amount: 1000,
    status: "PENDING",
    createdAt: new Date("2023-11-23T14:30:00Z"),
  },
];

export async function getAgentOrders(agentId: string): Promise<Order[]> {
  return dummyOrders.filter((o) => o.agentId === agentId);
}
