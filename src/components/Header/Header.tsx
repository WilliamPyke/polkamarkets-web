import cn from 'classnames';
import { Container } from 'ui';
import type { ContainerProps } from 'ui';

import Drawer from '../Drawer';
import UserOperations from '../UserOperations';
import headerClasses from './Header.module.scss';
import HeaderActions from './HeaderActions';
import HeaderNav from './HeaderNav';

export interface HeaderProps
  extends Pick<ContainerProps<'header'>, 'className'> {
  $gutterBottom?: boolean;
}

export default function Header({ className, $gutterBottom }: HeaderProps) {
  return (
    <Container
      $as="header"
      className={cn(
        headerClasses.root,
        headerClasses.container,
        {
          [headerClasses.gutterBottom]: $gutterBottom
        },
        className
      )}
    >
      <HeaderNav />
      <HeaderActions />
      <Drawer isOpen title="Ongoing predictions">
        <UserOperations />
      </Drawer>
    </Container>
  );
}
