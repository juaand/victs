import './ClassroomSkecth.css'
import React, {useEffect, useState} from 'react'
import Button from '../Button/Button'
import {booking} from '../../services/ApiClient'
import {useAuthContext} from '../../contexts/AuthContext'
import {updateUser, waitingList} from '../../services/ApiClient'

export default function ClassroomSkecth({rows, lesson, reservations, hideSelectSeat, isWaitingList}) {

    const [error, setError] = useState('')
    const [reservationsInfo, setReservationsInfo] = useState(reservations)
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(true)

    const {user} = useAuthContext()
    const {login} = useAuthContext()

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
            updateUser(reservation[4])
                .then(user => {
                    login(user[0])
                })
            setMessage('You booked a seat in this classroom sucessfully.')

        } catch (err) {
            setError(err.response?.data?.message)
        }
    }

    const addToWaitingList = async () => {
        try {
            const result = await waitingList(lesson.id)
            console.log(result)
            login(result[1])
            setMessage('You were added to the waiting list sucessfully.')
        } catch (err) {
            setError(err.response?.data?.message)
        }
    }

    useEffect(() => {
        const check = reservationsInfo.filter(el => el.user.id === user.id)
        if (check.length) setBool(!bool)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (reservationsInfo.length) {
            for (let i = 0; i < reservationsInfo.length; i++) {
                const allButtons = document.querySelectorAll(`[seat="${reservationsInfo[i].column}"][row="${reservationsInfo[i].row}"]`)
                allButtons[0].classList.add('blockedSeat')
            }
        }
    }, [reservationsInfo])

    return (
        <div className="ClassroomSkecth">
            {error && <div className="ClassroomSkecth__message alert">{error}</div>}
            {message && <div className="ClassroomSkecth__message">{message}</div>}
            {!message &&
                <>
                    <div className="instructor-info">
                        <span className="avatar" style={{background: `url(${lesson.instructor.user.avatar}) no-repeat center center / cover`}}></span>
                        <span className="name">{lesson.instructor.user.name}</span>
                    </div>
                    {rows.map((el, i) =>
                        <div row={i} className="row justify-content-center">
                            {drawSeats(el).map((el, j) =>
                                <Button className={`classroom-place ${lesson.discipline}`} row={i} seat={j} onClick={bookSeat}>{el}</Button>
                            )}
                        </div>
                    )}
                    {(bool && !hideSelectSeat && !isWaitingList) &&
                        <p className="text-center">Select a seat to make a reservation.</p>
                    }
                    {isWaitingList &&
                        <>
                            <hr />
                            <p className="text-center"><strong>No seats lefts for this classroom,</strong> get on the waiting list and we'll notify you if someone calcels their reservation.</p>
                            <Button className="button __yellow-btn waiting" onClick={addToWaitingList}>Add to waiting list</Button>
                        </>
                    }
                </>
            }
        </div>
    )
}
