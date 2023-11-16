import type { Land } from 'types/land';

import Tournament from 'pages/Tournaments/Tournament';

import { AlertMini } from 'components';

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
      {!tournaments.length ? (
        <div className="padding-y-5 padding-x-4 width-full border-solid border-1 border-radius-medium">
          <AlertMini
            style={{ border: 'none' }}
            styles="outline"
            variant="information"
            description="No tournaments available at the moment."
          />
        </div>
      ) : (
        <ul className={styles.list}>
          {tournaments.map(tournament => (
            <li key={tournament.id}>
              <Tournament tournament={tournament} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LandTournamentList;
