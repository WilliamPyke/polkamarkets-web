import classNames from 'classnames';
import { ui } from 'config';
import { Land } from 'types/land';
import { Avatar, Container, Hero } from 'ui';

import { Share, Text } from 'components';

import styles from './LandHero.module.scss';

type LandHeroProps = Pick<
  Land,
  'slug' | 'title' | 'description' | 'imageUrl' | 'bannerUrl'
>;

export default function LandHero({
  slug,
  title,
  description,
  imageUrl,
  bannerUrl
}: LandHeroProps) {
  return (
    <Container className={styles.header}>
      <Hero
        $rounded
        $image={bannerUrl || ui.hero.image}
        className={classNames('pm-p-home__hero', styles.headerHero)}
      >
        <div className="pm-p-home__hero__content">
          <div className={styles.meta}>
            {imageUrl ? (
              <Avatar
                src={imageUrl}
                alt={title}
                $radius="md"
                className={styles.metaAvatar}
              />
            ) : null}
            <div className={styles.metaDetails}>
              <Text
                as="h2"
                fontWeight="bold"
                scale="heading-large"
                color="light"
                className={classNames(
                  'pm-p-home__hero__heading',
                  styles.metaDetailsTitle
                )}
              >
                {title}
              </Text>
              <Text
                as="span"
                fontWeight="medium"
                color="light"
                className={styles.metaDetailsDescription}
              >
                {description}
              </Text>
              <div className={styles.headerHeroActions}>
                <Share
                  id={slug}
                  size="xs"
                  variant="normal"
                  color="default"
                  iconOnly={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Hero>
    </Container>
  );
}
