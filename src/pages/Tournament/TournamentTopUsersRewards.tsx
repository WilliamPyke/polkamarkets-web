import { useState } from 'react';

import Icon from 'components/Icon';

import styles from './TournamentTopUsers.module.scss';

export default function TournamentTopUsersRewards() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.action}
        onClick={() => {
          setShow(true);
        }}
      >
        View Ranking
        <Icon
          name="Arrow"
          size="md"
          dir="right"
          className={styles.actionIcon}
        />
      </button>
    </>
  );
}
