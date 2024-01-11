import { Text } from 'components';

import classes from './LeaderboardPrizes.module.scss';

type LeaderboardPrizesProps = {
  rewards: Array<Record<'title' | 'description', string>>;
};

export default function LeaderboardPrizes({ rewards }: LeaderboardPrizesProps) {
  return (
    <div className="pm-c-leaderboard-stats bg-3 border-radius-medium border-solid border-1">
      <h3 className="body semibold text-1">Rewards</h3>
      <ul>
        {rewards.map(reward => (
          <li key={reward.title} className={classes.prizesPrize}>
            <Text
              scale="caption"
              fontWeight="medium"
              className={classes.prizesPrizePrimary}
            >
              {reward.title}
            </Text>
            <Text scale="caption" color="lighter-gray">
              {reward.description}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
