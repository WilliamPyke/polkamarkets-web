import { Market } from 'models/market';

export type TournamentGroup = {
  id: number;
  slug: string;
  title: string;
  description: string;
  position: number;
};

export type Tournament = {
  id: number;
  networkId: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string | null;
  markets?: Pick<Market, 'id' | 'title' | 'imageUrl' | 'slug'>[];
  group: TournamentGroup | null;
};
