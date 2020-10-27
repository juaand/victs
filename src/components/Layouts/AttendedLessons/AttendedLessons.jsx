import './AttendedLessons.css'
import React from 'react'

const AttendedLessons = ({title, message, strong, data}) => {

        return (
            <div className="container empty-row">
                <div className="row">
                    <div className="col-4 title">
                        <h1>{title}</h1>
                    </div>
                    <div className="col-8 message">
                        <p>{message}</p>
                        <strong>{strong}</strong>
                    </div>
                </div>
            </div>
        )

}

export default AttendedLessons
