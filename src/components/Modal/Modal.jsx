import './Modal.css'
import React from 'react'
import Button from '../Button/Button'
import ClassroomSkecth from '../ClassroomSkecth/ClassroomSkecth'

export default function Modal({data, onClick, onCancel, seats, reservations, hideCancel, hideSelectSeat}) {

    return (
        <div className="modal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-12 modal-body">
                        <span className="close" onClick={onClick}></span>
                        <h1>{data.name}</h1>
                        <p className="discipline">{data.discipline}</p>
                        <p><strong>Lesson detail</strong> {data.details}</p>
                        <hr />
                        <ClassroomSkecth rows={data.classroom.rows} lesson={data} reservations={reservations} seats={seats} hideSelectSeat={hideSelectSeat} />
                        {!hideCancel &&
                            <div className="col-12 d-flex justify-content-center">
                                <Button className="button __yellow-btn" onClick={onCancel}>Cancel reservation</Button></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
