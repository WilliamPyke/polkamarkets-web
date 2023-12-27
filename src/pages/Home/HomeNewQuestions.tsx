import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { Market } from 'models/market';
import {
  getCurrencyByTicker,
  getNetworkById,
  getTokenByTicker
} from 'redux/ducks/market';
import { Land } from 'types/land';

import { Carousel, PredictionCard } from 'components';

import styles from './Home.module.scss';

type HomeNewQuestionsProps = {
  questions: Market[];
  getMarketLand: (marketId: string) => Land | null;
};

function HomeNewQuestions({ questions, getMarketLand }: HomeNewQuestionsProps) {
  const newQuestions = useMemo(
    () =>
      questions.map(question => {
        const network = getNetworkById(question.networkId);
        const ticker = question.token.wrapped
          ? network.currency.ticker
          : question.token.symbol;

        const tokenByTicker = getTokenByTicker(ticker);
        const currencyByTicker = getCurrencyByTicker(ticker);
        const land = getMarketLand(question.id);

        return {
          ...question,
          network,
          currency: network.currency,
          token: {
            ...question.token,
            ticker,
            iconName: (tokenByTicker || currencyByTicker).iconName
          },
          outcomes: question.outcomes.map(outcome => ({
            ...outcome,
            price: Number(outcome.price.toFixed(3))
          })),
          land
        } as Market;
      }),
    [getMarketLand, questions]
  );

  return (
    <Carousel
      Header={
        <div className={styles.newQuestionsHeader}>
          <h3 className={styles.newQuestionsHeaderTitle}>New Questions</h3>
          <Link
            to="/markets"
            className={classNames(
              'pm-c-button--xs',
              styles.newQuestionsHeaderButton
            )}
          >
            More
          </Link>
        </div>
      }
      data={newQuestions}
      emptyStateDescription="No New Questions available at the moment."
    >
      {newQuestions.map(question => (
        <PredictionCard
          itemID={question.slug}
          key={question.slug}
          market={question}
          className={styles.newQuestionsItem}
          wrapperClassName="height-full"
          statsVisibility={{
            volume: {
              desktop: false
            }
          }}
          showCategory={false}
          showLand
          showFooter={false}
          compact
        />
      ))}
    </Carousel>
  );
}

export default HomeNewQuestions;
