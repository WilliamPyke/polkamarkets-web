import { useMemo } from 'react';
import { Link } from 'react-router-dom';

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

  const marketColors = useMemo(
    () =>
      getMarketColors({
        network: market.network.id,
        market: market.id
      }),
    [market.id, market.network.id]
  );

  return (
    <Container className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerNavigation}>
          <Link to="/__temp__">
            <Button className={styles.headerNavigationButton}>
              <Icon name="Arrow" title="Back to __temp__" />
            </Button>
          </Link>
          <h4 className={styles.headerNavigationText}>__temp__</h4>
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
