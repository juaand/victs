import './ReservationsItem.css'
import React from 'react'

export default function ReservationsItem({reservation, onClick}) {

    console.log(reservation)
    return (
        <div className="reservation-item col-sm-3 col-6" onClick={() => onClick(reservation)}>
            <div className="reservation __name">{reservation?.name?.replace(/ .*/, '')}</div>
            <div className="reservation __discipline">{reservation?.user?.email}</div>
            <div className="reservation __avatar" style={{background: `url(${reservation?.user?.avatar}) no-repeat center center / cover`}} ></div>
        </div>
    )
}
