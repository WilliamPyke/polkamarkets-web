import { Suspense, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { pages, ui } from 'config';
import { getUserCountry } from 'helpers/location';
import { Spinner } from 'ui';

import RestrictedCountry from 'pages/RestrictedCountry';

import { Layout } from 'components';

const restrictedCountries =
  process.env.REACT_APP_RESTRICTED_COUNTRIES?.split(',');

export default function AppRoutes() {
  const [isLoading, setLoading] = useState(true);
  const [isAllowedCountry, setIsAllowedCountry] = useState(true);

  useEffect(() => {
    (async function handleCountry() {
      if (restrictedCountries?.length) {
        const userCountry = await getUserCountry();

        setLoading(false);
        setIsAllowedCountry(
          !restrictedCountries.includes(userCountry.countryCode)
        );
      }
    })();
  }, []);

  if (isLoading) return <Spinner />;

  if (!isAllowedCountry) return <RestrictedCountry />;

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          {Object.values(pages)
            .filter(page => page.enabled)
            .map(page => (
              <Route
                key={page.name}
                exact={page.exact}
                path={page.pathname}
                component={page.Component}
              />
            ))}
          {ui.clubs.enabled && (
            <Redirect from="/leaderboard/:slug" to="/clubs/:slug" />
          )}
        </Switch>
      </Suspense>
    </Layout>
  );
}
