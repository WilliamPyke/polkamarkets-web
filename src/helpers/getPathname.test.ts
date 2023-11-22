import getPathname from './getPathname';

it('gets a pathname', () => {
  expect(getPathname('/market/hello?')).toBe('/market');
});
it('returns fallback empty string for error', () => {
  expect(getPathname('')).toBe('');
});
