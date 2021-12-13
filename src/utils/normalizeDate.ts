/**
 *
 * 년-월-일 로만 Date 객체를 초기화하면 시간은 9 AM 으로 자동 세팅됩니다. 이 상태를 normal 상태로 가정하여,
 * 향후 년-월-일 로만 Date 객체의 정확한 비교를 위해 시간을 9시로 통일시키는 작업을 하는 함수입니다.
 *
 * @param date
 */

export default function normalizeDate(date: Date) {
  date.setHours(9)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}
