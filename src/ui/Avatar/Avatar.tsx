import { forwardRef } from 'react';

import type { ImageProps } from 'ui/Image';
import Image from 'ui/Image';

import avatarClasses from './Avatar.module.scss';

export type AvatarProps = ImageProps & {
  altFormatter?: (alt?: string) => string | null;
};

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { alt, altFormatter, ...props },
  ref
) {
  return (
    <Image ref={ref} {...props}>
      <strong className={avatarClasses.alt}>
        {altFormatter ? altFormatter(alt) : alt?.toUpperCase().match(/\w/)}
      </strong>
    </Image>
  );
});

export default Avatar;
