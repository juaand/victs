import './ClassroomLessons.css'

import React from 'react'

export default function ClassroomLessons({lesson}) {

    console.log(lesson)
    return (
        <>
            <div className="container-fluid my-plans LessonGuests">
                <div className="container">
                    <div className="row">
                        <div className="col-4 item">
                            <h1>Lessons attendend in this classroom</h1>
                        </div>
                        <div className="col-8 lesson-guest">
                            <div className="row">
                                <div className="guest-name col-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <span className="lesson-name">{lesson.name}</span>
                                        </div>
                                        <div className="col-12 d-flex align-items-center">
                                            <span className="avatar" style={{background: `url(${lesson.instructor.user.avatar}) no-repeat center center / cover`}}></span>
                                            <span className="d-flex flex-column">
                                                <span className="instructor-name">{lesson.instructor.user.name}
                                                </span>
                                                <span className="instructor-email">{lesson.instructor.user.email}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
