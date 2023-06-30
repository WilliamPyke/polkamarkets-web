/* eslint-disable import/prefer-default-export */
import cn from 'classnames';
import { roundNumber } from 'helpers/math';
import { Outcome } from 'models/market';
import { Avatar } from 'ui';

import Text from '../Text';
import styles from './ReportFormArbitration.module.scss';

type BalanceRowRenderArgs = {
  balance: number;
  ticker: string;
};

function balanceRowRender({ balance, ticker }: BalanceRowRenderArgs) {
  return (
    <div className="flex-row align-center gap-2">
      <Text as="strong" scale="caption" fontWeight="bold">
        {roundNumber(balance, 3)}
      </Text>
      <Text as="span" scale="caption" fontWeight="bold">
        {` ${ticker}`}
      </Text>
    </div>
  );
}

type CostRowRenderArgs = {
  cost: number;
  ticker: string;
};

function costRowRender({ cost, ticker }: CostRowRenderArgs) {
  return (
    <div className="flex-row align-center gap-2">
      <Text as="strong" scale="caption" fontWeight="bold">
        {roundNumber(cost, 3)}
      </Text>
      <Text as="span" scale="caption" fontWeight="bold">
        {` ${ticker} + GAS FEES`}
      </Text>
    </div>
  );
}

type OutcomeRowRenderArgs = {
  imageUrl?: Outcome['imageUrl'];
  title?: Outcome['title'];
};

function outcomeRowRender({ imageUrl, title }: OutcomeRowRenderArgs) {
  return (
    <div className={styles.outcomeDetails}>
      {imageUrl ? (
        <Avatar $radius="lg" $size="x2s" alt="Outcome" src={imageUrl} />
      ) : null}
      {title ? (
        <p className={cn(styles.outcomeDetailsTitle, 'uppercase')}>{title}</p>
      ) : null}
    </div>
  );
}

function formatArbitrationDetails({
  balance,
  cost,
  ticker,
  imageUrl,
  title
}: BalanceRowRenderArgs & OutcomeRowRenderArgs & CostRowRenderArgs) {
  return [
    {
      key: 'balance',
      title: `Your ${ticker} Balance`,
      value: { balance, ticker },
      render: balanceRowRender
    },
    {
      key: 'outcome',
      title: 'Contested Outcome',
      value: { imageUrl, title },
      render: outcomeRowRender
    },
    {
      key: 'cost',
      title: 'Arbitration Cost',
      value: { cost, ticker },
      render: costRowRender
    }
  ];
}

export { formatArbitrationDetails };
