import type { Land } from 'types/land';

const mock: Land = {
  id: 5,
  slug: 'uefa-champions-league',
  title: 'UEFA Champions League',
  description:
    'Predictions for the UCL Group Stage matches of the 23/24 season.',
  imageUrl:
    'https://polkamarkets.infura-ipfs.io/ipfs/QmTon53zjpyzhmdkZiJ9dRCE7tCrwnFLtfP3TYo54A6Keb',
  bannerUrl:
    'https://polkamarkets.infura-ipfs.io/ipfs/QmeHKULhR2YAZ4zHxpW4D42quzhmcLWVevRxupWuGAJKQK',
  tournaments: [
    {
      id: 6,
      networkId: 80001,
      slug: 'duelo-fratricida',
      title: 'Duelo de Treinadores (Terminado)',
      description:
        'Dois treinadores do Zone Pro Padel, Vasco Rocha e Manuel Sousa, vão se defrontar no Padcenter a 28 de Outubro de 2023.\r\n\r\nAcerta nas previsões do jogo e lucra o máximo de ALPHA para ganhares uma cerveja, oferecida pela equipa Foreland ❤️\r\n\r\n',
      imageUrl:
        'https://polkamarkets.infura-ipfs.io/ipfs/QmPij1NKnjmzcc3bqATFETKwYZVjL6woGQ5fFTcyWd57rk',
      markets: [
        {
          id: '37',
          title:
            'Quem vai ganhar o 1º Set do jogo Vasco Rocha e João Cunha VS Manuel Sousa e Pedro Cunha?',
          imageUrl:
            'https://polkamarkets.infura-ipfs.io/ipfs/QmRs6VuQppUF48hUWRMjXkapUUoWLqd32BVAbBFQ2SoXgt',
          slug: 'quem-vai-ganhar-o-1-set-do-jogo-vasco-rocha-e-joao-cunha-vs-manuel-sousa-e-pedro-cunha'
        },
        {
          id: '36',
          title:
            'Quem vai ganhar o jogo Vasco Rocha e João Cunha VS Manuel Sousa e Pedro Cunha?',
          imageUrl:
            'https://polkamarkets.infura-ipfs.io/ipfs/QmZ3dRpqvckFX5692czhgUbB31ff5kgQ8fDwKqrGLUmGJL',
          slug: 'quem-vai-ganhar-o-jogo-vasco-rocha-e-joao-cunha-vs-manuel-sousa-e-pedro-cunha'
        },
        {
          id: '38',
          title:
            'Quem vai marcar o primeiro ponto do jogo Vasco Rocha e João Cunha VS Manuel Sousa e Pedro Cunha?',
          imageUrl:
            'https://polkamarkets.infura-ipfs.io/ipfs/QmRs6VuQppUF48hUWRMjXkapUUoWLqd32BVAbBFQ2SoXgt',
          slug: 'quem-vai-marcar-o-primeiro-ponto-do-jogo-vasco-rocha-e-joao-cunha-vs-manuel-sousa-e-pedro-cunha'
        }
      ],
      expiresAt: '2023-10-28T14:30:00.000+00:00',
      users: 16
    },

    {
      id: 7,
      networkId: 80001,
      slug: 'f1-brazilian-gp-2023',
      title: 'F1 Brazilian GP 2023 (Ended)',
      description:
        'Win an Amazon Gift Card from amazon.es worth 10 EURO by being the top forecaster across all F1 Brazilian GP 2023 questions.\r\n\r\nThe winner will be the forecaster with most predictions won. Gains in ALPHA will settle eventual ties: the player with most ALPHA gains ranks first. ',
      imageUrl:
        'https://polkamarkets.infura-ipfs.io/ipfs/QmYXNuGnjuGTL35P9rHaHwusS5jWTDjdKLG4HWR1UTSSP8',
      markets: [
        {
          id: '41',
          title: 'Who will finish SECOND in the 2023 Brazilian GP Sprint race?',
          imageUrl:
            'https://polkamarkets.infura-ipfs.io/ipfs/QmUc1xpiXqYHeAGyBCZJxPSPHAo2xVN8idG7VrNUPP6m8y',
          slug: 'who-will-finish-second-in-the-2023-brazilian-gp-sprint-race'
        },
        {
          id: '40',
          title: 'Who will finish SECOND in the 2023 Brazilian Grand Prix?',
          imageUrl:
            'https://polkamarkets.infura-ipfs.io/ipfs/QmUc1xpiXqYHeAGyBCZJxPSPHAo2xVN8idG7VrNUPP6m8y',
          slug: 'who-will-finish-second-in-the-2023-brazilian-grand-prix'
        },
        {
          id: '42',
          title:
            'Will there be a Safety Car during the 2023 Brazilian GP race on Sunday?',
          imageUrl:
            'https://polkamarkets.infura-ipfs.io/ipfs/QmUc1xpiXqYHeAGyBCZJxPSPHAo2xVN8idG7VrNUPP6m8y',
          slug: 'will-there-be-a-safety-car-during-the-2023-brazilian-gp-race-on-sunday'
        }
      ],
      expiresAt: '2023-11-05T17:00:00.000+00:00',
      users: 7
    }
  ]
};

export default mock;
