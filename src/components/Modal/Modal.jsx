import './Modal.css'
import React, {useState} from 'react'
import Button from '../Button/Button'
import ClassroomSkecth from '../ClassroomSkecth/ClassroomSkecth'

export default function Modal({data, onClick, seats}) {

    const cancelReservation = () => {
        console.log('cancel reservation')
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

                        <ClassroomSkecth rows={data.classroom.rows} lesson={data} seats={seats} />

                        <Button className="button __yellow-btn" onClick={cancelReservation}>Cancel reservation</Button>
                    </div>
                </div> 
            </div>
        </div>
    )
}
