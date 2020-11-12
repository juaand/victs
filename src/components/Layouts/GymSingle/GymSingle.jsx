import './GymSingle.css'
import React, {useState, useEffect} from 'react'
import {getGymDetail, lessonInfo} from '../../../services/ApiClient'
import Banner from '../../Banner/Banner'
import ContactBlock from '../../ContactBlock/ContactBlock'
import AttendedLessons from '../AttendedLessons/AttendedLessons'
import ContentWithLessons from '../../ContentWithLessons/ContentWithLessons'
import ContentWithInstructors from '../../ContentWithInstructors/ContentWithInstructors'
import Modal from '../../Modal/Modal'

export default function GymSingle(props) {

    const [gymData, setGymdata] = useState([])
    const [bool, setBool] = useState(false)
    const [lessonData, setLessonData] = useState([])
    const [reservationData, setReservationdata] = useState([])

    const gym = props.location.state.gym

    useEffect(() => {
        getGymDetail(props.location.state.id)
            .then(gym => {
                setGymdata(gym)
            })
            .catch((e) => console.log(e))
    }, [props.location.state.id])


    const showModal = async (data) => {

        try {
            const lessonResult = await lessonInfo(data.id)
            setLessonData(lessonResult[1])
            setReservationdata(lessonResult[0])
            setBool(!bool)

        } catch (err) {
            console.log(err)
        }
    }

    const hideModal = () => {
        setBool(!bool)
    }

    return (
        <>
            {bool && <Modal onClick={hideModal} data={lessonData} reservations={reservationData} hideCancel/>}
            <div className="container-fluid margin-top gym-single">
                <Banner title={gym.name} subtitle={gym.city} />
                <ContactBlock contactInfo={gym} />
                {!gymData.length &&
                    <AttendedLessons title="Upcoming lessons" message="Oops no lessons added" strong="what you're waiting for? add new ones!" />
                }
                {gymData.length ? <ContentWithLessons onClick={showModal} title="Upcoming lessons" data={gymData} /> : ""}
                <ContentWithInstructors title="Instructors" data={gymData} />
            </div>
        </>
    )
}
