import { useAppSelector } from 'hooks';

import MiniTable from '../MiniTable';
import formatMiniTableItems from './utils';

function TradeFormDetails() {
  const { market, selectedOutcomeId } = useAppSelector(state => state.market);
  const { id, outcomes } = market;
  const {
    type,
    fractionsBought,
    currentROI,
    totalStake,
    potentialReturns,
    lossAmount
  } = useAppSelector(state => state.trade);

  const miniTableItems = formatMiniTableItems(
    outcomes,
    selectedOutcomeId,
    id,
    fractionsBought,
    currentROI,
    totalStake
  );

  return (
    <div className="pm-c-trade-form-details">
      <MiniTable rows={miniTableItems} style={{ paddingBottom: '0.4rem' }} />
      {type === 'buy' ? (
        <MiniTable
          rows={[
            {
              key: 'returns',
              title: 'Potential returns',
              value: `${potentialReturns} DOT`
            }
          ]}
          color="success"
        />
      ) : null}
      {type === 'sell' ? (
        <MiniTable
          rows={[
            { key: 'loss', title: 'Loss amount', value: `${lossAmount} DOT` }
          ]}
          color="danger"
        />
      ) : null}
    </div>
  );
}

TradeFormDetails.displayName = 'TradeFormDetails';

export default TradeFormDetails;