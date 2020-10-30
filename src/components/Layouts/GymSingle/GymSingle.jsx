import './GymSingle.css'
import React, {useState, useEffect} from 'react'
import {getGymDetail} from '../../../services/ApiClient'
import Banner from '../../Banner/Banner'
import ContactBlock from '../../ContactBlock/ContactBlock'
import AttendedLessons from '../AttendedLessons/AttendedLessons'
import ContentWithLessons from '../../ContentWithLessons/ContentWithLessons'
import ContentWithInstructors from '../../ContentWithInstructors/ContentWithInstructors'

export default function GymSingle(props) {

    const [gymData, setGymdata] = useState([])

    const gym = props.location.state.gym

    useEffect(() => {
        getGymDetail(props.location.state.id)
            .then(gym => {
                setGymdata(gym)
            })
            .catch((e) => console.log(e))
    }, [props.location.state.id])


    return (
        <div className="container-fluid margin-top">
            <Banner name={gym.name} city={gym.city} />
            <ContactBlock contactInfo={gym} />
            {!gymData.length &&
                <AttendedLessons title="Upcoming lessons" message="Oops no lessons added" strong="come back soon to add new ones" />
            }
            {gymData ? <ContentWithLessons title="Upcoming lessons" data={gymData} /> : 'Loading'}
            <ContentWithInstructors title="Instructors" data={gymData} />
        </div>
    )
}
