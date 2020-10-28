import React from 'react'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'

export default function MyInfoGym(props) {
    return (
        <>
            <UserAccordeon user={props.user} gymInfo={props.gym} />
            <div>
                HOLA GYM
        </div>
        </>
    )
}


