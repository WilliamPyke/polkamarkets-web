import { Link } from 'react-router-dom';

import type { Tournament as TournamentType } from 'types/tournament';

import Tournament from './Tournament';
import styles from './TournamentGroup.module.scss';

type TournamentGroupProps = {
  group: TournamentType['land'] & {
    tournaments: Omit<TournamentType, 'land'>[];
  };
};

function TournamentGroup({ group }: TournamentGroupProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Link to={`/lands/${group.slug}`} className={styles.title}>
          {group.title}
        </Link>
        <p className={styles.description}>{group.description}</p>
      </div>
      <ul className={styles.list}>
        {group.tournaments.map(tournament => (
          <li key={tournament.id}>
            <Tournament tournament={tournament} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentGroup;
