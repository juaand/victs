import './ClassroomLessons.css'

import React from 'react'

export default function ClassroomLessons({lesson}) {

    const formatDate = (date) => {
        const format = (s) => (s < 10 ? '0' + s : s)
        var d = new Date(date)
        return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join(
            '/'
        )
    }

    return (
        <div className="guest-name col-6">
            <div className="row">
                <div className="col-12">
                    <span className="lesson-name">{lesson.name}</span>
                    <span className="lesson-date"><strong>D</strong> {formatDate(lesson.date)}</span>
                    <span className="lesson-hour"><strong>T</strong>  {new Date(lesson.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                </div>
                <div className="col-12 d-flex align-items-center">
                    <span className="avatar" style={{background: `url(${lesson.instructor.user.avatar}) no-repeat center center / cover`}}></span>
                    <span className="d-flex flex-column">
                        <span className="instructor-name">{lesson.instructor.user.name}
                        </span>
                        <span className="instructor-email"><strong>M</strong>  {lesson.instructor.user.email}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}
