import './Modal.css'
import React from 'react'
import Button from '../Button/Button'
import ClassroomSkecth from '../ClassroomSkecth/ClassroomSkecth'

export default function Modal({data, onClick, onRemoveWaitingLesson, onCancel, seats, reservations, hideCancel, hideSelectSeat, waitingList}) {

    const filteredReservations = reservations?.filter(el => el.lesson === data.id)
    const classroomCapacity = data.classroom?.rows?.reduce((acc, el) => acc + parseInt(el), 0)
    

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
                        {!waitingList &&
                            <ClassroomSkecth rows={data.classroom.rows} lesson={data} reservations={reservations} seats={seats} hideSelectSeat={hideSelectSeat} isWaitingList={filteredReservations?.length === classroomCapacity ? true : false} />
                        }
                        {!hideCancel && !waitingList &&
                            <div className="col-12 d-flex justify-content-center">
                                <Button className="button __yellow-btn" onClick={onCancel}>Cancel reservation</Button></div>
                        }
                        {waitingList && 
                            <div className="cancel-waiting text-center">
                                <p>Need to remove this lesson in the waiting list?</p>
                                <Button className="btn __yellow-btn" onClick={() => onRemoveWaitingLesson(data.id)}>Remove from waiting list</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
