import { Helmet } from 'react-helmet';

import { environment } from 'config';
import { isUndefined } from 'lodash';

const splashSizes = [
  {
    dimension: '2048-2732',
    media:
      '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  },
  {
    dimension: '1668-2388',
    media:
      '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  },
  {
    dimension: '1536-2048',
    media:
      '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  },
  {
    dimension: '1668-2224',
    media:
      '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  },
  {
    dimension: '1620-2160',
    media:
      '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  },
  {
    dimension: '1290-2796',
    media:
      '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
  },
  {
    dimension: '1179-2556',
    media:
      '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
  },
  {
    dimension: '1284-2778',
    media:
      '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
  },
  {
    dimension: '1170-2532',
    media:
      '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
  },
  {
    dimension: '1125-2436',
    media:
      '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
  },
  {
    dimension: '1242-2688',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
  },
  {
    dimension: '828-1792',
    media:
      '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  },
  {
    dimension: '1242-2208',
    media:
      '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
  },
  {
    dimension: '750-1334',
    media:
      '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  },
  {
    dimension: '640-1136',
    media:
      '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
  }
];

export default function SeoIcons() {
  return (
    <Helmet>
      <link rel="icon" href={environment.FAVICON_URL ?? '/favicon.ico'} />
      <link
        rel="apple-touch-icon"
        href={environment.FAVICON_URL ?? '/logo192.png'}
      />
      {splashSizes.map(({ dimension, media }) => {
        const splashUrl = process.env[`REACT_APP_SPLASH_${dimension}`];

        if (isUndefined(splashUrl)) return null;

        return (
          <link
            key={dimension}
            rel="apple-touch-startup-image"
            href={splashUrl}
            media={media}
          />
        );
      })}
    </Helmet>
  );
}
