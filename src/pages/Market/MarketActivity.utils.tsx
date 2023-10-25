/* eslint-disable import/prefer-default-export */
import { roundNumber } from 'helpers/math';
import type { GetMarketFeedBySlugData } from 'services/Polkamarkets/types';
import { MarketActivity } from 'types/market';

import type { LanguageCode } from 'hooks/useLanguage/useLanguage.type';

const getActivityActionTitle = (
  user: string,
  action: 'buy' | 'sell' | 'claim_winnings',
  language: LanguageCode
) => {
  const titles = {
    buy: (value: number, ticker: string, outcomeTitle?: string) => {
      if (language === 'tr') {
        return `${value} ${ticker} adet "${outcomeTitle}" sonucu hisse senedi alındı`;
      }
      if (language === 'pt') {
        return `${user} previu "${outcomeTitle}" com ${value} ${ticker}`;
      }
      return `${user} bought ${value} ${ticker} of outcome "${outcomeTitle}"`;
    },
    sell: (value: number, ticker: string, outcomeTitle?: string) => {
      if (language === 'tr') {
        return `${value} adet "${outcomeTitle}" sonucu hisse senedi satıldı`;
      }
      if (language === 'pt') {
        return `${user} vendeu ${value} ${ticker} de "${outcomeTitle}"`;
      }
      return `${user} sold ${value} ${ticker} of outcome "${outcomeTitle}"`;
    },
    claim_winnings: (
      _value: number,
      _ticker: string,
      _outcomeTitle?: string
    ) => {
      if (language === 'pt') {
        return `${user} acertou uma previsão`;
      }
      return `${user} won a prediction`;
    }
  };
  return titles[action] || 'buy';
};

const activityAccentColors: { [key: string]: 'success' | 'danger' } = {
  buy: 'success',
  sell: 'danger',
  claim_winnings: 'success'
};

export function getMarketFeedBySlugTransformResponse(
  response: GetMarketFeedBySlugData,
  language: LanguageCode
): (MarketActivity & {
  actionTitle: string;
  accentColor: 'success' | 'danger';
})[] {
  return response
    .filter(activity =>
      ['buy', 'sell', 'claim_winnings'].includes(activity.action)
    )
    .filter(activity => !activity.user.startsWith('0x'))
    .map(activity => {
      return {
        ...activity,
        user: activity.user.includes('#')
          ? activity.user.split('#')[0]
          : activity.user.split('@')[0],
        actionTitle: getActivityActionTitle(
          activity.user,
          activity.action,
          language
        )(
          roundNumber(activity.value, 3),
          activity.ticker,
          activity.outcomeTitle
        ),
        accentColor: activityAccentColors[activity.action]
      };
    });
}
