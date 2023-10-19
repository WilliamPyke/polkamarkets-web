import cn from 'classnames';
import { relativeTimeFromNow } from 'helpers/date';
import isNull from 'lodash/isNull';
import type { Comment } from 'types/market';
import Avatar from 'ui/Avatar';

import { Button, Icon, ProfileSignin } from 'components';

import { useAppSelector, useLanguage } from 'hooks';

import styles from './MarketComments.module.scss';

function MarketNewComment() {
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);

  const user = useAppSelector(state => state.polkamarkets.socialLoginInfo);
  const isLoadingUser = useAppSelector(
    state => state.polkamarkets.isLoading.login
  );

  const username = user?.name?.includes('#')
    ? user?.name?.split('#')[0]
    : user?.name?.split('@')[0];

  const avatar = user?.profileImage;

  return (
    <form action="">
      <div className={styles.newComment}>
        <Avatar
          src={avatar}
          alt={username || 'Avatar'}
          $size="sm"
          className={styles.commentAvatar}
        />
        <div className={styles.newCommentBox}>
          <textarea
            rows={6}
            className={styles.newCommentBoxTextarea}
            placeholder="Write a comment..."
            disabled={isLoadingUser || !isLoggedIn}
          />
          <div className={styles.newCommentBoxFooter}>
            {!isLoadingUser && !isLoggedIn ? (
              <ProfileSignin size="xs" color="primary">
                <Icon
                  name="LogIn"
                  size="md"
                  className={styles.newCommentBoxFooterSigninIcon}
                />
                Login
              </ProfileSignin>
            ) : null}
            {isLoadingUser || (!isLoadingUser && isLoggedIn) ? (
              <Button
                type="submit"
                size="xs"
                color="primary"
                disabled={isLoadingUser}
              >
                Comment
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}

type MarketCommentProps = Comment;

function MarketComment({ user, body, timestamp }: MarketCommentProps) {
  const lang = useLanguage();

  return (
    <div className={styles.comment}>
      <Avatar
        src={!isNull(user.avatar) ? user.avatar : undefined}
        alt={user.username}
        $size="sm"
        className={styles.commentAvatar}
      />
      <div className={styles.commentBody}>
        <p className={styles.commentBodyDetails}>
          <span className={styles.commentBodyDetailsUsername}>
            {user.username}
          </span>
          <span className={styles.commentBodyDetailsDivider}>&middot;</span>
          {relativeTimeFromNow(timestamp * 1000, lang)}
        </p>
        <p className={styles.commentBodyContent}>{body}</p>
      </div>
    </div>
  );
}

export default function MarketComments() {
  const comments = useAppSelector(state => state.market.market.comments);

  return (
    <div>
      <MarketNewComment />
      <ul className={styles.comments}>
        {comments.map((comment, index) => (
          <li
            key={comment.id}
            className={cn({
              'bg-3': index % 2 === 0
            })}
          >
            <MarketComment {...comment} />
          </li>
        ))}
      </ul>
    </div>
  );
}
