import {
  ContextType,
  useCallback,
  useContext,
  useMemo,
  WheelEvent
} from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import orderBy from 'lodash/orderBy';
import type { Market } from 'models/market';
import {
  getNetworkById,
  getCurrencyByTicker,
  getTokenByTicker
} from 'redux/ducks/market';

import { AlertMini, Icon, PredictionCard } from 'components';

import styles from './TournamentsUpcomingMarkets.module.scss';

type HeaderProps = {
  children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerGroup}>
        <h2 className={styles.headerTitle}>Upcoming</h2>
        <Link
          to="/markets"
          className={classNames('pm-c-button--xs', styles.headerButton)}
        >
          See All
        </Link>
      </div>
      {children}
    </div>
  );
}

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
        .filter(market => market.state === 'open')
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

  if (!marketsByVolume.length)
    return (
      <div>
        <Header />
        <div className="padding-y-5 padding-x-4 width-full border-solid border-1 border-radius-medium">
          <AlertMini
            style={{ border: 'none' }}
            styles="outline"
            variant="information"
            description="There are no available markets at the moment."
          />
        </div>
      </div>
    );

  return (
    <ScrollMenu
      wrapperClassName={styles.predictionsWithImageWrapper}
      scrollContainerClassName={styles.predictionsWithImageScroll}
      itemClassName={styles.predictionsWithImageItem}
      onWheel={onWheel}
      Header={
        <Header>
          <div className={styles.headerArrows}>
            <LeftArrow />
            <RightArrow />
          </div>
        </Header>
      }
    >
      {marketsByVolume.map(market => (
        <PredictionCard
          itemID={market.slug}
          key={market.slug}
          market={market}
          className={styles.predictionCard}
          statsVisibility={{
            volume: {
              desktop: false
            }
          }}
        />
      ))}
    </ScrollMenu>
  );
}

export default TournamentsUpcomingMarkets;
