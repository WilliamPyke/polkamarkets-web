import React, { useState } from 'react';

import { setTradeAmount } from 'redux/ducks/trade';

import { WalletIcon, PolkadotIcon } from 'assets/icons';

import { useAppSelector, useAppDispatch } from 'hooks';

import StepSlider from '../StepSlider';
import Text from '../Text';

function TradeFormInput() {
  const dispatch = useAppDispatch();
  const type = useAppSelector(state => state.trade.type);
  const label = `${type} fractions`;

  const { market, selectedOutcomeId } = useAppSelector(state => state.market);

  // buy and sell have different maxes
  const balance = useAppSelector(state => state.bepro.ethBalance);
  const portfolio = useAppSelector(state => state.bepro.portfolio);

  // TODO: improve this
  function max() {
    let maxAmount = 0;

    // max for buy actions - eth balance
    if (type === 'buy') {
      maxAmount = balance;
    }
    // max for sell actions - number of outcome shares
    else if (type === 'sell') {
      maxAmount = portfolio[market.id]?.outcomeShares[selectedOutcomeId] || 0;
    }

    // rounding (down) to 5 decimals
    return Math.floor(maxAmount * 1e5) / 1e5;
  }

  const [amount, setAmount] = useState(max());

  function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
    let { value }: any = event.currentTarget;
    value = parseFloat(value) || 0;

    setAmount(value);
    dispatch(setTradeAmount(value));
  }

  function handleSetMaxAmount() {
    setAmount(max());
    dispatch(setTradeAmount(max()));
  }

  function handleChangeSlider(value: number) {
    const percentage = value / 100;

    setAmount(max() * percentage);
    dispatch(setTradeAmount(max() * percentage));
  }

  return (
    <form className="pm-c-trade-form-input">
      <div className="pm-c-trade-form-input__header">
        <label className="pm-c-trade-form-input__header-label" htmlFor={label}>
          {label}
        </label>
        <div className="pm-c-trade-form-input__header-wallet">
          <figure aria-label="Wallet icon">
            <WalletIcon />
          </figure>
          <Text as="strong" scale="tiny" fontWeight="semibold">
            {max()}
          </Text>
          <Text as="span" scale="tiny" fontWeight="semibold">
            {type === 'buy' ? ' DOT' : ' Shares'}
          </Text>
        </div>
      </div>
      <div className="pm-c-trade-form-input__group">
        <input
          className="pm-c-trade-form-input__input"
          type="number"
          id={label}
          value={amount}
          step=".0001"
          min={0}
          max={max()}
          onChange={event => handleChangeAmount(event)}
        />
        <div className="pm-c-trade-form-input__actions">
          <button type="button" onClick={handleSetMaxAmount}>
            <Text as="span" scale="tiny-uppercase" fontWeight="semibold">
              Max
            </Text>
          </button>
          {type === 'buy' ? (
            <div className="pm-c-trade-form-input__logo">
              <figure aria-label="Polkadot logo">
                <PolkadotIcon />
              </figure>
              <Text as="span" scale="caption" fontWeight="bold">
                DOT
              </Text>
            </div>
          ) : null}
          {type === 'sell' ? (
            <div className="pm-c-trade-form-input__logo">
              <Text as="span" scale="caption" fontWeight="bold">
                Shares
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <StepSlider onChange={value => handleChangeSlider(value)} />
    </form>
  );
}

TradeFormInput.displayName = 'TradeFormInput';

export default TradeFormInput;