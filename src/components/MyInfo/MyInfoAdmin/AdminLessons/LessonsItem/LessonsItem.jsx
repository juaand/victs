import './LessonsItem.css'
import React from 'react'

export default function LessonsItem({lesson, onClick}) {

    return (
        <div className="lesson-item col-sm-2 col-6 LessonsItem" onClick={() => onClick(lesson)}>
            <span className={lesson?.discipline}></span>
            <span>
                <div className="lesson __name"><strong>{lesson?.name}</strong></div>
                <div className="lesson __discipline">{lesson?.discipline}</div>
                <div className="lesson __instructor">{lesson?.instructor?.user?.name}</div>
                <div className="lesson __gym">{lesson?.gym?.user?.name}</div>
                <div className="lesson __time">{lesson?.duration}''</div>
                <div className="lesson __capacity">{lesson?.capacity} seats</div>
            </span>
        </div>
    )
}
