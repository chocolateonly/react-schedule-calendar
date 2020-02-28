import React, {useState, useEffect} from 'react'
import moment from '../utils/moment'
import {week} from '../utils/moment'

const getCurrentMonthRows = (date) => {
  const currentYear = moment(date).format('YYYY')
  const currentMonth = moment(date).format('MM')
  const currentMonthDays = moment(`${currentYear}-${currentMonth}-01`).daysInMonth()
  const month_rows = []
  let rows = 0
  for (let i = 0; i < currentMonthDays; i++) {
    const current_month_day = moment(moment(`${currentYear}-${currentMonth}-01`)).add(i, 'd')
    month_rows[rows] = month_rows[rows] ? month_rows[rows] : []
    month_rows[rows].push({date: current_month_day, disable: false})
    if (current_month_day.format('ddd') === week[6]) {
      rows++
    }
  }
  const start = 7 - month_rows[0].length
  for (let i = 0; i < start; i++) {
    const current_month_day = moment(moment(`${currentYear}-${currentMonth}-01`)).add(-i - 1, 'd')
    month_rows[0].unshift({date: current_month_day, disable: true})
  }
  const end = 7 - month_rows[month_rows.length - 1].length
  for (let i = 0; i < end; i++) {
    const current_month_day = moment(moment(`${currentYear}-${currentMonth}-${currentMonthDays}`)).add(i + 1, 'd')
    month_rows[month_rows.length - 1].push({date: current_month_day, disable: true})
  }
  return month_rows
}
const Calendar = ({
                    selectedDate = moment().format('YYYY-MM-DD'),
                    setSelectedDate=()=>null,
                    schedules = []
                  }) => {
  const currentDate = moment().format('YYYY-MM-DD')
  const [monthRows, setMonthRows] = useState([])
  const [currentDateInMonth, setCurrentDateInMonth] = useState(selectedDate)
  useEffect(() => {
    setMonthRows(getCurrentMonthRows(currentDateInMonth))
  }, [currentDateInMonth])
  const getPreMonth = () => {
    const currentMonthDate = moment(selectedDate).add(-1, 'M').format('YYYY-MM-DD')
    setCurrentDateInMonth(currentMonthDate)
    setSelectedDate(currentMonthDate)
  }
  const getNextMonth = () => {
    const currentMonthDate = moment(selectedDate).add(1, 'M').format('YYYY-MM-DD')
    setCurrentDateInMonth(currentMonthDate)
    setSelectedDate(currentMonthDate)
  }
  return (
    <div className="schedule-cal_cal-container">
      <div className="schedule-cal_cal-header">

        <div className="schedule-cal_cal-date">
          <span onClick={() => setCurrentDateInMonth(selectedDate)}>{selectedDate}</span>
        </div>

        <div className="schedule-cal_cal-pre-next-month-btn">
          <i className="fa fa-arrow-left" onClick={() => getPreMonth()}>{`<`}</i>
          <i className="fa fa-arrow-right" onClick={() => getNextMonth()}>{`>`}</i>
        </div>

        <ul className="schedule-cal_cal-weekdays">
          {week.map((item) => {
            return <li key={item} className="schedule-cal_cal-weekdays-day">{item}</li>
          })}
        </ul>

      </div>

      <div className="schedule-cal_cal-month">
        {monthRows.map((item, index) => {
          return <ul key={`row_${index}`} className="schedule-cal_cal-month-row">
            {item.map(it => {
              const cur_date = it.date.format('YYYY-MM-DD')
              const isMarked = Object.keys(schedules).includes(cur_date)

              return <li key={`col_${cur_date}`}
                         className={`schedule-cal_cal-month-col ${cur_date === currentDate ? 'current' : ''} ${cur_date === selectedDate ? 'selected' : ''}`}
                         onClick={() => {
                           setSelectedDate(cur_date)
                           if (moment(cur_date).format('MM') !== moment(currentDateInMonth).format('MM')) setCurrentDateInMonth(cur_date)
                         }}
              >

                <div className="schedule-cal_cal-month-col-text">
                  <span className={it.disable ? "gray-color" : ""}>{it.date.format('DD')}</span>
                </div>

                {isMarked && <div className="schedule-cal_cal-month-col-mark"/>}
              </li>
            })}
          </ul>
        })}
      </div>

    </div>
  )
}

export default Calendar




