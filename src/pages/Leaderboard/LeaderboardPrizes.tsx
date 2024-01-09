import { Text } from 'components';

import classes from './LeaderboardPrizes.module.scss';

type LeaderboardPrizesProps = {
  prizes: Array<Record<'primary' | 'secondary', string>>;
};

export default function LeaderboardPrizes({ prizes }: LeaderboardPrizesProps) {
  return (
    <div className="pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1">
      <h3 className="body semibold text-1">Prizes</h3>
      <ul>
        {prizes.map(prize => (
          <li key={prize.primary} className={classes.prizesPrize}>
            <Text
              scale="caption"
              fontWeight="medium"
              className={classes.prizesPrizePrimary}
            >
              {prize.primary}
            </Text>
            <Text scale="caption" color="lighter-gray">
              {prize.secondary}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
