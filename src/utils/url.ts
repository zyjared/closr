export function withBase(url: string) {
  if (!url.startsWith('/')) {
    return url
  }

  return (BASE + url).replace(/\/+/g, '/')
}
