import './Modal.css'
import React, {useState} from 'react'
import Button from '../Button/Button'
import ClassroomSkecth from '../ClassroomSkecth/ClassroomSkecth'

export default function Modal({data, onClick, reservationData}) {

    const [bool, setBool] = useState(false)

    const showClassroom = () => {
        setBool(!bool)
    }

    return (
        <div className="modal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 modal-body">
                        <span className="close" onClick={onClick}></span>
                        <h1>{data.name}</h1>
                        <p><strong>Instructor</strong> {data.instructor.user.name}</p>
                        <p><strong>Seats lefts</strong> {data.capacity}</p>
                        <p>{data.classroom.discipline}</p>
                        <p>{data.details}</p>

                        {!data.classroom.rows.length ? <Button onClick className="button __yellow-btn">Book lesson</Button> :
                            <Button onClick={showClassroom} className="button __yellow-btn">Select seat</Button>}

                        {bool && <ClassroomSkecth reservationData={reservationData} rows={data.classroom.rows} lesson={data} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
