import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import isNull from 'lodash/isNull';
import type { Tournament as TournamentType } from 'types/tournament';
import { Avatar } from 'ui';

import styles from './Tournament.module.scss';

type TournamentProps = {
  tournament: Omit<TournamentType, 'group'>;
};

function Tournament({ tournament }: TournamentProps) {
  const altFormatter = useCallback((alt?: string): string | null => {
    if (!alt) return null;
    const words = alt.replace(/\s+/g, ' ').trim().split(' ');

    const numberMatch = alt.match(/\d+/);
    if (numberMatch) {
      const firstLetter = alt[0];
      const number = numberMatch[0];
      return (firstLetter + number).toUpperCase();
    }
    if (words.length >= 2) {
      const firstLetters = words[0][0] + words[1][0];
      return firstLetters.toUpperCase();
    }
    return alt.substring(0, 2).toUpperCase();
  }, []);

  return (
    <Link to={`/tournaments/${tournament.slug}`} className={styles.root}>
      <div className={styles.content}>
        <Avatar
          $size="md"
          $radius="sm"
          src={!isNull(tournament.imageUrl) ? tournament.imageUrl : undefined}
          alt={tournament.title}
          altFormatter={altFormatter}
          className={styles.contentAvatar}
          fallbackClassName={styles.contentAvatarFallback}
        />
        <div>
          <h4 className={styles.contentTitle}>{tournament.title}</h4>
          <div className={styles.stats}>
            <span className={styles.statsTitle}>
              Ends At:
              <strong className={`${styles.statsValue} notranslate`}>
                {dayjs(tournament.expiresAt).utc(true).format('MMMM D, YYYY')}
              </strong>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.stats}>
          <span className={styles.statsTitle}>
            Users:
            <strong className={`${styles.statsValue} notranslate`}>
              {tournament.users}
            </strong>
          </span>
          {tournament.markets ? (
            <>
              <span className="pm-c-divider--circle" />
              <span className={styles.statsTitle}>
                Markets:
                <strong className={`${styles.statsValue} notranslate`}>
                  {tournament.markets.length}
                </strong>
              </span>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default Tournament;
