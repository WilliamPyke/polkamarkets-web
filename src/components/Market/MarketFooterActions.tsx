import cn from 'classnames';
import { environment } from 'config';
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
  // stripping protocol from publicUrl
  const publicUrl = environment.PUBLIC_URL?.replace(/(^\w+:|^)\/\//, '') || '';

  return (
    <div className="pm-c-market-footer__actions">
      <Share
        className={cn('pm-c-market-footer__actions-button', {
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
        link={{
          title: market.title,
          url: `${publicUrl}/markets/${market.slug}`
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
