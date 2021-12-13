import React from 'react'

interface Props {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

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
    <div className="calendar__nav">
      <button aria-label="이전달" onClick={handlePrev}>
        &lt;
      </button>
      <time className="calendar__currentdate" dateTime={date.toISOString()}>
        {date.getFullYear()}.{date.getMonth() + 1}
      </time>
      <button aria-label="다음달" onClick={handleNext}>
        &gt;
      </button>
    </div>
  )
}

export default DateNav
