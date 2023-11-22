import { createContext, useEffect } from 'react';

import { Market, Outcome } from 'models/market';
import { TradeType } from 'redux/ducks/trade';
import { create } from 'zustand';

import { Button, Feature, Toast, ToastNotification } from 'components';

import useNetwork from 'hooks/useNetwork';
import useToastNotification from 'hooks/useToastNotification';

export type TradeContextState = {
  type: TradeType;
  status: 'pending' | 'success' | 'error';
  transactionSuccessHash?: string;
  trade: {
    market: Market['id'];
    outcome: Outcome['id'];
    location: string;
  };
  set: (newState: Partial<TradeContextState>) => void;
  reset: () => void;
};

const initialState: TradeContextState = {
  type: 'buy',
  status: 'pending',
  transactionSuccessHash: undefined,
  trade: {
    market: '',
    outcome: '',
    location: ''
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
  const { network } = useNetwork();
  const state = useTradeStore();
  const { show, close } = useToastNotification();

  const { type, status, transactionSuccessHash } = state;

  useEffect(() => {
    if (status === 'success') {
      show(`${type}-success`);
    }
  }, [status, type, show]);

  return (
    <>
      {status === 'success' ? (
        <ToastNotification id={`${type}-success`} duration={3000}>
          <Toast
            variant="success"
            title="Success"
            description="Your transaction is completed!"
          >
            <Toast.Actions>
              <Feature name="regular">
                {transactionSuccessHash ? (
                  <a
                    target="_blank"
                    href={`${network.explorerURL}/tx/${transactionSuccessHash}`}
                    rel="noreferrer"
                  >
                    <Button size="sm" color="success">
                      View on Explorer
                    </Button>
                  </a>
                ) : null}
              </Feature>
              <Button size="sm" variant="ghost" onClick={() => close(type)}>
                Dismiss
              </Button>
            </Toast.Actions>
          </Toast>
        </ToastNotification>
      ) : null}
      <TradeContext.Provider
        value={{
          ...state
        }}
      >
        {children}
      </TradeContext.Provider>
    </>
  );
}

export { TradeProvider };
