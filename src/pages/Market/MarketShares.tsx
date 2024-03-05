import { useCallback, useMemo } from 'react';

import { roundNumber } from 'helpers/math';
import isEmpty from 'lodash/isEmpty';
import { changeTradeType, selectOutcome } from 'redux/ducks/trade';
import { Image, useTheme } from 'ui';

import { Button } from 'components';

import {
  useAppDispatch,
  useAppSelector,
  useLanguage,
  useNetwork,
  useOperation
} from 'hooks';

import { calculateEthAmountSold } from '../../components/TradeForm/utils';
import styles from './MarketShares.module.scss';

const translations = {
  en: {
    text: {
      hold: 'You hold',
      of: 'of',
      performing: 'performing',
      sellPosition: 'Sell Position'
    },
    format: {
      shares: shares => `${shares.toFixed(1)}`,
      performance: (value, buyValue, tokenSymbol) =>
        `${value > buyValue ? '+' : ''}${(value - buyValue).toFixed(
          1
        )} ${tokenSymbol} (${value > buyValue ? '+' : ''}${(
          ((value - buyValue) / buyValue) *
          100
        ).toFixed(1)}%)`
    }
  },
  tr: {
    text: {
      hold: 'Şu anda',
      of: 'adet',
      performing: 'hissesine sahipsiniz ve bunun değeri',
      sellPosition: 'Pozisyonu Sat',
      equivalentValue: 'denk geliyor'
    },
    format: {
      shares: shares => `${roundNumber(shares, 3)}`,
      performance: (value, _, tokenSymbol) =>
        `${value.toFixed(3)} ${tokenSymbol}`
    }
  },
  pt: {
    text: {
      hold: 'Tens',
      of: 'de',
      performing: 'com um desempenho de',
      sellPosition: 'Vender Posição'
    },
    format: {
      shares: shares => `${shares.toFixed(1)}`,
      performance: (value, buyValue, tokenSymbol) =>
        `${value > buyValue ? '+' : ''}${(value - buyValue).toFixed(
          1
        )} ${tokenSymbol} (${value > buyValue ? '+' : ''}${(
          ((value - buyValue) / buyValue) *
          100
        ).toFixed(1)}%)`
    }
  }
};

function translate(key, lang = 'en', type = 'text', ...args) {
  const translation = translations[lang][type][key];
  return typeof translation === 'function' ? translation(...args) : translation;
}

type MarketSharesProps = {
  onSellSelected?: () => void;
};

function MarketShares({ onSellSelected }: MarketSharesProps) {
  const dispatch = useAppDispatch();
  const { network } = useNetwork();
  const { type } = useAppSelector(state => state.trade);
  const { market } = useAppSelector(state => state.market);
  const { id, outcomes, networkId, token } = useAppSelector(
    state => state.market.market
  );
  const portfolio = useAppSelector(state => state.polkamarkets.portfolio);
  const { portfolio: isLoadingPortfolio } = useAppSelector(
    state => state.polkamarkets.isLoading
  );
  const theme = useTheme();

  const language = useLanguage();

  const operation = useOperation(market);
  const operationStatus = operation.getMarketStatus();

  const handleSell = useCallback(
    (outcomeId: string) => {
      if (onSellSelected) {
        onSellSelected();
      }

      if (type !== 'sell') {
        dispatch(changeTradeType('sell'));
      }

      dispatch(selectOutcome(id, networkId, outcomeId));
    },
    [dispatch, id, networkId, onSellSelected, type]
  );

  const outcomesWithShares = useMemo(() => {
    if (isLoadingPortfolio) return [];

    const marketShares = portfolio[id];

    if (!marketShares) return [];

    const sharesByOutcome = outcomes.map(outcome => {
      const outcomeShares = marketShares.outcomes[outcome.id];

      return {
        id: outcome.id.toString(),
        title: outcome.title,
        imageUrl: outcome.imageUrl,
        shares: outcomeShares ? outcomeShares.shares : 0,
        buyValue: outcomeShares
          ? outcomeShares.shares * outcomeShares.price
          : 0,
        value:
          outcomeShares && outcomeShares.shares > 0
            ? calculateEthAmountSold(market, outcome, outcomeShares.shares)
                .totalStake
            : 0
      };
    });

    return sharesByOutcome.filter(outcome => outcome.shares > 1);
  }, [id, isLoadingPortfolio, outcomes, portfolio, market]);

  const isWrongNetwork = network.id !== networkId.toString();

  if (isWrongNetwork || isEmpty(outcomesWithShares)) return null;

  if (operationStatus === 'pending') return null;

  return (
    <ul className={styles.root}>
      {outcomesWithShares.map(outcome => (
        <li key={outcome.id} className={styles.rootItem}>
          <p className={`${styles.rootItemDescription} notranslate`}>
            {translate('hold', language)}{' '}
            <strong>
              {translate('shares', language, 'format', outcome.shares)}
            </strong>{' '}
            {translate('of', language)}{' '}
            <div className={styles.rootItemTitleGroup}>
              {outcome.imageUrl && (
                <Image
                  className={styles.rootItemTitleGroupImage}
                  $radius="xs"
                  alt={outcome.title}
                  $size="x2s"
                  src={outcome.imageUrl}
                />
              )}
              <strong>{outcome.title}</strong>
            </div>{' '}
            {translate('performing', language)}{' '}
            <strong>
              {translate(
                'performance',
                language,
                'format',
                outcome.value,
                outcome.buyValue,
                token.symbol
              )}
            </strong>
            {language === 'tr' &&
              ` ${translate('equivalentValue', language, 'text')}`}
          </p>
          <Button
            size="sm"
            fullwidth={!theme.device.isTablet}
            onClick={() => handleSell(outcome.id)}
          >
            Sell Position
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default MarketShares;
