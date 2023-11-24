import { useContext } from 'react';

import isEmpty from 'lodash/isEmpty';

import { TradeContext } from 'contexts/trade';

function useTrade() {
  const context = useContext(TradeContext);

  if (isEmpty(context)) {
    throw new Error('useTrade must be used within a TradeProvider');
  }

  return context;
}

export default useTrade;
