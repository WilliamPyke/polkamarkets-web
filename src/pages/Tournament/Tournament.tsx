import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ui } from 'config';
import { useGetTournamentBySlugQuery } from 'services/Polkamarkets';
import { Container, useRect, useTheme } from 'ui';

import { MarketList } from 'components';

import { useNetwork } from 'hooks';

import styles from '../Home/Home.module.scss';
import HomeFilter from '../Home/HomeFilter';
import TournamentHero from './TournamentHero';
import TournamentNav from './TournamentNav';

export default function Tournament() {
  const { slug } = useParams<{ slug: string }>();
  const { network } = useNetwork();
  const theme = useTheme();
  const [ref, rect] = useRect();
  const [show, setShow] = useState(false);

  const { data, isLoading, isFetching } = useGetTournamentBySlugQuery({ slug });
  const isLoadingTournament = isLoading || isFetching;

  const marketsIds =
    data && data.markets ? data.markets.map(market => market.id) : [];
  const networkId = data ? data.networkId : network.id;

  const handleShow = useCallback(() => setShow(true), []);
  const handleHide = useCallback(() => setShow(false), []);
  const handleToggle = useCallback(() => setShow(prevShow => !prevShow), []);

  return (
    <div className="max-width-screen-xl">
      {ui.hero.enabled && <TournamentHero />}
      <Container ref={ref} className={styles.nav}>
        <TournamentNav
          onFilterClick={theme.device.isDesktop ? handleToggle : handleShow}
        />
      </Container>
      <div className={styles.root}>
        <HomeFilter onFilterHide={handleHide} rect={rect} show={show} />
        {!isLoadingTournament && (
          <MarketList
            filtersVisible={show}
            fetchByIds={{
              ids: marketsIds,
              networkId: parseInt(`${networkId}`, 10)
            }}
          />
        )}
      </div>
    </div>
  );
}
