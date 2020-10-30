import './CalendarItem.css'
import React from 'react'
import {Link} from 'react-router-dom'

const CalendarItem = ({lessonInstructor, lessonDate, lessonHour, InstructorAvatar, lessonDiscipline, lessonCapacity, borderBottom}) => {

    const formatDate = (date) => {
        const format = (s) => (s < 10 ? '0' + s : s)
        var d = new Date(date)
        return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join(
            '/'
        )
    }

    return (
        <div className={borderBottom ? 'border-bottom calendar-item col-3' : 'calendar-item col-3'}>
            <span className="cal-item __date">{formatDate(lessonDate)}</span>
            <span className="cal-item __hour">{new Date(lessonHour).toLocaleTimeString()}</span>
            <span className="cal-item __discipline">{lessonDiscipline}</span>
            <span className="cal-item __instructor">
                <span className="avatar" style={{background: `url(${InstructorAvatar}) no-repeat center center / cover`}}></span>
                <Link to="/instructor-detail">{lessonInstructor}</Link>
            </span>
            <span className="capacity">
                {lessonCapacity = 0 ?
                    <strong>No seats left</strong> :
                    <>
                        Seats left
            <strong className={lessonCapacity < 11 ?
                            'few' : ''}>{lessonCapacity}</strong>
                    </>
                }
            </span>
        </div>
    )
}

export default CalendarItem