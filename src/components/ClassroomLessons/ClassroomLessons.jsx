import './ClassroomLessons.css'

import React from 'react'

export default function ClassroomLessons({lesson}) {
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
                                {lesson.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
