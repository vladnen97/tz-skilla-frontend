export function getRandomFeedback(): 'good' | 'excellent' | 'bad' {
  const feedbackOptions: Array<'good' | 'excellent' | 'bad'> = [
    'good',
    'excellent',
    'bad',
  ]
  const randomIndex = Math.floor(Math.random() * feedbackOptions.length)
  return feedbackOptions[randomIndex]
}
