import './GymsItem.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default function GymsItem({gym, onClick}) {

    return (
        <div className="gym-item col-sm-3 col-6" onClick={() => onClick(gym)} >
            <div className="gym __name">{gym?.user?.name?.replace(/ .*/, '')}</div>
            <div className="gym __discipline">{gym?.services}</div>
            <div className="gym __avatar" style={{background: `url(${gym?.user?.avatar}) no-repeat center center / cover`}} ></div>
        </div>
    )
}
