import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ui } from 'config';
import { Container, Hero } from 'ui';

import { Pill, Share, Text } from 'components';

import styles from './TournamentHero.module.scss';

type TournamentHeroProps = {
  landName?: string;
  landSlug?: string;
  landBannerUrl?: string | null;
  tournamentName?: string;
  tournamentDescription?: string;
  tournamentSlug: string;
  topUsers?: ReactNode;
};

export default function TournamentHero({
  landName,
  landSlug,
  landBannerUrl,
  tournamentName,
  tournamentDescription,
  tournamentSlug,
  topUsers
}: TournamentHeroProps) {
  return (
    <Container className={styles.header}>
      <Hero
        $backdrop="main"
        $rounded
        $image={landBannerUrl || ui.hero.image}
        className={`pm-p-home__hero ${styles.headerHero}`}
      >
        <div className={styles.headerHeroContent}>
          <div>
            <div className="pm-p-home__hero__breadcrumb">
              {landName && landSlug ? (
                <Link to={`/lands/${landSlug}`}>
                  <Pill
                    color="primary"
                    className={{
                      root: styles.headerHeroContentPill,
                      text: styles.headerHeroContentPillText
                    }}
                  >
                    {landName}
                  </Pill>
                </Link>
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
            <div className={styles.headerHeroActions}>
              <Share
                id={`${tournamentSlug}-hero`}
                size="xs"
                variant="normal"
                color="default"
                iconOnly={false}
              />
            </div>
          </div>
          {topUsers || null}
        </div>
      </Hero>
    </Container>
  );
}
