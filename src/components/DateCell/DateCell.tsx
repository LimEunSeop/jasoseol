import React from 'react'
import styles from '../DateCell/DateCell.module.scss'
import JobItem, { Job, JobType } from '../JobItem/JobItem'

interface Props {
  date: Date
  startItems?: Job[]
  endItems?: Job[]
}

const DateCell = ({ date, startItems, endItems }: Props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.date}>{date.getDate()}</div>
        <div className={styles.items}>
          {startItems && (
            <ul className={styles.startList}>
              {startItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <JobItem data={item} type={JobType.Start} />
                </li>
              ))}
            </ul>
          )}
          {endItems && (
            <ul className={styles.endList}>
              {endItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <JobItem data={item} type={JobType.End} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default DateCell
