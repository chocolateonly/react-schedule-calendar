import React, {useState, useEffect} from 'react'
import Calendar from './Calendar'
import Schedule from "./Schedule";
import './style.less'
import moment from "../utils/moment";
const defaultSate={
  schedules:[
    {'2020-02-27':[{title:'schedule1',from:'2020-02-27 12:30',to:'2020-02-27 13:30'}]},
    {'2020-02-28':[{title:'schedule2',from:'2020-02-28 12:30',to:'2020-02-28 13:30'}]},
    {'2020-02-29':[{title:'schedule3',from:'2020-02-29 12:30',to:'2020-02-29 13:30'},{title:'schedule3',from:'2020-02-29 15:30',to:'2020-02-29 17:30'}]},
  ]
}
const ScheduleCalendar = ({
                            initDate = moment().format('YYYY-MM-DD'),
                            schedules = defaultSate.schedules
                          }) => {
  const [selectedDate, setSelectedDate] = useState(initDate)
  return (
    <div className="schedule-cal">
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} schedules={schedules}/>
      <Schedule selectedDate={selectedDate} schedules={schedules[selectedDate]?schedules[selectedDate]:[]}/>
    </div>
  )
}

export default ScheduleCalendar




