import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import cn from 'classnames';
import { ui } from 'config';
import {
  useGetLeaderboardByTimeframeQuery,
  useGetTournamentBySlugQuery
} from 'services/Polkamarkets';
import { Container, useRect, useTheme } from 'ui';

import { MarketList } from 'components';

import { useNetwork } from 'hooks';

import HomeFilter from '../Home/HomeFilter';
import TournamentHero from './TournamentHero';
import TournamentNav from './TournamentNav';
import styles from './TournamentNav.module.scss';
import TournamentTopUsers from './TournamentTopUsers';

export default function Tournament() {
  const theme = useTheme();
  const { network } = useNetwork();
  const { slug } = useParams<{ slug: string }>();

  const [ref, rect] = useRect();
  const [show, setShow] = useState(false);

  const { data, isLoading, isFetching } = useGetTournamentBySlugQuery({ slug });
  const isLoadingTournamentBySlugQuery = isLoading || isFetching;

  const {
    data: leaderboardByTimeframe,
    isLoading: isLoadingLeaderboardByTimeframe,
    isFetching: isFetchingLeaderboardByTimeframe
  } = useGetLeaderboardByTimeframeQuery(
    {
      timeframe: 'at',
      networkId: network.id,
      tournamentId: data?.id.toString()
    },
    {
      skip: isLoadingTournamentBySlugQuery
    }
  );

  const isLoadingLeaderboardByTimeframeQuery =
    isLoadingLeaderboardByTimeframe || isFetchingLeaderboardByTimeframe;

  const marketsIds = useMemo(
    () => (data && data.markets ? data.markets.map(market => market.id) : []),
    [data]
  );
  const networkId = data ? data.networkId : network.id;

  const handleShow = useCallback(() => setShow(true), []);
  const handleHide = useCallback(() => setShow(false), []);
  const handleToggle = useCallback(() => setShow(prevShow => !prevShow), []);

  const fetchByIds = useMemo(
    () => ({ ids: marketsIds, networkId: parseInt(`${networkId}`, 10) }),
    [marketsIds, networkId]
  );

  return (
    <div className="max-width-screen-xl">
      {ui.hero.enabled && (
        <TournamentHero
          topUsers={
            <TournamentTopUsers
              rows={leaderboardByTimeframe}
              sortBy="wonPredictions"
              isLoading={isLoadingLeaderboardByTimeframeQuery}
            />
          }
        />
      )}
      <Container ref={ref} className={styles.nav}>
        <TournamentNav
          onFilterClick={theme.device.isDesktop ? handleToggle : handleShow}
        />
      </Container>
      <div className={styles.root}>
        <HomeFilter onFilterHide={handleHide} rect={rect} show={show} />
        {isLoadingTournamentBySlugQuery ? (
          <div
            className={cn('pm-c-market-list', {
              'pm-c-market-list--filters-visible': show
            })}
          >
            <div className="pm-c-market-list__empty-state">
              <div className="pm-c-market-list__empty-state__body">
                <span className="spinner--primary" />
              </div>
            </div>
          </div>
        ) : (
          <MarketList filtersVisible={show} fetchByIds={fetchByIds} />
        )}
      </div>
    </div>
  );
}
