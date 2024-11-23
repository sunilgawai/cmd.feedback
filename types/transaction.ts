export interface Transaction {
  id: number;
  userId: string;
  agentId: string;
  transactionType: string;
  amount: number;
  status: string;
  timestamp: Date;
}
