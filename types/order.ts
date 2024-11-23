export interface Order {
  id: number;
  agentId: string;
  userId: string;
  type: string;
  amount: number;
  status: string;
  createdAt: Date;
}
