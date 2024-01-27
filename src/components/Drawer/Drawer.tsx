import { PropsWithChildren, useCallback, useState } from 'react';

import classNames from 'classnames';
import RCDrawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';

import Icon from '../Icon';
import styles from './Drawer.module.scss';

type DrawerProps = PropsWithChildren<{
  isOpen?: boolean;
  title?: string;
}>;

function Drawer({ isOpen = false, title, children }: DrawerProps) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <RCDrawer
      open={open}
      onClose={handleClose}
      classNames={{ content: styles.content }}
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
          onClick={handleClose}
        >
          <Icon name="Arrow" dir="right" />
        </button>
      </div>

      {children}
    </RCDrawer>
  );
}

export default Drawer;
