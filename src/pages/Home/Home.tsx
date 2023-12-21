import classNames from 'classnames';
import { useGetLandsQuery } from 'services/Polkamarkets';
import { Container } from 'ui';

import styles from './Home.module.scss';
import HomeCommunityLands from './HomeCommunityLands';

function Home() {
  const { data: lands } = useGetLandsQuery();

  return (
    <Container className={classNames('max-width-screen-xl', styles.root)}>
      <HomeCommunityLands lands={lands || []} />
    </Container>
  );
}

export default Home;
