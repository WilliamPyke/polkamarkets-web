import { PropsWithChildren } from 'react';

import classNames from 'classnames';
import RCDrawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';

import { useDrawer } from 'hooks';

import Icon from '../Icon';
import styles from './Drawer.module.scss';

type DrawerProps = PropsWithChildren<{
  title?: string;
}>;

function Drawer({ title, children }: DrawerProps) {
  const { isOpen, close } = useDrawer(state => state);

  return (
    <RCDrawer
      open={isOpen}
      onClose={close}
      classNames={{ wrapper: styles.wrapper, content: styles.content }}
      placement="right"
    >
      <div className={styles.header}>
        {title && <h1 className={styles.title}>{title}</h1>}
        <button
          type="button"
          className={classNames(
            'pm-c-button',
            'pm-c-button-normal--noborder',
            styles.headerClose
          )}
          onClick={close}
        >
          <Icon name="Arrow" dir="right" />
        </button>
      </div>

      {children}
    </RCDrawer>
  );
}

export default Drawer;
