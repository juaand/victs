import './UserItem.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default function UserItem({user, onClick}) {

    return (
        <div className="user-item col-sm-3 col-6" onClick={() => onClick(user)}>
            <div className="user __name">{user?.name?.replace(/ .*/, '')}</div>
            <div className="user __discipline">{user?.email}</div>
            <div className="user __avatar" style={{background: `url(${user?.avatar}) no-repeat center center / cover`}} ></div>
        </div>
    )
}
