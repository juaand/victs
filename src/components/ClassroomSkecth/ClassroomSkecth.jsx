import './ClassroomSkecth.css'
import React, {useEffect, useState} from 'react'
import Button from '../Button/Button'
import {booking} from '../../services/ApiClient'

export default function ClassroomSkecth({rows, lesson, reservations}) {

    const [error, setError] = useState('')
    const [reservationsInfo, setReservationsInfo] = useState(reservations)
    const [message, setMessage] = useState('')

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
            setReservationsInfo(reservation[3])
            setMessage('You booked a seat in this classroom sucessfully.')


        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message)
        }
    }

    useEffect(() => {
        if (reservationsInfo.length) {
            // const avatar = document.createElement('img')
            // avatar.classList.add('avatar')
            for (let i = 0; i < reservationsInfo.length; i++) {
                const allButtons = document.querySelectorAll(`[seat="${reservationsInfo[i].column}"][row="${reservationsInfo[i].row}"]`)
                allButtons[0].classList.add('blockedSeat')
                // avatar.setAttribute('src', `${reservationsInfo[i].user.avatar}`)
                // allButtons.appendChild(avatar)
            }
        }
    }, [reservationsInfo])

    return (
        <>
            {error && <div className="message alert">{error}</div>}
            {message && <div className="message">{message}</div>}
            {!message &&
                <>
                    <div className="instructor-info">
                        <span className="avatar" style={{background: `url(${lesson.instructor.user.avatar}) no-repeat center center / cover`}}></span>
                        <span className="name">{lesson.instructor.user.name}</span>
                    </div>
                    {rows.map((el, i) =>
                        <div row={i} className="row justify-content-center">
                            {drawSeats(el).map((el, j) =>
                                <Button className={`classroom-place ${lesson.classroom.discipline}`} row={i} seat={j} onClick={bookSeat}>{el}</Button>
                            )}
                        </div>
                    )}
                    <p className="text-center">Select a seat to make a reservation.</p>
                </>
            }
        </>
    )
}
