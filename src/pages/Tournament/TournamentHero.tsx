import { ReactNode } from 'react';

import { ui } from 'config';
import { Container, Hero } from 'ui';

import { Pill, Text } from 'components';

import styles from './TournamentHero.module.scss';

type TournamentHeroProps = {
  groupName?: string;
  tournamentName?: string;
  tournamentDescription?: string;
  topUsers?: ReactNode;
};

export default function TournamentHero({
  groupName,
  tournamentName,
  tournamentDescription,
  topUsers
}: TournamentHeroProps) {
  return (
    <Container className={styles.header}>
      <Hero
        $backdrop="main"
        $rounded
        $image={ui.hero.image}
        className={`pm-p-home__hero ${styles.headerHero}`}
      >
        <div className={styles.headerHeroContent}>
          <div>
            <div className="pm-p-home__hero__breadcrumb">
              {groupName ? (
                <Pill
                  color="primary"
                  className={{
                    root: styles.headerHeroContentPill,
                    text: styles.headerHeroContentPillText
                  }}
                >
                  {groupName}
                </Pill>
              ) : null}
            </div>
            {tournamentName ? (
              <Text
                as="h2"
                fontWeight="bold"
                scale="heading-large"
                color="light"
                className="pm-p-home__hero__heading"
              >
                {tournamentName}
              </Text>
            ) : null}
            {tournamentDescription ? (
              <Text as="span" fontWeight="medium" color="light">
                {tournamentDescription}
              </Text>
            ) : null}
          </div>
          {topUsers || null}
        </div>
      </Hero>
    </Container>
  );
}
