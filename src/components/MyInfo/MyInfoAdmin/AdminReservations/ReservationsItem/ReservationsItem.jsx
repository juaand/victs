import './ReservationsItem.css'
import React from 'react'

export default function ReservationsItem({reservation, onClick}) {

    return (
        <div className={reservation?.lesson?.gym === null ? "instructor-lesson reservation-item col-sm-2 col-6 ReservationsItem" : "reservation-item col-sm-2 col-6 ReservationsItem"} onClick={() => onClick(reservation)}>
            <span className="w-100">
                <div className="reservation __lesson">
                    <small>Lesson name</small>
                    {reservation?.lesson?.name}
                </div>
                <div className="reservation __name"><strong>{reservation?.user?.name}</strong></div>
                <div className="reservation __discipline">{reservation?.user?.email}</div>
                <div className="row">
                    <div className="col-6">
                        <div className="reservation __discipline"><strong>row</strong> {reservation?.row}</div>
                    </div>
                    <div className="col-6">
                        <div className="reservation __discipline"><strong>column</strong> {reservation?.column}</div>
                    </div>
                </div>
                {reservation?.lesson?.gym === null ? <div className="reservation __gym">{reservation?.lesson?.address}</div> : <div className="reservation __gym">{reservation?.lesson?.gym?.user?.name}</div>}
            </span>
        </div>
    )
}
