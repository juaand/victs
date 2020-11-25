import './InstructorsItem.css'
import React from 'react'

export default function InstructorItem({instructor, onClick}) {

    return (
        <div className="col-sm-2 col-6 InstructorsItem" onClick={() => onClick(instructor)} >
            <div className="user __avatar" style={{background: `url(${instructor?.user?.avatar}) no-repeat center center / cover`}} ></div>
            <span>
                <div className="instructor __name"><strong>{instructor?.user?.name}</strong></div>
                <div className="instructor __discipline">{instructor?.disciplines}</div>
            </span>
        </div>
    )
}
