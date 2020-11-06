import './InstructorItem.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default function InstructorItem({instructor}) {

    return (
        <Link to='/instructor-detail' className="instructor-item col-sm-3 col-6">
            <div className="instructor __name">{instructor.user.name.replace(/ .*/,'')}</div>
            <div className="instructor __discipline">{instructor.disciplines}</div>
            <div className="instructor __avatar" style={{background: `url(${instructor.user.avatar}) no-repeat center center / cover`}} ></div>
        </Link>
    )
}
