import './GymsItem.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default function GymsItem({gym}) {

    return (
        <Link to={{
            pathname: '/gym-detail',
            state: {
                id: gym?.id,
                gym: gym?.user
            }
        }} className="gym-item col-sm-3 col-6">
            <div className="gym __name">{gym?.user?.name?.replace(/ .*/, '')}</div>
            <div className="gym __discipline">{gym?.services}</div>
            <div className="gym __avatar" style={{background: `url(${gym?.user?.avatar}) no-repeat center center / cover`}} ></div>
        </Link>
    )
}
