import './UserInfo.css'
import React from 'react'
import UserInfoItem from '../../UserInfoItem/UserInfoItem'

const UserInfo = ({title, data}) => {

    return (
        <div className="container user-info">
            <div className="row">
                <div className="col-sm-4 col-12 title">
                    <h1>{title}</h1>
                </div>
                <div className="col-sm-8 col-12 message">
                    <div className="row">
                        <UserInfoItem title="gyms" />
                        <UserInfoItem className="yellow-title" title="instructors" />
                        <UserInfoItem className="blue-title" title="friends" />
                        <UserInfoItem className="purple-title" title="badgets" />
                    </div>

                </div>
            </div>
        </div>
    )

}

export default UserInfo
