import './OrgsItem.css'
import React from 'react'

export default function OrgsItem({org, onClick}) {

    return (
        <div className="org-item col-sm-2 col-6 OrgsItem" onClick={() => onClick(org)}>
            <div className="org __avatar" style={{background: `url(${org?.avatar}) no-repeat center center / cover`}} ></div>
            <span>
                <div className="org __name"><strong>{org?.name}</strong></div>
                <div className="org __role">{org?.role}</div>
                <div className="org __discipline"><strong>{org?.points}</strong> Points</div>
                <div className="org __discipline">{org?.url}</div>
                {org?.points === 1000 &&
                    <div className="donate">It's time to donate!!</div>
                }
            </span>
        </div>
    )
}
