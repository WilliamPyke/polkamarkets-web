const { api } = require('./index');

async function getLandBySlug(landSlug) {
  const url = `${process.env.REACT_APP_POLKAMARKETS_API_URL}/lands/${landSlug}`;
  return api.get(url);
}

module.exports = {
  getLandBySlug
};
