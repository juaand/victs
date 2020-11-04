import './MyInfo.css'
import React, {useEffect, useState} from 'react'
import CalendarItem from '../../CalendarItem/CalendarItem'
import MyPlans from '../../Layouts/MyPlans/MyPlans'
import AttendedLessons from '../../Layouts/AttendedLessons/AttendedLessons'
import WaitingLessons from '../../Layouts/WaitingLessons/WaitingLessons'
import UserInfo from '../../Layouts/UserInfo/UserInfo'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'
import Modal from '../../Modal/Modal'
import {unbooking, updateUser} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'

const MyInfo = (props) => {

    const {login} = useAuthContext()

    const [bool, setBool] = useState(false)
    const [modalData, setModalData] = useState([])
    const [reservationData, setReservationData] = useState([])
    const [userStatus, setUserStatus] = useState(props.user)
    const [messageOnCancel, setMessageOnCancel] = useState('')

    const getGymName = (arr) => {
        return arr.filter((ele, ind) => ind === arr.findIndex(elem => elem.gym.user.name === ele.gym.user.name))
    }

    const byLessons = userStatus.lessons.reduce((acc, e) => {
        acc[e.gym.id] = (acc[e.gym.id] || [])
        acc[e.gym.id].push(e)
        return acc
    }, {})

    const checkSeat = (lessonData) => {
        const reservedSeats = userStatus.reservations.filter(el => el.lesson === lessonData.id)
        setReservationData(reservedSeats)
    }

    const showModal = (lessonData) => {
        checkSeat(lessonData)
        setModalData(lessonData)
        setBool(!bool)
        setMessageOnCancel('')
    }

    const hideModal = () => {
        setBool(!bool)
    }

    useEffect(() => {
        document.querySelector('.navbar').classList.add('__grayHeader')
    }, [])

    useEffect(() => {
        setUserStatus(props.user)
    }, [props.user])


    const cancelReservation = async () => {
        setMessageOnCancel('Your book has been cancelled successfully.')
        const unbook = await unbooking(reservationData)
        setBool(!bool)
        updateUser(unbook[3])
            .then(user => {
                console.log(user[0])
                login(user[0])
                setUserStatus(user[0])
            })
        setTimeout(() => {
            setMessageOnCancel('')
        }, 3000)
    }


    return (
        <>
            <UserAccordeon user={userStatus} />
            {messageOnCancel &&
                <div className="cancel-message">
                    <p className="juan-la-mamarracha">{messageOnCancel}</p>
                </div>
            }
            <MyPlans plans={userStatus.packages} />
            <AttendedLessons title="Attended lessons" message="Oops no lessons attended..." strong="Keep calm and move on" />

            {userStatus.lessons &&
                <div className="container my-info">
                    {bool && <Modal onClick={hideModal} data={modalData} reservations={reservationData} onCancel={cancelReservation} hideSelectSeat />}
                    <div className="row">
                        <div className="col-12">
                            {getGymName(userStatus.lessons).map(el =>
                                <div className="row gym-name">
                                    <div className="col-4">
                                        <h1 className="big-yellow">Upcoming classes scheduled in <span>{el.gym.user.name}</span></h1>
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            {Object.keys(byLessons).map(key =>
                                                key === el.gym.id &&
                                                byLessons[key].map(el =>
                                                    <CalendarItem
                                                        capacity={el.capacity}
                                                        data={el}
                                                        onClick={() => showModal(el)}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
            <>
                <WaitingLessons title="Waiting list lessons" message="No lessons on waiting list" strong="That's good news" />
                <UserInfo title="My info" data={userStatus} />
            </>
        </>
    )
}

export default MyInfo

