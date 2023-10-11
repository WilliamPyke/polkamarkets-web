import { useMemo, useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import {
  useGetMarketsByIdsQuery,
  useGetTournamentsQuery
} from 'services/Polkamarkets';
import type { TournamentGroup as TournamentGroupType } from 'types/tournament';

import { AlertMini, Tabs } from 'components';

import TournamentGroup from './TournamentGroup';
import styles from './TournamentsList.module.scss';
import TournamentsUpcomingMarkets from './TournamentsUpcomingMarkets';

function TournamentsList() {
  const { data: tournaments, isFetching, isLoading } = useGetTournamentsQuery();
  const isLoadingGetTournamentsQuery = isFetching || isLoading;
  const isEmptyTournaments = !tournaments || isEmpty(tournaments);

  const [currentTab, setCurrentTab] = useState('all');

  const groups = useMemo(() => {
    if (isLoadingGetTournamentsQuery || isEmptyTournaments) return [];

    return orderBy(
      uniqBy(
        tournaments
          .map(tournament => tournament.group)
          .filter(group => group !== null) as TournamentGroupType[],
        'id'
      ).map(group => {
        const tournamentsInGroup = orderBy(
          tournaments
            .filter(tournament => tournament.group?.id === group.id)
            .map(tournament => omit(tournament, 'group')),
          'id'
        );

        return {
          ...group,
          tournaments: tournamentsInGroup
        };
      }),
      'position'
    );
  }, [isEmptyTournaments, isLoadingGetTournamentsQuery, tournaments]);

  const marketsIds = useMemo(() => {
    if (isLoadingGetTournamentsQuery || isEmptyTournaments) return [];

    return uniqBy(
      tournaments.map(tournament => tournament.markets || []).flat(),
      'slug'
    ).map(market => market.id);
  }, [isEmptyTournaments, isLoadingGetTournamentsQuery, tournaments]);

  const {
    data: markets,
    isLoading: isLoadingMarkets,
    isFetching: isFetchingMarkets
  } = useGetMarketsByIdsQuery(
    {
      ids: marketsIds,
      networkId: `${tournaments?.[0]?.networkId}`
    },
    {
      skip: isEmpty(marketsIds)
    }
  );

  const isLoadingGetMarketsByIdsQuery = isLoadingMarkets || isFetchingMarkets;

  if (isLoadingGetTournamentsQuery || isLoadingGetMarketsByIdsQuery)
    return (
      <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
        <span className="spinner--primary" />
      </div>
    );

  if (isEmpty(groups))
    return (
      <div className="padding-y-5 padding-x-4 width-full border-solid border-1 border-radius-small">
        <AlertMini
          style={{ border: 'none' }}
          styles="outline"
          variant="information"
          description="No tournaments available at the moment."
        />
      </div>
    );

  return (
    <>
      {markets ? (
        <div className={styles.upcoming}>
          <div className={styles.upcomingHeader}>
            <h2 className={styles.upcomingTitle}>Upcoming</h2>
          </div>
          <TournamentsUpcomingMarkets markets={markets} />
        </div>
      ) : null}
      <Tabs
        direction="row"
        fullwidth
        value={currentTab}
        onChange={tab => setCurrentTab(tab)}
        className={{
          root: styles.tabsRoot,
          header: styles.tabsHeader,
          item: styles.tabsItem
        }}
      >
        <Tabs.TabPane id="all" tab="All">
          <ul className={styles.root}>
            {groups.map(group => (
              <li key={group.id}>
                <TournamentGroup group={group} />
              </li>
            ))}
          </ul>
        </Tabs.TabPane>
        {groups.map(group => (
          <Tabs.TabPane
            key={group.id}
            id={group.id.toString()}
            tab={group.title}
          >
            <ul className={styles.root}>
              <TournamentGroup group={group} />
            </ul>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
}

export default TournamentsList;
