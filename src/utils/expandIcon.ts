export function expandIcon(url: string, newSize: number) {
  const newurl = url.split('/')
  newurl[4] = `${newSize}x${newSize}`

  return newurl.join('/')
}