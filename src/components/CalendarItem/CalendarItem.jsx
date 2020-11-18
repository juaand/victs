import './CalendarItem.css'
import React from 'react'

const CalendarItem = ({data, borderBottom, capacity, onClick}) => {

    const formatDate = (date) => {
        const format = (s) => (s < 10 ? '0' + s : s)
        var d = new Date(date)
        return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    const internalOnClick = () => {onClick(data)}

    return (
        <div className={borderBottom ? 'false-link border-bottom calendar-item col-3' : 'false-link calendar-item col-sm-3 col-6'} onClick={internalOnClick}>
            <span className="cal-item __date">{formatDate(data.date)}</span>
            <span className="cal-item __hour">{new Date(data.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
            <span className="cal-item __discipline">{data.discipline}</span>
            <span className="cal-item __instructor">
                {/* <span className="avatar" style={{background: `url(${data.instructor.user.avatar}) no-repeat center center / cover`}}></span> */}
                <span>{data.instructor.user.name}</span>
            </span>
            <span className="cal-item __gym">{data.gym?.user?.name}</span>
            <span className="capacity">
                {capacity = 0 ?
                    <strong>No seats left</strong> :
                    <>
                        Seats left
            <strong className={capacity < 11 ?
                            'few' : ''}>{capacity}</strong>
                    </>
                }
            </span>
        </div>
    )
}

export default CalendarItem