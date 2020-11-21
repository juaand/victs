import './LessonsItem.css'
import React from 'react'

export default function LessonsItem({lesson, onClick}) {

    console.log(lesson)
    return (
        <div className="lesson-item col-sm-3 col-6" onClick={() => onClick(lesson)}>
            <div className="lesson __name">{lesson?.name?.replace(/ .*/, '')}</div>
            <div className="lesson __discipline">{lesson?.discipline}</div>
            <div className="lesson __discipline">{lesson?.instructor?.user?.name}</div>
            <div className="lesson __discipline">{lesson?.gym?.user?.name}</div>
            <div className="lesson __discipline">Duration: {lesson?.duration} Capacity: {lesson?.capacity} </div>
            <div className="lesson __avatar" style={{background: `url(${lesson?.gym?.user?.avatar}) no-repeat center center / cover`}} ></div>
        </div>
    )
}
