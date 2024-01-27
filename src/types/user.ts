export type UserOperation = {
  imageUrl: string | null;
  marketSlug: string;
  marketTitle: string;
  outcomeTitle: string;
  shares: number | null;
  status: 'success' | 'failed' | 'pending';
  action: 'buy' | 'sell';
  ticker: string;
  timestamp: number;
  transactionHash: string | null;
  user: string;
  userOperationHash: string;
  value: number;
};
