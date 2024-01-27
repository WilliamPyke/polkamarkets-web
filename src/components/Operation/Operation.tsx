import classNames from 'classnames';
import type { UserOperation } from 'types/user';

import { CheckIcon, InfoIcon } from 'assets/icons';

import Icon from 'components/Icon';

import { Button } from '../Button';
import styles from './Operation.module.scss';

type OperationProps = Partial<UserOperation>;

function Operation({
  status,
  action,
  marketTitle,
  outcomeTitle,
  value,
  ticker
}: OperationProps) {
  return (
    <div
      className={classNames(styles.root, {
        [styles.pending]: status === 'pending',
        [styles.success]: status === 'success',
        [styles.failed]: status === 'failed'
      })}
    >
      <span className={styles.status}>
        {status === 'pending' && (
          <>
            <Icon name="Loading" />
            Pending
          </>
        )}
        {status === 'success' && (
          <>
            <CheckIcon />
            Success
          </>
        )}
        {status === 'failed' && (
          <>
            <InfoIcon />
            Failed
          </>
        )}
      </span>
      {action === 'buy' && (
        <p
          className={styles.action}
        >{`Bought ${value} ${ticker} of outcome ${outcomeTitle}`}</p>
      )}
      {action === 'sell' && (
        <p
          className={styles.action}
        >{`Sold ${value} ${ticker} of outcome ${outcomeTitle}`}</p>
      )}
      <p className={styles.market}>{marketTitle}</p>

      {status === 'failed' && (
        <div className={styles.footer}>
          <Button size="xs" color="danger">
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}

export default Operation;
