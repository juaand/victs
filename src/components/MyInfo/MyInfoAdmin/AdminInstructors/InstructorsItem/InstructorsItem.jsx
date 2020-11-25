import './InstructorsItem.css'
import React from 'react'

export default function InstructorItem({instructor, onClick}) {

    return (
        <div className="instructor-item col-sm-3 col-6" onClick={() => onClick(instructor)} >
            <div className="instructor __name">{instructor?.user?.name?.replace(/ .*/, '')}</div>
            <div className="instructor __discipline">{instructor?.disciplines}</div>
            <div className="instructor __avatar" style={{background: `url(${instructor?.user?.avatar}) no-repeat center center / cover`}} ></div>
        </div>
    )
}
