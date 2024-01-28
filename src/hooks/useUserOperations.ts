import { useGetUserOperationsByAddressQuery } from 'services/Polkamarkets';

import useAppSelector from './useAppSelector';

function useUserOperations() {
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

  return { data, isLoading: isLoading || isFetching, refetch };
}

export default useUserOperations;
