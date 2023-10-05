import { useMemo } from 'react';

import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { useGetTournamentsQuery } from 'services/Polkamarkets';
import type { TournamentGroup as TournamentGroupType } from 'types/tournament';

import { AlertMini } from 'components';

import TournamentGroup from './TournamentGroup';
import styles from './TournamentsList.module.scss';

function TournamentsList() {
  const { data: tournaments, isFetching, isLoading } = useGetTournamentsQuery();
  const isLoadingTournaments = isFetching || isLoading;
  const isEmptyTournaments = !tournaments || isEmpty(tournaments);

  const groups = useMemo(() => {
    if (isLoadingTournaments || isEmptyTournaments) return [];

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
  }, [isEmptyTournaments, isLoadingTournaments, tournaments]);

  if (isLoadingTournaments)
    return (
      <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
        <span className="spinner--primary" />
      </div>
    );

  if (isEmpty(groups))
    return (
      <AlertMini
        style={{ border: 'none' }}
        styles="outline"
        variant="information"
        description="No tournaments available at the moment."
      />
    );

  return (
    <ul className={styles.root}>
      {groups.map(group => (
        <li key={group.id}>
          <TournamentGroup group={group} />
        </li>
      ))}
    </ul>
  );
}

export default TournamentsList;
