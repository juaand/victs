import './MyInfoGym.css'
import React from 'react'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'

const MyInfoGym = (props) => {
    return (
        <>
            <UserAccordeon user={props.user} gymInfo={props.gym} />
            <div>
                HOLA GYM
        </div>
        </>
    )
}

export default MyInfoGym


