/* eslint-disable import/prefer-default-export */
import { roundNumber } from 'helpers/math';
import type { GetMarketFeedBySlugData } from 'services/Polkamarkets/types';
import { MarketActivity } from 'types/market';

import type { LanguageCode } from 'hooks/useLanguage/useLanguage.type';

const getActivityActionTitle = (
  user: string,
  action: 'buy' | 'sell',
  language: LanguageCode
) => {
  const titles = {
    buy: (shares: number, outcomeTitle?: string) => {
      if (language === 'tr') {
        return `${shares} adet "${outcomeTitle}" sonucu hisse senedi alındı`;
      }
      if (language === 'pt') {
        return `${user} comprou ${shares} ações de "${outcomeTitle}"`;
      }
      return `${user} bought ${shares} shares of outcome "${outcomeTitle}"`;
    },
    sell: (shares: number, outcomeTitle?: string) => {
      if (language === 'tr') {
        return `${shares} adet "${outcomeTitle}" sonucu hisse senedi satıldı`;
      }
      if (language === 'pt') {
        return `${user} vendeu ${shares} ações de "${outcomeTitle}"`;
      }
      return `${user} sold ${shares} shares of outcome "${outcomeTitle}"`;
    }
  };
  return titles[action] || 'buy';
};

const activityAccentColors: { [key: string]: 'success' | 'danger' } = {
  buy: 'success',
  sell: 'danger'
};

export function getMarketFeedBySlugTransformResponse(
  response: GetMarketFeedBySlugData,
  language: LanguageCode
): (MarketActivity & {
  actionTitle: string;
  accentColor: 'success' | 'danger';
})[] {
  return response
    .filter(activity => ['buy', 'sell'].includes(activity.action))
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
        )(roundNumber(activity.shares, 3), activity.outcomeTitle),
        accentColor: activityAccentColors[activity.action]
      };
    });
}
