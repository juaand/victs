import './ClassroomSkecth.css'
import React, {useEffect, useState} from 'react'
import Button from '../Button/Button'
import {booking} from '../../services/ApiClient'

export default function ClassroomSkecth({rows, lesson, reservations}) {

    console.log(lesson)
    console.log(reservations)

    const [error, setError] = useState('')

    const drawSeats = (num) => {
        const seatArr = []

        for (let i = 0; i < num; i++) {
            seatArr.push('')
        }

        return seatArr
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

    useEffect(() => {
        if (reservations.length) {
            for (let i = 0; i < reservations.length; i++) {
                const allButtons = document.querySelectorAll(`[seat="${reservations[i].column}"][row="${reservations[i].row}"]`)
                allButtons[0].classList.add('blockedSeat')
            }
        }
    }, [])

    return (
        <>
            {error && <div>{error}</div>}
            <div className="instructor-info">
                <span className="avatar" style={{background: `url(${lesson.instructor.user.avatar}) no-repeat center center / cover`}}></span>
                <span className="name">{lesson.instructor.user.name}</span></div>
            {rows.map((el, i) =>
                <div row={i} className="row justify-content-center">
                    {drawSeats(el).map((el, j) =>
                        <Button className={`classroom-place ${lesson.classroom.discipline}`} row={i} seat={j} onClick={bookSeat}>{el}</Button>
                    )}
                </div>
            )}

        </>
    )
}
