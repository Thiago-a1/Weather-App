export function convertTemp(temp: number, measurement: string) {
  if(measurement == 'C') {
    return `${temp}ºC`;
  } else {
    return `${((temp * (9/5)) + 32).toFixed(1)}ºF`;
  }
}