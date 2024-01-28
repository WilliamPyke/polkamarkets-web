import { useCallback } from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useGetUserOperationsByAddressQuery } from 'services/Polkamarkets';
import type { UserOperation } from 'types/user';
import { Spinner } from 'ui';

import { useAppSelector, useTrade } from 'hooks';

import { AlertMini } from '../Alert';
import Operation from '../Operation';
import styles from './UserOperations.module.scss';

function UserOperations() {
  const trade = useTrade();

  const { login: isLoadingLogin } = useAppSelector(
    state => state.polkamarkets.isLoading
  );

  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const userAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  const {
    data: userOperations,
    isLoading: isLoadingUserOperations,
    isFetching: isFetchingUserOperations
  } = useGetUserOperationsByAddressQuery(
    { address: userAddress },
    { skip: !isLoggedIn || isLoadingLogin }
  );

  const operationItemContent = useCallback(
    (operation: UserOperation) => (
      <li key={operation.userOperationHash} className={styles.item}>
        <Operation {...operation} trade={trade} />
      </li>
    ),
    [trade]
  );

  const isLoading = isLoadingUserOperations || isFetchingUserOperations;

  if (isLoadingLogin || isLoading) return <Spinner />;

  if (isEmpty(userOperations)) {
    return (
      <div
        className={classNames(
          'padding-2 width-full border-solid border-1 border-radius-small',
          styles.emptyState
        )}
      >
        <AlertMini
          style={{ border: 'none' }}
          styles="outline"
          variant="information"
          description="No ongoing predictions at the moment."
        />
      </div>
    );
  }

  return <ul>{userOperations?.map(operationItemContent)}</ul>;
}

export default UserOperations;
