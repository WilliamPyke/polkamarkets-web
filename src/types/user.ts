export type UserOperation = {
  userOperationHash: string;
  status: 'success' | 'failed' | 'pending';
  transactionHash: string | null;
  action: 'buy' | 'sell' | 'claim';
  marketTitle: string;
  marketSlug: string;
  outcomeTitle: string;
  imageUrl: string;
  shares: number;
  value: number;
  timestamp: number;
  ticker: string;
};
