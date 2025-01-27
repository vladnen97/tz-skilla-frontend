export function convertSecondsToString(
  time: number,
  format: 'sec' | 'ms'
): string {
  let minutes: number, remainingSeconds: number

  if (format === 'sec') {
    minutes = Math.floor(time / 60)
    remainingSeconds = Math.round(time % 60)
  } else {
    minutes = Math.floor(time / 1000 / 60)
    remainingSeconds = Math.round((time / 1000) % 60)
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
