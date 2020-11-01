import './ClassroomSkecth.css'
import React, {useEffect} from 'react'
import Button from '../Button/Button'
import {booking} from '../../services/ApiClient'

export default function ClassroomSkecth({rows, lesson, seats}) {
    console.log(lesson)
    console.log(seats)

    const drawSeats = (num) => {
        const seatsArr = []
        for (let i = 0; i < num; i++) {
            seats.filter(el => el.row === i ? seatsArr.push('') : seatsArr.push(''))
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

    useEffect(() => {
        for (let i = 0; i < seats.length; i++) {
            const allButtons = document.querySelectorAll(`[seat="${seats[i].column}"][row="${seats[i].row}"]`)
            allButtons[0].classList.add('blockedSeat')
        }
    }, [])

    return (
        <>
            <div className="instructor-info">
                <span className="avatar" style={{background: `url(${lesson.instructor.user.avatar}) no-repeat center center / cover`}}></span>
                <span className="name">{lesson.instructor.user.name}</span></div>
            {rows.map((el, i) =>
                <div row={i} className="row justify-content-center">
                    {drawSeats(el).map((el, j) =>
                        <Button className="classroom-place" row={i} seat={j} onClick={bookSeat}>{el}</Button>
                    )}
                </div>
            )}
        </>
    )
}
