import { useEffect, useMemo, useRef, useState } from 'react'
import normalizeDate from '../../utils/normalizeDate'
import DateCell from '../DateCell/DateCell'
import DateNav from '../DateNav/DateNav'
import { Job } from '../JobItem/JobItem'
import styles from './Calendar.module.scss'

const Calendar = () => {
  const data = useRef(
    new Map<number, { start_items: Job[]; end_items: Job[] }>()
  )

  const [loading, setLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const dateList = useMemo(() => {
    // 시작일 구하기
    const startDate = new Date(currentDate)
    startDate.setDate(1)
    normalizeDate(startDate)
    // 말일 구하기
    const endDate = new Date(currentDate)
    endDate.setMonth(endDate.getMonth() + 1)
    endDate.setDate(0)
    normalizeDate(endDate)

    const result: Date[] = []

    // 시작일 ~ 말일 사이의 Date 객체들 세팅하기
    for (
      let dateCounter = new Date(startDate);
      dateCounter.getTime() <= endDate.getTime();
      dateCounter.setDate(dateCounter.getDate() + 1)
    ) {
      const date = new Date(dateCounter)
      normalizeDate(date)
      result.push(date)
    }

    // 시작일 주의 이전달 Date 객체 삽입
    for (let i = 1; i <= startDate.getDay(); i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() - i)
      normalizeDate(date)
      result.unshift(date)
    }
    // 말일 주의 이후달 Date 객체 삽입
    for (let i = 1; i <= 6 - endDate.getDay(); i++) {
      const date = new Date(endDate)
      date.setDate(date.getDate() + i)
      normalizeDate(date)
      result.push(date)
    }

    return result
  }, [currentDate])

  useEffect(() => {
    setLoading(true)

    fetch(
      'https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json'
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const sortedData = JSON.parse(JSON.stringify(jsonData)).sort(
          (a: Job, b: Job) => a.name > b.name
        )
        sortedData.forEach((item: Job) => {
          const start_time = new Date(item.start_time)
          const end_time = new Date(item.end_time)

          // 시간 9시로 표준화 작업: Date 객체를 날짜만 기입하여 생성하면 9시로 세팅됨. getTime()메서드로 정확한 키의 비교를 위함
          normalizeDate(start_time)
          normalizeDate(end_time)

          const currentData = data.current

          if (currentData.has(start_time.getTime()) === false) {
            currentData.set(start_time.getTime(), {
              start_items: [],
              end_items: [],
            })
          }
          if (currentData.has(end_time.getTime()) === false) {
            currentData.set(end_time.getTime(), {
              start_items: [],
              end_items: [],
            })
          }

          currentData.get(start_time.getTime())!.start_items.push(item)
          currentData.get(end_time.getTime())!.end_items.push(item)
        })

        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>로딩중...</div>
  }

  return (
    <section>
      <header>
        <h2 className="a11y-hidden">채용달력</h2>
        <DateNav date={currentDate} setDate={setCurrentDate} />
      </header>
      <div className={styles.dates}>
        <div className={styles.days}>
          <div className={styles.day}>일</div>
          <div className={styles.day}>월</div>
          <div className={styles.day}>화</div>
          <div className={styles.day}>수</div>
          <div className={styles.day}>목</div>
          <div className={styles.day}>금</div>
          <div className={styles.day}>토</div>
        </div>
        {Array.from(new Array(dateList.length / 7), (_, i) => i).map(
          (weekIdx) => (
            <div key={weekIdx} className={styles.week}>
              {[
                weekIdx * 7,
                weekIdx * 7 + 1,
                weekIdx * 7 + 2,
                weekIdx * 7 + 3,
                weekIdx * 7 + 4,
                weekIdx * 7 + 5,
                weekIdx * 7 + 6,
              ].map((dateIdx) => (
                <DateCell
                  key={dateList[dateIdx].getTime()}
                  date={dateList[dateIdx]}
                  startItems={
                    data.current.get(dateList[dateIdx].getTime())?.start_items
                  }
                  endItems={
                    data.current.get(dateList[dateIdx].getTime())?.end_items
                  }
                />
              ))}
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Calendar
