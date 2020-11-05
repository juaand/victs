import './LessonGuests.css'
import React from 'react'

export default function LessonGuests({guest}) {

    return (
        <div className="guest-name col-6">
            <span className="avatar" style={{background: `url(${guest.user.avatar}) no-repeat center center / cover`}}></span>
            <span className="guest-mail">
                {guest.user.name}
                <span className="email">{guest.user.email}</span>
            </span>
        </div>
    )
}
