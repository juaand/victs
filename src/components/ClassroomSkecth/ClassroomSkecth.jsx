import './ClassroomSkecth.css'
import React, {useState} from 'react'
import Button from '../Button/Button'
import {booking} from '../../services/ApiClient'

export default function ClassroomSkecth({rows, lesson, reservationData}) {

    console.log(reservationData)
    const [error, setError] = useState('')
    
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

            const filteredAllBookings = reservation.filter(book => book.row == 3)
            console.log(filteredAllBookings)

            if (filteredAllBookings.length) {
                document.getElementsByTagName("Button")[0].setAttribute("className", "blocked")
            }

            
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message)
        }

    }

    return (
        <>
            <div className="instructor">Instructor</div>
            {rows.map((el, i) => <div row={i} className="row justify-content-center">{drawSeats(el).map((el, j) => <Button className="" row={i} seat={j} onClick={bookSeat}>{el}</Button>)}</div>)}
    {error && <div>{error}</div>}
        </>
    )
}
