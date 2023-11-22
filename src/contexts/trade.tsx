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
  set: (newState: Partial<TradeContextState>) => void;
  reset: () => void;
};

const initialState: TradeContextState = {
  type: 'buy',
  status: 'pending',
  market: {
    slug: '',
    outcome: ''
  },
  set: () => {},
  reset: () => {}
};

const useTradeStore = create<TradeContextState>(set => ({
  ...initialState,
  set: (newState: Partial<TradeContextState>) =>
    set(state => ({ ...state, ...newState })),
  reset: () => set(() => ({ ...initialState }))
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

export { TradeProvider };
