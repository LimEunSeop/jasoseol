import React, { useState } from 'react'
import Modal from 'react-modal'
import styles from './JobItem.module.scss'
import formatDateTime from '../../utils/formatDateTime'
import normalizeDate from '../../utils/normalizeDate'
import classnames from 'classnames/bind'

export interface Job {
  id: number
  name: string
  image: string
  start_time: string
  end_time: string
  content: string
}

export enum JobType {
  Start,
  End,
}

interface Props {
  data: Job
  type: JobType
}

Modal.setAppElement('#root')

const cx = classnames.bind(styles)

const JobItem = ({ data, type }: Props) => {
  const [modalOpened, setModalOpened] = useState(false)

  const startDate = new Date(data.start_time)
  const endDate = new Date(data.end_time)

  // 현재 날짜와 마감 날짜 사이의 차이. 하루가 86400000 ms 이므로 이를 나눠주면 몇일 차이가 나는지 계산이됨.
  const dateDifference =
    (normalizeDate(new Date()).getTime() -
      normalizeDate(new Date(endDate)).getTime()) /
    86400000

  const typeInfo: { label?: string; display?: string; class?: string } = {}
  switch (type) {
    case JobType.Start:
      typeInfo.label = '시작'
      typeInfo.display = '시'
      typeInfo.class = 'start'
      break
    case JobType.End:
      typeInfo.label = typeInfo.display = '끝'
      typeInfo.class = 'end'
      break
    default:
      console.error('정의되지 않은 JobType')
  }

  function openModal() {
    setModalOpened(true)
  }

  function closeModal() {
    setModalOpened(false)
  }

  return (
    <>
      <button type="button" onClick={openModal} className={styles.item}>
        <span
          aria-label={typeInfo.label}
          className={cx('label', typeInfo.class)}
        >
          {typeInfo.display}
        </span>
        <span className={styles.name}>{data.name}</span>
      </button>
      {modalOpened && (
        <Modal
          isOpen={modalOpened}
          onRequestClose={closeModal}
          contentLabel={data.name}
          style={{
            content: {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              height: '90%',
              maxWidth: '800px',
            },
          }}
        >
          <div className={styles.modalHeader}>
            <img
              src={data.image}
              alt={`${data.name} 기업 이미지`}
              width="100"
            />
            <div className={styles.info}>
              <b>{data.name}</b>
              <div className={styles.period}>
                <time dateTime={startDate.toISOString()}>
                  {formatDateTime(startDate)}
                </time>
                <span className="a11y-hidden">부터</span>
                <span aria-hidden="true"> ~ </span>
                <time dateTime={endDate.toISOString()}>
                  {formatDateTime(endDate)}
                </time>
                <span className="a11y-hidden">까지</span>
                <span className={styles.dateDifference}>
                  {dateDifference === 0
                    ? '오늘'
                    : dateDifference > 0
                    ? `${dateDifference}일 지남`
                    : `${dateDifference}일 전`}
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="채용정보 닫기"
              className={styles.closeButton}
              onClick={closeModal}
            >
              <span></span>
              <span></span>
            </button>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            style={{ overflow: 'scroll' }}
          ></div>
        </Modal>
      )}
    </>
  )
}

export default JobItem
