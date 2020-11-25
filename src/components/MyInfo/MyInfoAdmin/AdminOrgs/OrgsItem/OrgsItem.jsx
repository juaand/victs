import './OrgsItem.css'
import React from 'react'

export default function OrgsItem({org, onClick}) {

    console.log(org)
    return (
        <div className="org-item col-sm-3 col-6" onClick={() => onClick(org)}>
            <div className="org __name">{org?.name?.replace(/ .*/, '')}</div>
            <div className="org __discipline">{org?.role}</div>
            <div className="org __discipline">Points: {org?.points}</div>

            <div className="org __avatar" style={{background: `url(${org?.avatar}) no-repeat center center / cover`}} ></div>
        </div>
    )
}
