import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import getMarketColors from 'helpers/getMarketColors';
import isNull from 'lodash/isNull';
import { Container, Hero, useTheme } from 'ui';

import {
  Button,
  Icon,
  MarketAvatar,
  MarketCategory,
  Share,
  Text
} from 'components';
import FavoriteMarket from 'components/FavoriteMarket';
import MarketFooter from 'components/Market/MarketFooter';

import { useAppSelector } from 'hooks';

import marketClasses from './Market.module.scss';
import styles from './MarketHead.module.scss';

export default function MarketHead() {
  const market = useAppSelector(state => state.market.market);
  const theme = useTheme();
  const location = useLocation<{ from?: string }>();

  const marketColors = useMemo(
    () =>
      getMarketColors({
        network: market.network.id,
        market: market.id
      }),
    [market.id, market.network.id]
  );

  const marketTournament = useMemo(() => {
    if (market.tournaments.length === 0) {
      return undefined;
    }

    if (market.tournaments.length === 1) {
      return market.tournaments[0];
    }

    if (market.tournaments.length > 1) {
      if (location.state && location.state.from) {
        const tournament = market.tournaments.find(({ slug }) =>
          location.state.from?.includes(slug)
        );

        return tournament;
      }
    }

    return undefined;
  }, [location.state, market.tournaments]);

  return (
    <Container className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerNavigation}>
          <Link
            to={
              marketTournament ? `/tournaments/${marketTournament.slug}` : '/'
            }
          >
            <Button className={styles.headerNavigationButton}>
              <Icon
                name="Arrow"
                title={`Back to ${marketTournament ? `Tournament` : 'Home'}`}
              />
            </Button>
          </Link>
          {marketTournament ? (
            <h4 className={styles.headerNavigationText}>
              {marketTournament.title}
            </h4>
          ) : null}
        </div>
        <div className={styles.headerActions}>
          <Share id={market.slug} className={styles.headerActionsButton} />
          <FavoriteMarket
            market={market}
            className={styles.headerActionsButton}
          />
        </div>
      </div>
      <Hero
        className={marketClasses.hero}
        $backdrop={marketColors.market}
        {...(!isNull(market.imageUrl) && {
          $image: market.imageUrl
        })}
      >
        <Container
          $enableGutters={!theme.device.isDesktop}
          className={marketClasses.heroInfo}
        >
          {!isNull(market.imageUrl) && (
            <MarketAvatar
              $radius={theme.device.isDesktop ? 'md' : 'sm'}
              $size={theme.device.isDesktop ? 'lg' : 'md'}
              imageUrl={market.imageUrl}
              verified={!theme.device.isDesktop && market.verified}
            />
          )}
          <div>
            <MarketCategory
              category={market.category}
              subcategory={market.subcategory}
              verified={theme.device.isDesktop && market.verified}
            />
            <Text
              as="h2"
              fontWeight={theme.device.isDesktop ? 'bold' : 'medium'}
              scale={theme.device.isDesktop ? 'heading-large' : 'body'}
              className={marketClasses.heroInfoTitle}
            >
              {market.title}
            </Text>
          </div>
        </Container>
      </Hero>
      {theme.device.isDesktop && (
        <Container className={marketClasses.heroStats}>
          <MarketFooter market={market} />
        </Container>
      )}
    </Container>
  );
}
