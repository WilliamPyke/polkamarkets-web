import { Link } from 'react-router-dom';

import type { Tournament as TournamentType } from 'types/tournament';
import { Avatar } from 'ui';

import styles from './Tournament.module.scss';

type TournamentProps = {
  tournament: Omit<TournamentType, 'group'>;
};

function Tournament({ tournament }: TournamentProps) {
  return (
    <Link to={`/tournaments/${tournament.slug}`} className={styles.root}>
      <div className={styles.content}>
        <Avatar
          $size="md"
          $radius="sm"
          src={tournament.imageUrl !== null ? tournament.imageUrl : undefined}
          alt={tournament.title}
          className={styles.contentAvatar}
        />
        <div>
          <h4 className={styles.contentTitle}>{tournament.title}</h4>
        </div>
      </div>
    </Link>
  );
}

export default Tournament;
