import type { Tournament } from './tournament';

export type Land = {
  id: number;
  slug: string;
  title: string;
  description: string;
  bannerUrl: string | null;
  tournaments: Omit<Tournament, 'group'>[];
};
