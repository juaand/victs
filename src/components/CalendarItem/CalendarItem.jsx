import './CalendarItem.css'
import React from 'react'
import {useAuthContext} from '../../contexts/AuthContext'
import Button from '../Button/Button'

const CalendarItem = ({data, capacity, onClick, oldLessons, points, waitingList}) => {

    const {user} = useAuthContext()

    const formatDate = (date) => {
        const format = (s) => (s < 10 ? '0' + s : s)
        var d = new Date(date)
        return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    const internalOnClick = () => {onClick(data)}

    return (
        <>
            {oldLessons ?
                <div className="attended-lesson false-link calendar-item col-sm-3 col-6">
                    <span className="cal-item __date">{formatDate(data.date)}</span>
                    <span className="cal-item __hour">{new Date(data.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                    <span className="cal-item __discipline">{data.discipline}</span>
                    <span className="cal-item __instructor">
                        <span>{data.instructor?.user?.name}</span>
                    </span>
                    <span className="cal-item __gym">{data.gym?.user?.name}</span>
                    {(points && points > 0) ?
                        <Button className="button __donate-btn" onClick={() => onClick(data.id)}>VICTS the world</Button> : <Button className="button __donate-btn disabled" onClick={() => onClick(data.id)}>Thanks for your vote!!</Button>
                    }
                </div>
                :
                <div className={data?.user?.includes(user.id) ? `reserved-lesson false-link calendar-item col-3` : `${capacity === 0 ? "waiting" : ""} false-link calendar-item col-sm-3 col-6`} onClick={internalOnClick}>
                    <span className="cal-item __date">{formatDate(data.date)}</span>
                    <span className="cal-item __hour">{new Date(data.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                    <span className="cal-item __discipline">{data.discipline}</span>
                    <span className="cal-item __name">{data.name}</span>
                    <span className="cal-item __instructor">
                        <span>{data?.instructor?.user?.name}</span>
                    </span>
                    <span className="cal-item __gym">{data.gym?.user?.name}</span>
                    {!waitingList && capacity > 0 &&
                        <span className="capacity">
                            {capacity === 0 ?
                                <strong>No seats left</strong> :
                                <>
                                    Seats left
            <strong className={capacity < 11 ? 'few' : ''}>
                                        {capacity ? capacity : data?.classroom?.rows?.reduce((acc, el) => acc + parseInt(el), 0)}
                                    </strong>
                                </>
                            }
                        </span>
                    }
                </div>
            }
        </>
    )
}

export default CalendarItem