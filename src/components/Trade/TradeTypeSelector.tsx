import { useCallback } from 'react';

import isUndefined from 'lodash/isUndefined';
import { changeTradeType } from 'redux/ducks/trade';

import { useAppDispatch } from 'hooks';

import ButtonGroup from '../ButtonGroup';
import styles from './Trade.module.scss';

function TradeTypeSelector() {
  const dispatch = useAppDispatch();

  const handleChangeTradeType = useCallback(
    (tradeType: string) => {
      if (!isUndefined(tradeType)) {
        dispatch(changeTradeType(tradeType));
      }
    },
    [dispatch]
  );

  return (
    <ButtonGroup
      fullwidth
      defaultActiveId="buy"
      buttons={[
        { id: 'buy', name: 'Strenghten', color: 'default' },
        { id: 'sell', name: 'Sell', color: 'default' }
      ]}
      className={{
        group: styles.typeSelector,
        button: styles.typeSelectorButton
      }}
      onChange={tradeType => handleChangeTradeType(tradeType)}
    />
  );
}

export default TradeTypeSelector;
