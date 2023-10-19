import cn from 'classnames';
import { relativeTimeFromNow } from 'helpers/date';
import isNull from 'lodash/isNull';
import type { Comment } from 'types/market';
import Avatar from 'ui/Avatar';

import { Button } from 'components';

import { useAppSelector, useLanguage } from 'hooks';

import styles from './MarketComments.module.scss';

function MarketNewComment() {
  return (
    <form action="">
      <div className={styles.newComment}>
        <Avatar
          src="https://drive.google.com/uc?id=184zxQaHisHzJnKO1L1FbelwRV4O5EFAT&export=download"
          alt=""
          $size="sm"
          className={styles.commentAvatar}
        />
        <div className={styles.newCommentBox}>
          <textarea
            rows={6}
            className={styles.newCommentBoxTextarea}
            placeholder="Write a comment..."
          />
          <div className={styles.newCommentBoxFooter}>
            <Button type="submit" size="xs" color="primary">
              Comment
            </Button>
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
