import React from 'react';

import cn from 'classnames';

import Text from '../Text';

export type PillVariant = 'normal' | 'subtle';

export type PillColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'pink'
  | 'blue'
  | 'purple';

type PillProps = {
  variant?: PillVariant | string;
  color?: PillColor | string;
  badge?: boolean;
  children: React.ReactNode;
  className?: Partial<Record<'root' | 'text', string>>;
};

function Pill({
  variant = 'normal',
  color = 'default',
  badge = false,
  children,
  className
}: PillProps) {
  return (
    <span className={cn(`pm-c-pill-${variant}--${color}`, className?.root)}>
      {badge ? <div className="pm-c-pill__badge" /> : null}
      <Text className={cn('pm-c-pill__text', className?.text)} as="span">
        {children}
      </Text>
    </span>
  );
}

Pill.displayName = 'Pill';

export default Pill;
