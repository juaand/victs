import React from 'react'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'

const MyInfoInstructor = (props) => {
    return (
        <>
        <UserAccordeon user={props.user} />
        <div style={{margintop: `300px`}}>
            <h1>HOLA TEACHER</h1>
        </div>
        </>
    )
}

export default MyInfoInstructor