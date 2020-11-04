import './LessonGuests.css'
import React from 'react'

export default function LessonGuests({guest}) {

    return (
        <>
            <div className="container-fluid my-plans LessonGuests">
                <div className="container">
                    <div className="row">
                        <div className="col-4 item">
                            <h1>Guests joining this lesson</h1>
                        </div>
                        <div className="col-8 lesson-guest">
                            <div className="row">
                                <div className="guest-name col-4">
                                    <span className="avatar" style={{background: `url(${guest.user.avatar}) no-repeat center center / cover`}}></span>
                                    <span className="guest-mail">
                                        {guest.user.name}
                                        <span className="email">{guest.user.email}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
