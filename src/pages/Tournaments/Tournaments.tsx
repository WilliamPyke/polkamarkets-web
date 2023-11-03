import classNames from 'classnames';
import { Container } from 'ui';

import styles from './Tournaments.module.scss';
import TournamentsHero from './TournamentsHero';
import TournamentsList from './TournamentsList';

function Tournaments() {
  return (
    <Container className={classNames('max-width-screen-xl', styles.root)}>
      <TournamentsHero />
      <div className="width-full">
        <TournamentsList />
      </div>
    </Container>
  );
}

export default Tournaments;
