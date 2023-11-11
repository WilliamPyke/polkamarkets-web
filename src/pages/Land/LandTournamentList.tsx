import type { Land } from 'types/land';

import Tournament from 'pages/Tournaments/Tournament';

import styles from './LandTournamentList.module.scss';

type LandTournamentListProps = {
  tournaments: Land['tournaments'];
};

function LandTournamentList({ tournaments }: LandTournamentListProps) {
  return (
    <div className={styles.root}>
      <div className={styles.rootHeader}>
        <h2 className={styles.rootTitle}>Tournaments</h2>
      </div>
      <ul className={styles.list}>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            <Tournament tournament={tournament} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandTournamentList;
