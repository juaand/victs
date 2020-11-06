import React from 'react'
import {Link} from 'react-router-dom'

const InstructorItem = (props) => {

    console.log(props)

    return (
        <Link className="col-12 col-sm-3 gym-card" to={{
            pathname: '/instructor-detail',
            state: {
                id: props.info.id,
                instructor: props.info.user
            }
        }}>
            <span className="avatar" style={{background: `url(${props.info.user.avatar}) no-repeat center center / cover`}}></span>
            <h2>{props.info.user.name}</h2>
            <p className="address">{props.info.user.address}<br /> {props.info.user.city} - {props.info.user.zipcode}</p>
            <p className="phone">{props.info.user.phone}</p>
            <p className="services">{props.info?.disciplines?.map(el => <span>{el}</span>)}</p>
        </Link>
    )
}

export default InstructorItem
