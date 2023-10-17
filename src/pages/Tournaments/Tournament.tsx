import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import isNull from 'lodash/isNull';
import type { Tournament as TournamentType } from 'types/tournament';
import { Avatar } from 'ui';

import { Pill } from 'components';

import styles from './Tournament.module.scss';

type TournamentProps = {
  tournament: Omit<TournamentType, 'group'>;
};

function Tournament({ tournament }: TournamentProps) {
  const altFormatter = useCallback((alt?: string): string | null => {
    if (!alt) return null;

    const altWithoutSpecialChars = alt.replace(/[^\w\s]/g, ' ');

    const words = altWithoutSpecialChars
      .trim()
      .split(' ')
      .filter(word => word !== '');

    const numberMatch = altWithoutSpecialChars.match(/\d+/);

    if (numberMatch) {
      const firstLetter = altWithoutSpecialChars[0];
      const number = numberMatch[0];
      return (firstLetter + number).toUpperCase();
    }

    if (words.length >= 2) {
      const firstLetters = words[0][0] + words[1][0];
      return firstLetters.toUpperCase();
    }

    return altWithoutSpecialChars.substring(0, 2).toUpperCase();
  }, []);

  const isTournamentEnded = dayjs()
    .utc()
    .isAfter(dayjs(tournament.expiresAt).utc());

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
        {isTournamentEnded ? <Pill badge>Ended</Pill> : null}
      </div>
    </Link>
  );
}

export default Tournament;
