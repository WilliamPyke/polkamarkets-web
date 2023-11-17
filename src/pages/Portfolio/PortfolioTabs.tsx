import { useState, useMemo, memo, useEffect } from 'react';

import { ui, features } from 'config';
import { isEmpty } from 'lodash';
import { setFilter } from 'redux/ducks/portfolio';
import { useGetMarketsByIdsQuery } from 'services/Polkamarkets';
import { useTheme } from 'ui';

import {
  ButtonGroup,
  PortfolioLiquidityTable,
  PortfolioMarketTable,
  PortfolioReportTable,
  Filter
} from 'components';

import { useAppDispatch, useNetwork, usePolkamarketsService } from 'hooks';

import {
  formatLiquidityPositions,
  formatMarketPositions,
  formatReportPositions
} from './utils';

function TabsFilter() {
  const dispatch = useAppDispatch();

  function handleChangeFilter(newFilter: { value: string; name: string }) {
    dispatch(setFilter(newFilter.value));
  }

  return (
    <Filter
      description="Filter:"
      defaultOption="open"
      options={[
        { value: 'open', name: 'Open' },
        { value: 'resolved', name: 'Resolved' }
      ]}
      onChange={handleChangeFilter}
      className="portfolio-tabs__header-filter"
    />
  );
}

const defaultColsArr = ['market', 'outcome', 'result'];
const getDefaultCols = ({ headers, rows }) => ({
  headers: headers.filter(({ key }) => defaultColsArr.includes(key)),
  rows: rows.map((row: {}, index: number) =>
    Object.keys(row)
      .filter(key => defaultColsArr.includes(key))
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: rows[index][key]
        }),
        {}
      )
  )
});

const PortfolioTabsFilter = memo(TabsFilter);

type PortfolioTabsProps = {
  user: {
    isLoggedIn: boolean;
    address?: string;
  };
  isLoadingUser: boolean;
};

function PortfolioTabs({ user, isLoadingUser }: PortfolioTabsProps) {
  const theme = useTheme();
  const { network } = useNetwork();
  const polkamarketsService = usePolkamarketsService();

  const [currentTab, setCurrentTab] = useState('marketPositions');

  const [state, setState] = useState<{
    bonds: Object;
    portfolio: Object;
    actions: any[];
    marketsWithActions: any[];
    marketsWithBonds: any[];
  }>({
    bonds: {},
    portfolio: {},
    actions: [],
    marketsWithActions: [],
    marketsWithBonds: []
  });

  const [isLoading, setIsLoading] = useState({
    portfolio: false,
    bonds: false,
    actions: false
  });

  useEffect(() => {
    async function fetchPortfolio() {
      setIsLoading(prev => ({ ...prev, portfolio: true }));
      const portfolio = await polkamarketsService.getUserPortfolio(
        user.address!
      );
      setState(prev => ({ ...prev, portfolio }));
      setIsLoading(prev => ({ ...prev, portfolio: false }));
    }

    async function fetchBonds() {
      setIsLoading(prev => ({ ...prev, bonds: true }));
      const bonds = await polkamarketsService.getUserBonds(user.address!);
      setState(prev => ({ ...prev, bonds }));
      setIsLoading(prev => ({ ...prev, bonds: false }));
    }

    async function fetchBondsMarketsIds() {
      setIsLoading(prev => ({ ...prev, bonds: true }));
      const bondMarketsIds = await polkamarketsService.getUserBondMarketsIds(
        user.address!
      );
      setState(prev => ({
        ...prev,
        marketsWithBonds: bondMarketsIds
      }));
      setIsLoading(prev => ({ ...prev, bonds: false }));
    }

    async function fetchActions() {
      setIsLoading(prev => ({ ...prev, actions: true }));
      const actions = await polkamarketsService.getUserActions(user.address!);
      setState(prev => ({
        ...prev,
        actions,
        marketsWithActions: actions.map(action => action.marketId.toString())
      }));
      setIsLoading(prev => ({ ...prev, actions: false }));
    }

    if (!isLoadingUser && user.address) {
      fetchPortfolio();
      fetchBonds();
      fetchBondsMarketsIds();
      fetchActions();
    }
  }, [isLoadingUser, polkamarketsService, user.address]);

  const {
    portfolio: isLoadingPortfolio,
    bonds: isLoadingBonds,
    actions: isLoadingActions
  } = isLoading;

  const { bonds, portfolio, actions, marketsWithActions, marketsWithBonds } =
    state;

  const marketsIds = [...marketsWithActions, ...marketsWithBonds];

  const { data: markets, isLoading: isLoadingMarkets } =
    useGetMarketsByIdsQuery(
      {
        ids: marketsIds,
        networkId: network.id
      },
      {
        skip:
          (ui.portfolio.tabs.reportPositions.enabled && isLoadingBonds) ||
          isLoadingActions ||
          isEmpty(marketsIds)
      }
    );

  const marketPositions = useMemo(
    () => formatMarketPositions(user.isLoggedIn, portfolio, actions, markets),
    [actions, markets, portfolio, user.isLoggedIn]
  );

  const liquidityPositions = useMemo(() => {
    if (ui.portfolio.tabs.liquidityPositions.enabled) {
      return formatLiquidityPositions(user.isLoggedIn, portfolio, markets);
    }

    return undefined;
  }, [markets, portfolio, user.isLoggedIn]);

  const reportPositions = useMemo(() => {
    if (ui.portfolio.tabs.reportPositions.enabled) {
      return formatReportPositions(user.isLoggedIn, bonds, markets);
    }

    return undefined;
  }, [bonds, markets, user.isLoggedIn]);

  const positions = theme.device.isDesktop
    ? marketPositions
    : getDefaultCols(marketPositions);

  if (!isLoadingUser && !user.address) return null;

  return (
    <div className="portfolio-tabs">
      <div className="portfolio-tabs__header">
        {features.regular.enabled ? (
          <ButtonGroup
            defaultActiveId="marketPositions"
            buttons={[
              {
                id: 'marketPositions',
                name: 'Market Positions',
                color: 'default'
              },
              {
                id: 'liquidityPositions',
                name: 'Liquidity Positions',
                color: 'default'
              },
              {
                id: 'reportPositions',
                name: 'Reports',
                color: 'default'
              }
            ]}
            onChange={setCurrentTab}
            style={{ width: 'fit-content' }}
          />
        ) : null}
        <PortfolioTabsFilter />
      </div>
      <div className="portfolio-tabs__content">
        {currentTab === 'marketPositions' ? (
          <PortfolioMarketTable
            rows={positions.rows}
            headers={positions.headers}
            isLoadingData={
              isLoadingUser ||
              isLoadingMarkets ||
              isLoadingPortfolio ||
              isLoadingActions
            }
          />
        ) : null}
        {liquidityPositions && currentTab === 'liquidityPositions' ? (
          <PortfolioLiquidityTable
            rows={liquidityPositions.rows}
            headers={liquidityPositions.headers}
            isLoadingData={
              isLoadingUser || isLoadingMarkets || isLoadingPortfolio
            }
          />
        ) : null}
        {reportPositions && currentTab === 'reportPositions' ? (
          <PortfolioReportTable
            rows={reportPositions.rows}
            headers={reportPositions.headers}
            isLoadingData={
              isLoadingUser ||
              isLoadingMarkets ||
              isLoadingPortfolio ||
              isLoadingBonds
            }
          />
        ) : null}
      </div>
    </div>
  );
}

export default PortfolioTabs;
