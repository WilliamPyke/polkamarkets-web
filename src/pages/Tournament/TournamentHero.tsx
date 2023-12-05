import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ui } from 'config';
import { Avatar, Container, Hero } from 'ui';

import { Button, Icon, Share } from 'components';

import styles from './TournamentHero.module.scss';

type TournamentHeroProps = {
  landName?: string;
  landImageUrl?: string | null;
  landBannerUrl?: string | null;
  tournamentName?: string;
  tournamentDescription?: string;
  tournamentSlug?: string;
  tournamentImageUrl?: string | null;
  topUsers?: ReactNode;
};

export default function TournamentHero({
  landName,
  landImageUrl,
  landBannerUrl,
  tournamentName,
  tournamentDescription,
  tournamentSlug,
  tournamentImageUrl,
  topUsers
}: TournamentHeroProps) {
  return (
    <Container className={styles.wrapper}>
      <div className={styles.root}>
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
          {tournamentImageUrl ? (
            <Avatar
              $radius="md"
              src={tournamentImageUrl}
              alt={tournamentName}
              className={styles.rootHeroAvatar}
            />
          ) : null}
          <div className={styles.rootHeroContent}>
            <div>
              <div className={styles.rootHeroContentLand}>
                {landImageUrl ? (
                  <Avatar
                    $radius="lg"
                    src={landImageUrl}
                    alt={landName}
                    className={styles.rootHeroContentLandAvatar}
                  />
                ) : null}
                {landName ? (
                  <h4 className={styles.rootHeroContentLandName}>{landName}</h4>
                ) : null}
              </div>
              {tournamentName ? (
                <h2 className={styles.rootHeroContentName}>{tournamentName}</h2>
              ) : null}
              {tournamentDescription ? (
                <p className={styles.rootHeroContentDescription}>
                  {tournamentDescription}
                </p>
              ) : null}
            </div>
            {topUsers || null}
          </div>
        </Hero>
        <div className={styles.rootFooter} />
      </div>
    </Container>
  );
}
