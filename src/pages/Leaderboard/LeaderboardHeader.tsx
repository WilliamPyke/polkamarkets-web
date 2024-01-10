import { Link as RouterLink } from 'react-router-dom';

import isNull from 'lodash/isNull';
import { Image, useTheme } from 'ui';

import { Icon, Text } from 'components';

import classes from './LeaderboardHeader.module.scss';

type LeaderboardHeaderProps = {
  isTournament?: boolean;
  slug?: string;
  imageUrl: string | null;
  title: string;
  description?: string;
};

export default function LeaderboardHeader({
  isTournament,
  slug,
  imageUrl,
  title,
  description
}: LeaderboardHeaderProps) {
  const theme = useTheme();

  return (
    <header className={classes.root}>
      <nav className={classes.nav}>
        {isTournament && (
          <RouterLink to={`/tournaments/${slug}`}>
            <span className={classes.navBack}>
              <Icon
                name="Arrow"
                title="Back to Tournament"
                size="sm"
                className={classes.navBackIcon}
              />
            </span>
            <Text as="span" scale="tiny-uppercase">
              Voltar
            </Text>
          </RouterLink>
        )}
      </nav>
      <div className={classes.content}>
        {!isNull(imageUrl) && (
          <Image
            $size={theme.device.isDesktop ? 'lg' : 'md'}
            $radius={theme.device.isDesktop ? 'md' : 'sm'}
            className={classes.contentImage}
            src={imageUrl}
          />
        )}
        <div>
          <div className="align-center">
            <Text scale="caption" as="p" className={classes.contentCaption}>
              Rank table
            </Text>
            <Text scale="heading-large" fontWeight="regular" as="h2">
              {title}
            </Text>
          </div>
          {description && (
            <Text scale="caption" as="p" className="whitespace-pre-line">
              {description}
            </Text>
          )}
        </div>
      </div>
    </header>
  );
}
