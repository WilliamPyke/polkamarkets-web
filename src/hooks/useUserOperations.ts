import { useCallback } from 'react';

import map from 'lodash/map';
import type { Market } from 'models/market';
import polkamarketsApi, {
  useGetUserOperationsByAddressQuery
} from 'services/Polkamarkets';
import type { UserOperation } from 'types/user';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

function useUserOperations() {
  const dispatch = useAppDispatch();

  const { login: isLoadingLogin } = useAppSelector(
    state => state.polkamarkets.isLoading
  );

  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const userAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  const { data, isLoading, isFetching, refetch } =
    useGetUserOperationsByAddressQuery(
      { address: userAddress },
      { skip: !isLoggedIn || isLoadingLogin }
    );

  const updateOperationStatus = useCallback(
    ({
      userOperationHash,
      status
    }: Pick<UserOperation, 'userOperationHash' | 'status'>): void =>
      dispatch(
        polkamarketsApi.util.updateQueryData(
          'getUserOperationsByAddress',
          { address: userAddress },
          operations => {
            return map(operations, operation =>
              operation.userOperationHash === userOperationHash
                ? { ...operation, status }
                : operation
            );
          }
        )
      ),
    [dispatch, userAddress]
  );
  const getOperation = useCallback(
    (market: Market) =>
      data?.filter(
        ({ networkId, marketId, outcomeId }) =>
          networkId === +market.networkId &&
          marketId === +market.id &&
          market.outcomes.some(outcome => +outcome.id === outcomeId)
      )?.[0],
    [data]
  );

  return {
    data,
    isLoading: isLoading || isFetching,
    refetch,
    updateOperationStatus,
    getOperation
  };
}

export default useUserOperations;
