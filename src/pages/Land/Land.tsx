import { useMemo } from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import { useGetMarketsByIdsQuery } from 'services/Polkamarkets';
import { Container } from 'ui';

import TournamentsUpcomingMarkets from '../Tournaments/TournamentsUpcomingMarkets';
import mock from './Land.mock';

function Land() {
  const { tournaments } = mock;

  const marketsIds = useMemo(() => {
    return uniqBy(
      tournaments.map(tournament => tournament.markets || []).flat(),
      'slug'
    ).map(market => market.id);
  }, [tournaments]);

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

  if (isLoadingGetMarketsByIdsQuery)
    return (
      <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
        <span className="spinner--primary" />
      </div>
    );

  return (
    <Container className={classNames('max-width-screen-xl')}>
      <div className="width-full">
        <TournamentsUpcomingMarkets markets={markets || []} />
      </div>
    </Container>
  );
}

export default Land;
