import { useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import cn from 'classnames';
import { pages, community, ui } from 'config';
import { shiftSlash } from 'helpers/string';
import isEmpty from 'lodash/isEmpty';
import { useTheme } from 'ui';

import * as Logos from 'assets/icons';
import { ReactComponent as V2Badge } from 'assets/icons/svgs/v2-badge.svg';

import { Button } from 'components/Button';
import CreateMarket from 'components/CreateMarket';
import Feature from 'components/Feature';
import HelpButton from 'components/HelpButton';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import NetworkSelector from 'components/NetworkSelector';
import ProfileSignin from 'components/ProfileSignin';
import Text from 'components/Text';

import useAppSelector from 'hooks/useAppSelector';

import headerNavClasses from './HeaderNav.module.scss';

const LogoComponent = ui.logo ? Logos[ui.logo] : null;
const headerNavMenu = Object.values(pages)
  .filter(page => page.enabled && page.navigation)
  .reverse();

function HeaderNavModal({
  children
}: {
  children: (arg: () => void) => React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);

  return (
    <>
      <Button size="xs" variant="ghost" onClick={() => setShow(true)}>
        <Icon name="Menu" size="lg" title="Open Menu" />
      </Button>
      <Modal
        show={show}
        fullScreen
        fullWidth
        className={{
          dialog: headerNavClasses.dialog
        }}
      >
        <header className={headerNavClasses.header}>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleHide}
            className={headerNavClasses.hide}
          >
            <Icon name="Cross" size="lg" title="Close Menu" />
          </Button>
        </header>
        {children(handleHide)}
        <footer className={headerNavClasses.footer}>
          {ui.layout.header.communityUrls.enabled && !isEmpty(community) ? (
            <>
              <Text
                color="gray"
                scale="tiny-uppercase"
                fontWeight="bold"
                className={headerNavClasses.title}
              >
                Join our community
              </Text>
              <ul className={headerNavClasses.socials}>
                {community.map(social => (
                  <li key={social.name}>
                    <Text
                      // @ts-ignore
                      as="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={headerNavClasses.social}
                    >
                      <Icon
                        title={social.name}
                        name={social.name}
                        className={headerNavClasses.icon}
                      />
                    </Text>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <Feature name="regular">
            <CreateMarket
              fullwidth
              className={headerNavClasses.createMarket}
              onCreateClick={handleHide}
            />
          </Feature>
        </footer>
      </Modal>
    </>
  );
}
function HeaderNavMenu({ onMenuItemClick }: { onMenuItemClick?(): void }) {
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);

  return (
    <ul className={headerNavClasses.list}>
      {headerNavMenu.map(page => (
        <li key={page.name} className={headerNavClasses.item}>
          <NavLink
            to={page.pathname}
            className={headerNavClasses.link}
            activeClassName={headerNavClasses.active}
            onClick={onMenuItemClick}
            isActive={(_, location) => {
              if (
                location.pathname === pages.home.pathname ||
                /^\/markets/.test(location.pathname)
              ) {
                return page.pathname === pages.home.pathname;
              }

              if (pages.clubs.enabled && /^\/clubs/.test(location.pathname)) {
                return page.pathname === pages.clubs.pathname;
              }

              if (
                pages.tournaments.enabled &&
                /^\/tournaments/.test(location.pathname)
              ) {
                return page.pathname === pages.tournaments.pathname;
              }

              return new RegExp(shiftSlash(location.pathname)).test(
                shiftSlash(page.pathname)
              );
            }}
          >
            {page.name}
          </NavLink>
        </li>
      ))}
      {!isLoggedIn && (
        <li className={headerNavClasses.item}>
          <ProfileSignin fullwidth variant="normal" color="primary">
            <Icon name="LogIn" size="lg" />
            Login
          </ProfileSignin>
        </li>
      )}
      {ui.layout.header.helpUrl && (
        <li className={headerNavClasses.item}>
          <HelpButton
            $outline
            $fullWidth
            onClick={onMenuItemClick}
            href={ui.layout.header.helpUrl}
          />
        </li>
      )}
    </ul>
  );
}
function HeaderNavMenuModal() {
  return (
    <HeaderNavModal>
      {handleHide => <HeaderNavMenu onMenuItemClick={handleHide} />}
    </HeaderNavModal>
  );
}
export default function HeaderNav() {
  const theme = useTheme();
  const isLoggedIn = useAppSelector(state => state.polkamarkets.isLoggedIn);
  const showLeftMenu =
    theme.device.isDesktop && !theme.device.isTv && !!headerNavMenu.length;

  return (
    <nav className={headerNavClasses.root}>
      {showLeftMenu && <HeaderNavMenuModal />}
      <Link
        to="/"
        aria-label="Homepage"
        className={cn(headerNavClasses.logos, {
          [headerNavClasses.logosGutter]: showLeftMenu
        })}
      >
        {LogoComponent ? (
          <LogoComponent />
        ) : (
          <>
            <Logos.PolkamarketsLogo />
            <V2Badge className={headerNavClasses.logosBadge} />
          </>
        )}
      </Link>
      {theme.device.isTv
        ? !!headerNavMenu.length && <HeaderNavMenu />
        : !theme.device.isDesktop && (
            <>
              {ui.layout.header.networkSelector.enabled ? (
                <NetworkSelector
                  size="sm"
                  responsive
                  className={headerNavClasses.network}
                />
              ) : null}
              {(!isLoggedIn || !!headerNavMenu.length) && (
                <HeaderNavMenuModal />
              )}
            </>
          )}
    </nav>
  );
}
