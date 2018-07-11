export default function handleFirstDate(dateStr) {
  const date = new Date(dateStr)

  if (!date.getTime()) {
    throw new Error('INVALID_DATE')
  }

  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)

  firstDate.setTime(firstDate.getTime() - (firstDate.getTimezoneOffset() * 60 * 1000))

  return firstDate.toISOString()
}
