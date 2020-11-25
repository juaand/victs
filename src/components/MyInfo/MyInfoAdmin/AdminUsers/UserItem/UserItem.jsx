import './UserItem.css'
import React from 'react'

export default function UserItem({user, onClick}) {

    return (
        <div className="user-item col-sm-2 col-6 UserItem" onClick={() => onClick(user)}>
            <div className="user __avatar" style={{background: `url(${user?.avatar}) no-repeat center center / cover`}} ></div>
            <span>
                <div className="user __name"><strong>{user?.name}</strong></div>
                <div className="user __discipline">{user?.email}</div>
                <div className="user __discipline">{user?.phone}</div>
            </span>
        </div>
    )
}
