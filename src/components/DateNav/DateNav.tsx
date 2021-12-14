import React from 'react'
import styles from './DateNav.module.scss'
import classnames from 'classnames/bind'

interface Props {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const cx = classnames.bind(styles)

const DateNav = ({ date, setDate }: Props) => {
  const handlePrev = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() - 1)
    setDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + 1)
    setDate(newDate)
  }
  return (
    <div className={styles.container}>
      <button
        aria-label="이전달"
        onClick={handlePrev}
        className={cx('button', 'prev')}
      >
        &lt;
      </button>
      <time className={styles.currentMonth} dateTime={date.toISOString()}>
        {date.getFullYear()}.{(date.getMonth() + 1).toString().padStart(2, '0')}
      </time>
      <button
        aria-label="다음달"
        onClick={handleNext}
        className={cx('button', 'next')}
      >
        &gt;
      </button>
    </div>
  )
}

export default DateNav
