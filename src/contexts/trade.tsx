import { createContext } from 'react';

import { Market, Outcome } from 'models/market';
import { TradeType } from 'redux/ducks/trade';
import { create } from 'zustand';

export type TradeContextState = {
  type: TradeType;
  status: 'pending' | 'success' | 'error';
  market: {
    slug: Market['slug'];
    outcome: Outcome['id'];
  };
  setStatus: (status: TradeContextState['status']) => void;
};

const useTradeStore = create<TradeContextState>(set => ({
  type: 'buy',
  status: 'pending',
  market: {
    slug: '',
    outcome: ''
  },
  setStatus: status => set({ status })
}));

export const TradeContext = createContext<TradeContextState>(
  {} as TradeContextState
);

function TradeProvider({ children }) {
  const state = useTradeStore();

  return (
    <TradeContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </TradeContext.Provider>
  );
}

export default TradeProvider;
