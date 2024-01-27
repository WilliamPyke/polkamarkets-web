import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import type { UserOperation } from 'types/user';

import { CheckIcon, InfoIcon, RemoveOutlinedIcon } from 'assets/icons';

import Icon from 'components/Icon';

import { useTrade } from 'hooks';

import { Button } from '../Button';
import styles from './Operation.module.scss';

type OperationProps = Partial<UserOperation> & {
  cta?: React.ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
  style?: React.CSSProperties;
};

function Operation({
  status,
  action,
  marketSlug,
  marketTitle,
  marketId,
  outcomeTitle,
  outcomeId,
  networkId,
  value,
  ticker,
  cta,
  dismissable = false,
  onDismiss,
  style
}: OperationProps) {
  const history = useHistory();
  const location = useLocation();
  const trade = useTrade();

  const handleRetry = useCallback(() => {
    trade.set({
      status: 'error',
      trade: {
        ...trade.trade,
        market: `${marketId || 231}`,
        outcome: `${outcomeId || 0}`,
        network: `${networkId || 80001}`
      }
    });

    history.push(`/markets/${marketSlug}`, { from: location.pathname });
  }, [
    history,
    location.pathname,
    marketId,
    marketSlug,
    networkId,
    outcomeId,
    trade
  ]);

  return (
    <div
      className={classNames(styles.root, {
        [styles.pending]: status === 'pending',
        [styles.success]: status === 'success',
        [styles.failed]: status === 'failed'
      })}
      style={style}
    >
      {dismissable && (
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
          <Button size="xs" color="danger" onClick={handleRetry}>
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}

export default Operation;
