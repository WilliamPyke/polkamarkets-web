import cn from 'classnames';
import dayjs from 'dayjs';
import { relativeTimeFromNow } from 'helpers/date';
import type { Comment } from 'types/market';
import Avatar from 'ui/Avatar';

import { useLanguage } from 'hooks';

import styles from './MarketComments.module.scss';

const comments: Comment[] = [
  {
    id: 123,
    content: 'Here is a comment!',
    contentAt: '2023-12-07T19:00:00.000+00:00',
    user: {
      username: 'Ricardo Marques',
      avatar:
        'https://drive.google.com/uc?id=184zxQaHisHzJnKO1L1FbelwRV4O5EFAT&export=download'
    }
  },
  {
    id: 124,
    content: 'Here is a second comment!',
    contentAt: '2023-12-07T19:01:00.000+00:00',
    user: {
      username: 'Pedro Monteiro',
      avatar:
        'https://drive.google.com/uc?id=184zxQaHisHzJnKO1L1FbelwRV4O5EFAT&export=download'
    }
  }
];

type MarketCommentProps = Comment;

function MarketComment({ user, content, contentAt }: MarketCommentProps) {
  const lang = useLanguage();

  return (
    <div className={styles.comment}>
      <Avatar
        src={user.avatar}
        alt=""
        $size="md"
        className={styles.commentAvatar}
      />
      <div className={styles.commentBody}>
        <p className={styles.commentBodyDetails}>
          <span className={styles.commentBodyDetailsUsername}>
            {user.username}
          </span>
          <span className={styles.commentBodyDetailsDivider}>&middot;</span>
          {relativeTimeFromNow(dayjs(contentAt).unix() * 1000, lang)}
        </p>
        <p className={styles.commentBodyContent}>{content}</p>
      </div>
    </div>
  );
}

export default function MarketComments() {
  return (
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
  );
}
