import cn from 'classnames';
import { Market } from 'models/market';

import FavoriteMarket from 'components/FavoriteMarket';
import Icon from 'components/Icon';

import { environment } from 'config';

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

  const twitterShareIntent =
    environment.UI_TWITTER_SHARE_INTENT ||
    'I%20just%20made%20a%20prediction%20on%20@polkamarkets!%20🔥💯%0D%0D';

  return (
    <div className="pm-c-market-footer__actions">
      <a
        href={`https://twitter.com/intent/tweet?text=${twitterShareIntent}${publicUrl}/markets/${market.slug}`}
        target="_blank"
        rel="noreferrer"
        className={cn('pm-c-market-footer__actions-button', {
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
      >
        <Icon name="Share" title="Share" />
      </a>
      <FavoriteMarket
        market={market}
        className={cn({
          'pm-c-market-footer__actions-button-filled': $variant === 'filled'
        })}
      />
    </div>
  );
}
