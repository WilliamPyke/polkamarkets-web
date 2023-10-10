import {
  ContextType,
  useCallback,
  useContext,
  useMemo,
  WheelEvent
} from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import orderBy from 'lodash/orderBy';
import type { Market } from 'models/market';
import {
  getNetworkById,
  getCurrencyByTicker,
  getTokenByTicker
} from 'redux/ducks/market';

import { Icon, PredictionCard } from 'components';

import styles from './TournamentsUpcomingMarkets.module.scss';

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      className={styles.predictionsWithImageArrowButton}
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
    >
      <Icon name="Chevron" dir="left" />
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      className={styles.predictionsWithImageArrowButton}
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <Icon name="Chevron" dir="right" />
    </button>
  );
}

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

type TournamentsUpcomingMarketsProps = {
  markets: Market[];
};

function TournamentsUpcomingMarkets({
  markets
}: TournamentsUpcomingMarketsProps) {
  const marketsByVolume = useMemo(
    () =>
      orderBy(markets, 'volume', 'desc')
        .slice(0, 8)
        .map(market => {
          const network = getNetworkById(market.networkId);
          const ticker = market.token.wrapped
            ? network.currency.ticker
            : market.token.symbol;

          const tokenByTicker = getTokenByTicker(ticker);
          const currencyByTicker = getCurrencyByTicker(ticker);

          return {
            ...market,
            network,
            currency: network.currency,
            token: {
              ...market.token,
              ticker,
              iconName: (tokenByTicker || currencyByTicker).iconName
            },
            outcomes: market.outcomes.map(outcome => ({
              ...outcome,
              price: Number(outcome.price.toFixed(3))
            }))
          } as Market;
        }),
    [markets]
  );

  const onWheel = useCallback(
    (apiObj: scrollVisibilityApiType, event: WheelEvent): void => {
      const isTouchpad =
        Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 15;

      if (isTouchpad) {
        event.stopPropagation();
        return;
      }

      if (event.deltaY < 0) {
        apiObj.scrollNext();
      } else if (event.deltaY > 0) {
        apiObj.scrollPrev();
      }
    },
    []
  );

  return (
    <ScrollMenu
      wrapperClassName={styles.predictionsWithImageWrapper}
      scrollContainerClassName={styles.predictionsWithImageScroll}
      itemClassName={styles.predictionsWithImageItem}
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      onWheel={onWheel}
    >
      {marketsByVolume.map(market => (
        <PredictionCard
          itemID={market.slug}
          key={market.slug}
          market={market}
          className={styles.predictionCard}
        />
      ))}
    </ScrollMenu>
  );
}

export default TournamentsUpcomingMarkets;
