import { roundNumber } from 'helpers/math';
import type { GetPortfolioFeedByAddressData } from 'services/Polkamarkets/types';
import type { FeedAction, FeedActionAccentColor } from 'types/portfolio';

import {
  rankColumnRender,
  volumeColumnRender,
  liquidityColumnRender,
  earningsColumnRender
} from 'pages/Leaderboard/prepare';

import type { LanguageCode } from 'hooks/useLanguage/useLanguage.type';

import type {
  LeaderboardRanks,
  LeaderboardRanksRow,
  PredictionStatistics,
  PredictionStatisticsRow
} from './types';

function prepareLeaderboardRanksRow(
  ranks: LeaderboardRanks
): LeaderboardRanksRow {
  return {
    rankByVolume: {
      value: {
        place: ranks.rankByVolume,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByMarketsCreated: {
      value: {
        place: ranks.rankByMarketsCreated,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByWonPredictions: {
      value: {
        place: ranks.rankByWonPredictions,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByLiquidityAdded: {
      value: {
        place: ranks.rankByLiquidityAdded,
        change: 'stable'
      },
      render: rankColumnRender
    },
    rankByEarnings: {
      value: {
        place: ranks.rankByEarnings,
        change: 'stable'
      },
      render: rankColumnRender
    }
  };
}

type PreparePredictionStatisticsRowArgs = {
  statistics: PredictionStatistics;
  ticker: string;
};

function preparePredictionStatisticsRow({
  statistics,
  ticker
}: PreparePredictionStatisticsRowArgs): PredictionStatisticsRow {
  return {
    volume: {
      value: {
        volume: statistics.volume,
        ticker
      },
      render: volumeColumnRender
    },
    marketsCreated: {
      value: statistics.marketsCreated
    },
    wonPredictions: {
      value: statistics.wonPredictions
    },
    liquidityAdded: {
      value: {
        liquidity: statistics.liquidityAdded,
        ticker
      },
      render: liquidityColumnRender
    },
    earnings: {
      value: {
        earnings: statistics.earnings,
        ticker
      },
      render: earningsColumnRender
    }
  };
}

const getFeedActionTitle = (action: FeedAction, language: LanguageCode) => {
  const titles = {
    buy: (shares: number, outcomeTitle?: string) => {
      if (language === 'tr') {
        return `${shares} adet "${outcomeTitle}" sonucu hisse senedi alındı`;
      }
      if (language === 'pt') {
        return `Comprou ${shares} ações de "${outcomeTitle}"`;
      }
      return `Bought ${shares} shares of outcome "${outcomeTitle}"`;
    },
    sell: (shares: number, outcomeTitle?: string) => {
      if (language === 'tr') {
        return `${shares} adet "${outcomeTitle}" sonucu hisse senedi satıldı`;
      }
      if (language === 'pt') {
        return `Vendeu ${shares} ações de "${outcomeTitle}"`;
      }
      return `Sold ${shares} shares of outcome "${outcomeTitle}"`;
    },
    add_liquidity: (shares: number, _outcomeTitle?: string) =>
      `Added ${shares} liquidity shares`,
    remove_liquidity: (shares: number, _outcomeTitle?: string) =>
      `Removed ${shares} liquidity shares`,
    claim_winnings: (_shares: number, _outcomeTitle?: string) =>
      'Won a prediction',
    create_market: (_shares: number, _outcomeTitle?: string) =>
      'Created a market',
    upvote: (_shares: number, _outcomeTitle?: string) => 'Upvoted a market',
    downvote: (_shares: number, _outcomeTitle?: string) => 'Downvoted a market'
  };
  return titles[action];
};

const feedAccentColors: { [key: string]: FeedActionAccentColor } = {
  buy: 'success',
  sell: 'danger',
  add_liquidity: 'primary',
  remove_liquidity: 'danger',
  claim_winnings: 'success',
  create_market: 'primary',
  upvote: 'success',
  downvote: 'danger'
};

function getPortfolioFeedByAddressTransformResponse(
  response: GetPortfolioFeedByAddressData,
  language: LanguageCode
): GetPortfolioFeedByAddressData {
  return response.map(feed => {
    return {
      ...feed,
      actionTitle: getFeedActionTitle(feed.action, language)(
        roundNumber(feed.shares, 3),
        feed.outcomeTitle
      ),
      accentColor: feedAccentColors[feed.action]
    };
  });
}

export {
  prepareLeaderboardRanksRow,
  preparePredictionStatisticsRow,
  getPortfolioFeedByAddressTransformResponse
};
