import { Container } from 'ui';

import TournamentsList from './TournamentsList';

function Tournaments() {
  return (
    <Container className="pm-p-leaderboard max-width-screen-xl">
      <div className="width-full">
        <TournamentsList />
      </div>
    </Container>
  );
}

export default Tournaments;
