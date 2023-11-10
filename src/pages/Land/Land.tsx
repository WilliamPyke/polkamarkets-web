import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import {
  useGetLandBySlugQuery,
  useGetMarketsByIdsQuery
} from 'services/Polkamarkets';
import { Container } from 'ui';

import { AlertMini } from 'components';

import TournamentsUpcomingMarkets from '../Tournaments/TournamentsUpcomingMarkets';
import LandHero from './LandHero';

function Land() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: land,
    isLoading: isLoadingLand,
    isFetching: isFetchingLand
  } = useGetLandBySlugQuery({ slug }, { skip: !slug });

  const isLoadingGetLandBySlugQuery = isLoadingLand || isFetchingLand;
  const isEmptyLand = !land || isEmpty(land);

  const marketsIds = useMemo(() => {
    if (isLoadingGetLandBySlugQuery || isEmptyLand) return [];

    return uniqBy(
      land.tournaments.map(tournament => tournament.markets || []).flat(),
      'slug'
    ).map(market => market.id);
  }, [isEmptyLand, isLoadingGetLandBySlugQuery, land]);

  const {
    data: markets,
    isLoading: isLoadingMarkets,
    isFetching: isFetchingMarkets
  } = useGetMarketsByIdsQuery(
    {
      ids: marketsIds,
      networkId: `${land?.tournaments?.[0]?.networkId}`
    },
    {
      skip: isEmpty(marketsIds)
    }
  );

  const isLoadingGetMarketsByIdsQuery = isLoadingMarkets || isFetchingMarkets;

  if (isLoadingGetLandBySlugQuery || isLoadingGetMarketsByIdsQuery)
    return (
      <div className="flex-row justify-center align-center width-full padding-y-5 padding-x-4">
        <span className="spinner--primary" />
      </div>
    );

  if (isEmptyLand)
    return (
      <div className="padding-y-5 padding-x-4 width-full border-solid border-1 border-radius-small">
        <AlertMini
          style={{ border: 'none' }}
          styles="outline"
          variant="information"
          description="No data available at the moment."
        />
      </div>
    );

  const { title, description, imageUrl, bannerUrl } = land;

  return (
    <Container className={classNames('max-width-screen-xl')}>
      <LandHero {...{ title, description, imageUrl, bannerUrl }} />
      <div className="width-full">
        <TournamentsUpcomingMarkets markets={markets || []} />
      </div>
    </Container>
  );
}

export default Land;
