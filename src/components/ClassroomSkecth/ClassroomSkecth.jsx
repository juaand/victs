import React from 'react'
import Button from '../Button/Button'
import {booking} from '../../services/ApiClient'

export default function ClassroomSkecth({rows, lesson, reservationData}) {

    console.log(reservationData)
    
    const drawSeats = (num) => {
        const seatsArr = []

        for (let i = 0; i < num; i++) {
            seatsArr.push('SEAT')
        }

        return seatsArr
    }

    const bookSeat = async (e) => {

        try {
            const row = e.target.getAttribute('row')
            const seat = e.target.getAttribute('seat')
            const reservation = await booking(lesson.id, row, seat)
            console.log(reservation)

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <div className="instructor">Instructor</div>
            {rows.map((el, i) => <div row={i} className="row justify-content-center">{drawSeats(el).map((el, j) => <Button row={i} seat={j} onClick={bookSeat}>{el}</Button>)}</div>)}
        </>
    )
}
