import { Helmet } from 'react-helmet';

import { environment } from 'config';

function ExternalJS() {
  if (!environment.EXTERNAL_JS_URL) return null;

  return (
    <Helmet>
      <script src={environment.EXTERNAL_JS_URL} type="text/javascript" />
    </Helmet>
  );
}

export default ExternalJS;
