export function convertDate(date: string) {
  let src = date.split(' ')[0];

  const event = new Date(src.split('-').join(','))

  const dateFormated = event.toDateString().split(' ')

  return `${dateFormated[0]}, ${dateFormated[2]} ${dateFormated[1]}`
}