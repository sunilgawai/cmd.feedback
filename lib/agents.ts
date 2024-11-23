import { Agent } from "@/types/agent";

const dummyAgents: Agent[] = [
  {
    id: "1",
    username: "agent007",
    phone: "1234567890",
    password: "hashedpassword",
    lastlogin: new Date("2023-11-23T10:30:00Z"),
    commision_rate: 5,
    role: "AGENT",
    contactNumber: BigInt("9876543210"),
    adminCommission: 2,
    upiId: "agent007@upi",
    isNewAccount: false,
    assignAdmin: "admin1",
    status: true,
    deleted: false,
    mysteryBoxPoint: 100,
    isOnline: true,
    binanceId: "BINANCE123",
    referUsers: "user1,user2",
    walletId: "WALLET123",
    walletBalance: 5000,
    distributedAmount: 10000,
    todayDistributedAmount: 500,
    todayTotalRequest: 20,
    todayTotalAcceptTime: 600,
    todayAverageAcceptTime: 30,
    todayPositivePoints: 15,
    todayNegativePoints: 2,
    totalRequest: 500,
    totalAcceptTime: 15000,
    averageAcceptTime: 30,
    positivePoints: 450,
    negativePoints: 50,
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2023-11-23T12:00:00Z"),
  },
  // Add more dummy agents here if needed
];

export async function getAgentById(id: string): Promise<Agent | null> {
  const agent = dummyAgents.find((a) => a.id === id);
  return agent || null;
}
