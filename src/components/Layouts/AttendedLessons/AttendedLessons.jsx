import './AttendedLessons.css'
import React from 'react'

const AttendedLessons = ({title, message, strong, data}) => {

        return (
            <div className="container empty-row">
                <div className="row">
                    <div className="col-sm-4 col-12 title">
                        <h1>{title}</h1>
                    </div>
                    <div className="col-sm-8 col-12 message">
                        <p>{message}</p>
                        <strong>{strong}</strong>
                    </div>
                </div>
            </div>
        )

}

export default AttendedLessons
