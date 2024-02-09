import { useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import keys from 'helpers/objectKeys';
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
import TournamentTopUsersRewards from './TournamentTopUsersRewards';

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

const tabs = {
  ranking: 'Ranking',
  rewards: 'Rewards'
} as const;

type TournamentTopUsersProps = {
  isLoading: boolean;
} & Pick<PrepareLeaderboardTableRowsArgs, 'rows'>;

function TournamentTopUsers({ rows, isLoading }: TournamentTopUsersProps) {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<'Ranking' | 'Rewards'>(
    tabs.ranking
  );

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

  const handleCurrentTab = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setCurrentTab(event.currentTarget.value as 'Ranking' | 'Rewards');
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
          {keys(tabs).map(tab => (
            <button
              role="tab"
              type="button"
              key={tab}
              value={tabs[tab]}
              aria-selected={currentTab === tabs[tab]}
              className={styles.tabsItem}
              onClick={handleCurrentTab}
            >
              {tabs[tab]}
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
            success: {
              [tabs.ranking]: <TableMini columns={columns} row={row} />,
              [tabs.rewards]: 'text'
            }[currentTab]
          }[state]
        }
      </div>
      <Divider />
      {
        {
          [tabs.ranking]: (
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
          [tabs.rewards]: <TournamentTopUsersRewards />
        }[currentTab]
      }
    </div>
  );
}

export default TournamentTopUsers;
