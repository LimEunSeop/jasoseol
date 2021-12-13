export default function formatDateTime(dateArg: Date) {
  const year: string = String(dateArg.getFullYear())
  const month: string = String(dateArg.getMonth() + 1).padStart(2, '0')
  const date: string = String(dateArg.getDate()).padStart(2, '0')
  const hour: string = String(dateArg.getHours()).padStart(2, '0')
  const minute: string = String(dateArg.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${date} ${hour}:${minute}`
}
