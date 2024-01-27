import classNames from 'classnames';
import type { UserOperation } from 'types/user';

import { CheckIcon, InfoIcon, RemoveOutlinedIcon } from 'assets/icons';

import Icon from 'components/Icon';

import { Button } from '../Button';
import styles from './Operation.module.scss';

type OperationProps = Partial<UserOperation> & {
  cta?: React.ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
};

function Operation({
  status,
  action,
  marketTitle,
  outcomeTitle,
  value,
  ticker,
  cta,
  dismissable = false,
  onDismiss
}: OperationProps) {
  return (
    <div
      className={classNames(styles.root, {
        [styles.pending]: status === 'pending',
        [styles.success]: status === 'success',
        [styles.failed]: status === 'failed'
      })}
    >
      {(dismissable || status === 'success') && (
        <Button
          variant="ghost"
          className={styles.dismiss}
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <RemoveOutlinedIcon />
        </Button>
      )}
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
      <div className={styles.footer}>
        {cta}
        {status === 'failed' && (
          <Button size="xs" color="danger">
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}

export default Operation;
