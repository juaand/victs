import './GymsItem.css'
import React from 'react'

export default function GymsItem({gym, onClick}) {

    return (
        <div className="gym-item col-sm-2 col-6 GymsItem" onClick={() => onClick(gym)}>
            <div className="user __avatar" style={{background: `url(${gym?.user?.avatar}) no-repeat center center / cover`}} ></div>
            <span>
                <div className="gym __name"><strong>{gym?.user?.name}</strong></div>
                <div className="gym __discipline">{gym?.services}</div>
                <div className="gym __discipline">{gym?.user?.phone}</div>
            </span>
        </div>
    )
}
