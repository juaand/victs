import './UserInfoItem.css'
import React from 'react'

const UserInfoItem = ({title, data, className}) => {
    return (
        <div className="col-6 col-sm-3 user-info-item">
            <h4 className={`title __${className}`}>My {title}</h4>
            {!data && <p>No {title} yet</p>}
        </div>
    )
}

export default UserInfoItem
