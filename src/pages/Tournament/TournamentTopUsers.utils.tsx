import { Link } from 'react-router-dom';

import type { GetLeaderboardByTimeframeData } from 'services/Polkamarkets/types';

const USER_PLACES = {
  1: {
    textColor: 'warning'
  },
  2: {
    textColor: 'violets-are-blue'
  },
  3: {
    textColor: 'maximum-blue-green'
  },
  4: {
    textColor: 'tickle-me-pink'
  }
};

type TopUserRenderArgs = {
  address: string;
  place: number;
};

function topUserColumnRender({ address, place }: TopUserRenderArgs) {
  const walletPlace = USER_PLACES[place] || {
    textColor: '1'
  };

  return (
    <div className="pm-c-leaderboard-top-wallets__wallet notranslate">
      <Link
        className={`caption semibold text-${walletPlace.textColor}`}
        to={`/user/${address}`}
      >
        {address.startsWith('0x')
          ? `${address.substring(0, 6)}...${address.substring(
              address.length - 4
            )}`
          : address}
      </Link>
    </div>
  );
}

type TopUserRowRenderArgs = {
  place: number;
  change: 'up' | 'down' | 'stable';
};

function topUserRowRender({ place }: TopUserRowRenderArgs) {
  return (
    <div className="pm-c-leaderboard-table__rank">
      <span className="caption semibold text-1">{place}</span>
      {/* {change === 'up' ? <RankUpIcon /> : null}
      {change === 'down' ? <RankDownIcon /> : null}
      {change === 'stable' ? <RankStableIcon /> : null} */}
    </div>
  );
}

type PrepareTournamentTopUsersRowArgs = {
  rows?: GetLeaderboardByTimeframeData;
};

function prepareTournamentTopUsersRow({
  rows = []
}: PrepareTournamentTopUsersRowArgs) {
  const firstPlace = rows && rows[0];
  const secondPlace = rows && rows[1];
  const thirdPlace = rows && rows[2];
  const fourthPlace = rows && rows[3];

  return {
    firstPlace: {
      value: firstPlace
        ? {
            address: firstPlace.username || firstPlace.user,
            place: 1,
            change: 'stable'
          }
        : null,
      render: topUserRowRender
    },
    secondPlace: {
      value: secondPlace
        ? {
            address: secondPlace.username || secondPlace.user,
            place: 2,
            change: 'stable'
          }
        : null,
      render: topUserRowRender
    },
    thirdPlace: {
      value: thirdPlace
        ? {
            address: thirdPlace.username || thirdPlace.user,
            place: 3,
            change: 'stable'
          }
        : null,
      render: topUserRowRender
    },
    fourthPlace: {
      value: fourthPlace
        ? {
            address: fourthPlace.username || fourthPlace.user,
            place: 4,
            change: 'stable'
          }
        : null,
      render: topUserRowRender
    }
  };
}

export { topUserColumnRender, prepareTournamentTopUsersRow };
