import { useCallback } from 'react';

import { Market } from 'models/market';

import useAppDispatch from 'hooks/useAppDispatch';
import useNetwork from 'hooks/useNetwork';

export default function useReloadMarketPrices({
  id: marketId
}: Pick<Market, 'id'>) {
  const dispatch = useAppDispatch();
  const { networkConfig } = useNetwork();

  return useCallback(async () => {
    const { default: PolkamarketsService } = await import(
      'services/PolkamarketsService'
    );
    const { changeMarketOutcomeData, changeMarketData } = await import(
      'redux/ducks/markets'
    );
    const { changeOutcomeData, changeData } = await import(
      'redux/ducks/market'
    );
    const marketData = await new PolkamarketsService(
      networkConfig
    ).getMarketData(marketId);
    const liquidityData = { data: { liquidity: marketData.liquidity } };

    (marketData.outcomes as Array<Record<'price' | 'shares', number>>).forEach(
      (data, id) => {
        const payload = { marketId, id, data };

        dispatch(changeMarketOutcomeData(payload));
        dispatch(changeOutcomeData(payload));
      }
    );

    dispatch(changeMarketData({ marketId, ...liquidityData }));
    dispatch(changeData(liquidityData));
  }, [dispatch, marketId, networkConfig]);
}
