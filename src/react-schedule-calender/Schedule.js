import React, {useState, useEffect} from 'react'
import moment from "../utils/moment";

const Schedule = ({
                    schedules = []
                  }) => {
  return (
    <div className="schedule-cal_sch-container">
      {schedules.map((item,index) => {


        return <div key={index+moment(item.from).format('YYYY-MM-DD')} className="schedule-cal_sch_item">
          <div className="schedule-cal_sch-icon">
            {index}
          </div>
          <div className="schedule-cal_sch-content">

            <div className="schedule-cal_sch-date">
              {moment(item.from).format('YYYY-MM-DD HH:mm')}-{moment(item.to).isValid() ? moment(item.to).format('YYYY-MM-DD HH:mm') : ''}
            </div>

            <div className="schedule-cal_sch-title">{item.title}</div>
          </div>

        </div>
      })}
    </div>
  )
}

export default Schedule




