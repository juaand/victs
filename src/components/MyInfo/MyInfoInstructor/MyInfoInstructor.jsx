import React from 'react'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'

const MyInfoInstructor = (props) => {
    return (
        <>
        <UserAccordeon user={props.user} instructorInfo={props.instructor} />
        <div>
            <h1>HOLA TEACHER</h1>
        </div>
        </>
    )
}

export default MyInfoInstructor