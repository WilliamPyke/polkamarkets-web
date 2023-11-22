export default function getPathname(params: string) {
  return params?.match(/^\/\w+/g)?.[0] || '';
}
