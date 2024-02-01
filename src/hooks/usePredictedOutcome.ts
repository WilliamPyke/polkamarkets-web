import { useCallback } from 'react';

import { features } from 'config';
import type { Market, Outcome } from 'models/market';

import useAppSelector from 'hooks/useAppSelector';

type Outcomes = Record<number, Record<'shares' | 'price', number>>;

export default function usePredictedOutcome() {
  const isLoading = useAppSelector(
    state => state.polkamarkets.isLoading.portfolio
  );
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);

  return useCallback(
    ({ id, outcomes }: Pick<Market, 'outcomes' | 'id'>) => {
      if (isLoading || !portfolio?.[id]?.outcomes || !features.fantasy.enabled)
        return null;

      return Object.entries(portfolio[id].outcomes as Outcomes).reduce(
        (acc, [outcome, { shares }]) =>
          shares > 1e-5 ? outcomes?.[outcome] : acc,
        null as unknown as Outcome
      );
    },
    [isLoading, portfolio]
  );
}
