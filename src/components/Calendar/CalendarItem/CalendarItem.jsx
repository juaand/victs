import './CalendarItem.css'
import React from 'react'



const CalendarItem = ({lessonInstructor, lessonDate, lessonHour, lessonDiscipline}) => {

    const formatDate = (date) => {
        const format = (s) => (s < 10 ? '0' + s : s)
        var d = new Date(date)
        return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join(
            '/'
        )
    }
    return (
        <div className="calendar-item col-3">
            <span className="cal-item __date">{formatDate(lessonDate)}</span>
            <span className="cal-item __hour">{new Date(lessonDate).getTime()}</span>
            <span className="cal-item __discipline">{lessonDiscipline}</span>
            <span className="cal-item __instructor">{lessonInstructor}</span>
        </div>
    )
}

export default CalendarItem