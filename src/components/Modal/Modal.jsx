import './Modal.css'
import React from 'react'
import Button from '../Button/Button'
import ClassroomSkecth from '../ClassroomSkecth/ClassroomSkecth'
import { unbooking } from '../../services/ApiClient'

export default function Modal({data, onClick, seats, reservations}) {

    const reservationId = reservations.id
    const lessonId = reservations.lesson

    const cancelReservation = async () => {

        const unbook = await unbooking(reservations)
        console.log(unbook)
    }

    return (
        <div className="modal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 modal-body">
                        <span className="close" onClick={onClick}></span>
                        <h1>{data.name}</h1>
                        <p className="discipline">{data.classroom.discipline}</p>
                        <p><strong>Lesson detail</strong> {data.details}</p>

                        <ClassroomSkecth rows={data.classroom.rows} lesson={data} reservations={reservations} seats={seats} />

                        <div className="col-12 d-flex justify-content-center">
                            <Button className="button __yellow-btn" onClick={cancelReservation}>Cancel reservation</Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
