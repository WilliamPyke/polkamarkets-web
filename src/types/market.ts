export type MarketState = 'open' | 'closed' | 'resolved';

export type News = {
  source: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
};

export type Comment = {
  id: number;
  body: string;
  timestamp: number;
  user: {
    username: string;
    avatar: string | null;
  };
};
