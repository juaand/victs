import './MyInfo.css'
import React from 'react'

const MyInfo = (props) => {

    const getGymName = (arr) => {
        return arr.filter((ele, ind) => ind === arr.findIndex(elem => elem.gym.user.name === ele.gym.user.name))
    }

    const byLessons = props.user.lessons.reduce((acc, e) => {
        acc[e.gym.id] = (acc[e.gym.id] || [])
        acc[e.gym.id].push(e)
        return acc
    }, {})

    console.log(byLessons)

    return (
        <div className="container my-info">
            <div className="row">
                <div className="col-12">
                    VICTS USER LOGGED
                    <p>{props.user.name}</p>
                    <p>{props.user.role}</p>
                    <p>{props.user.email}</p>
                    <div className="avatar" style={{background: `url(${props.user.avatar}) no-repeat center center / cover`}}></div>
                    <p>{props.user.address} - {props.user.city} - {props.user.zipcode}</p>
                    {getGymName(props.user.lessons).map(el =>
                        <div className="row gym-name">
                            <div className="col-4">
                                {el.gym.user.name}
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-3">
                                        {Object.keys(byLessons).map(key =>
                                            key === el.gym.id ?
                                                byLessons[key].forEach(el =>
                                                    <p>{el.name}</p>
                                                ) : ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyInfo