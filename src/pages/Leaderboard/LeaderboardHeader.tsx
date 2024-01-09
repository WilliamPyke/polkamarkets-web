import { Link } from 'react-router-dom';

import { isNull } from 'lodash';
import { Image } from 'ui';

import Icon from 'components/Icon';

import classes from './LeaderboardHeader.module.scss';

export default function LeaderboardHeader({
  slug,
  imageUrl
}: {
  imageUrl: null | string;
  slug?: string;
}) {
  return (
    <header className={classes.root}>
      <nav className={classes.nav}>
        <Link to={`/tournaments/${slug}`}>
          <span className={classes.navButton}>
            <Icon
              name="Arrow"
              title="Back to Tournament"
              className={classes.navButtonIcon}
            />
          </span>
          Voltar
        </Link>
      </nav>
      <div className={classes.content}>
        {!isNull(imageUrl) && <Image $size="lg" $radius="md" src={imageUrl} />}
        <div>hey</div>
      </div>
    </header>
  );
}
