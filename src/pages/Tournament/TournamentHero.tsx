import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ui } from 'config';
import { Container, Hero } from 'ui';

import { Button, Icon, Pill, Share, Text } from 'components';

import styles from './TournamentHero.module.scss';

type TournamentHeroProps = {
  landName?: string;
  landSlug?: string;
  landBannerUrl?: string | null;
  tournamentName?: string;
  tournamentDescription?: string;
  tournamentSlug?: string;
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
    <Container className={styles.root}>
      <div className={styles.rootHeader}>
        <div className={styles.rootHeaderNavigation}>
          <Link to="/tournaments">
            <Button className={styles.rootHeaderNavigationButton}>
              <Icon name="Arrow" />
            </Button>
          </Link>
          {landName ? (
            <h4 className={styles.rootHeaderNavigationText}>{landName}</h4>
          ) : null}
        </div>
        <div className={styles.rootHeaderActions}>
          {tournamentSlug ? (
            <Share
              id={tournamentSlug}
              className={styles.rootHeaderActionsButton}
            />
          ) : null}
        </div>
      </div>
      <Hero
        $backdrop="main"
        $rounded
        $image={landBannerUrl || ui.hero.image}
        className={`pm-p-home__hero ${styles.rootHero}`}
      >
        <div className={styles.rootHeroContent}>
          <div>
            <div className="pm-p-home__hero__breadcrumb">
              {landName && landSlug ? (
                <Link to={`/lands/${landSlug}`}>
                  <Pill
                    color="primary"
                    className={{
                      root: styles.rootHeroContentPill,
                      text: styles.rootHeroContentPillText
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
            {tournamentSlug ? (
              <div className={styles.rootHeroActions}>
                <Share
                  id={`${tournamentSlug}-hero`}
                  size="xs"
                  variant="normal"
                  color="default"
                  iconOnly={false}
                />
              </div>
            ) : null}
          </div>
          {topUsers || null}
        </div>
      </Hero>
      <div className={styles.rootFooter} />
    </Container>
  );
}
