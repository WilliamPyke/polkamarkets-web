import { useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import capitalize from 'lodash/capitalize';
import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import Divider from 'ui/Divider';

import AlertMini from 'components/Alert/AlertMini';
import Icon from 'components/Icon';
import TableMini from 'components/new/TableMini/TableMini';

import type { PrepareLeaderboardTableRowsArgs } from '../Leaderboard/prepare';
import styles from './TournamentTopUsers.module.scss';
import { TournamentTopUsersColumn } from './TournamentTopUsers.types';
import {
  topUserColumnRender,
  prepareTournamentTopUsersRow
} from './TournamentTopUsers.utils';

const columns: TournamentTopUsersColumn[] = [
  {
    key: 'firstPlace',
    title: 'First place',
    render: topUserColumnRender
  },
  {
    key: 'secondPlace',
    title: 'Second place',
    render: topUserColumnRender
  },
  {
    key: 'thirdPlace',
    title: 'Third place',
    render: topUserColumnRender
  }
];

type TournamentTopUsersProps = {
  isLoading: boolean;
} & Pick<PrepareLeaderboardTableRowsArgs, 'rows'>;

function TournamentTopUsers({ rows, isLoading }: TournamentTopUsersProps) {
  const location = useLocation();

  const [tab, setTab] = useState('ranking');

  const row = useMemo(() => prepareTournamentTopUsersRow({ rows }), [rows]);
  const state = useMemo(() => {
    if (isLoading) return 'loading';
    if (
      isEmpty(row) ||
      every(
        Object.values(row).map(v => v.value),
        isNull
      )
    )
      return 'error';
    return 'success';
  }, [isLoading, row]);

  const handleTab = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setTab(event.currentTarget.value);
    },
    []
  );

  return (
    <div
      className={classNames(
        'border-radius-medium border-solid border-1',
        styles.root
      )}
    >
      <div className={classNames('pm-c-leaderboard-stats bg-3')}>
        <div className={styles.tabs}>
          {['ranking', 'rewards'].map(_tab => (
            <button
              role="tab"
              type="button"
              value={_tab}
              key={_tab}
              aria-selected={tab === _tab}
              className={styles.tabsItem}
              onClick={handleTab}
            >
              {capitalize(_tab)}
            </button>
          ))}
        </div>
        {
          {
            loading: (
              <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
                <span className="spinner--primary" />
              </div>
            ),
            error: (
              <AlertMini
                style={{ border: 'none' }}
                styles="outline"
                variant="information"
                description="No data to show."
              />
            ),
            success: (
              // @ts-ignore
              <TableMini
                columns={tab === 'ranking' ? columns : columns}
                row={tab === 'ranking' ? row : row}
              />
            )
          }[state]
        }
      </div>
      <Divider />
      {
        {
          ranking: (
            <Link
              to={`${location.pathname}/leaderboard`}
              className={styles.action}
            >
              View Leaderboard
              <Icon
                name="Arrow"
                size="md"
                dir="right"
                className={styles.actionIcon}
              />
            </Link>
          ),
          rewards: 'ranking'
        }[tab]
      }
    </div>
  );
}

export default TournamentTopUsers;
