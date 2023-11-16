import cn from 'classnames';
import { Market } from 'models/market';

import FavoriteMarket from 'components/FavoriteMarket';
import Share from 'components/Share';

type MarketFooterActionsProps = {
  market: Market;
  $variant: 'filled' | 'text';
};

export default function MarketFooterActions({
  market,
  $variant = 'text'
}: MarketFooterActionsProps) {
  const { origin } = window.location;

  return (
    <div className="pm-c-market-footer__actions">
      <Share
        id={market.slug}
        className={cn('pm-c-market-footer__actions-button', {
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
        link={{
          title: market.title,
          url: `${origin}/markets/${market.slug}`
        }}
      />
      <FavoriteMarket
        market={market}
        className={cn({
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
      />
    </div>
  );
}
