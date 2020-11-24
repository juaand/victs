import './MyInfo.css'
import React, {useEffect, useState} from 'react'
import CalendarItem from '../../CalendarItem/CalendarItem'
import MyPlans from '../../Layouts/MyPlans/MyPlans'
import AttendedLessons from '../../Layouts/AttendedLessons/AttendedLessons'
import WaitingLessons from '../../Layouts/WaitingLessons/WaitingLessons'
import UserInfo from '../../Layouts/UserInfo/UserInfo'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'
import Modal from '../../Modal/Modal'
import {unbooking, updateUser, getFollowersUsers} from '../../../services/ApiClient'
import {useAuthContext} from '../../../contexts/AuthContext'
import FollowInfoBar from '../../FollowInfoBar/FollowInfoBar'
import {unWaitingList} from '../../../services/ApiClient'

const MyInfo = (props) => {

    const {login} = useAuthContext()

    const [bool, setBool] = useState(false)
    const [modalData, setModalData] = useState([])
    const [reservationData, setReservationData] = useState([])
    const [userStatus, setUserStatus] = useState(props.user)
    const [messageOnCancel, setMessageOnCancel] = useState('')
    const [followersList, setFollowersList] = useState([])
    const [useWaitingLessons, setUseWaitingLessons] = useState(userStatus.waitinglists)


    const getGymName = (arr) => {
        return arr.filter((ele, ind) => ind === arr.findIndex(elem => elem?.gym?.user?.name === ele?.gym?.user?.name))
    }

    const getInstructorName = (arr) => {
        return arr.filter((ele, ind) => ind === arr.findIndex(elem => elem?.instructor?.user?.name === ele?.instructor?.user?.name))
    }

    const upcomingLessons = userStatus.lessons.filter((lesson) => lesson.gym !== null && new Date(lesson.date).getTime() > new Date().getTime())

    const upcomingCoachesLessons = userStatus.lessons.filter((lesson) => lesson.gym === null && new Date(lesson.date).getTime() > new Date().getTime())

    const byLessons = upcomingLessons.reduce((acc, e) => {
        acc[e.gym?.id] = (acc[e.gym?.id] || [])
        acc[e.gym?.id].push(e)
        return acc
    }, {})

    const byCoachLessons = upcomingCoachesLessons.reduce((acc, e) => {
        acc[e.instructor?.id] = (acc[e.instructor?.id] || [])
        acc[e.instructor?.id].push(e)
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
        setUserStatus(props.user)
    }, [props.user])

    const showFollowers = async () => {
        setBool(!bool)
        const res = await getFollowersUsers(userStatus.following)
        setFollowersList(res)
    }

    const cancelReservation = async () => {
        setMessageOnCancel('Your book has been cancelled successfully.')
        const unbook = await unbooking(modalData.id, reservationData)
        setBool(!bool)
        updateUser(unbook[3])
            .then(user => {
                login(user[0])
                setUserStatus(user[0])
            })
        setTimeout(() => {
            setMessageOnCancel('')
        }, 3000)
    }

    useEffect(() => {
        setUserStatus(props.user)
    }, [props.user])

    const removeFromWaitingList = async (lessonId) => {
        const result = await unWaitingList(lessonId)
        login(result[1])
        setUseWaitingLessons(result[1].waitinglists)
    }


    return (
        <>
            {bool &&
                <section className="followers-modal modal">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-6 col-12 followers-content modal-body">
                                <span className="close" onClick={hideModal}></span>
                                <h1>{userStatus.name} <br />followers</h1>
                                {followersList.map(el =>
                                    <div className="follower">
                                        <span className="avatar" style={{background: `url(${el.avatar}) no-repeat center center / cover`}}>
                                        </span>
                                        {el.name}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </section>
            }
            <UserAccordeon user={userStatus} />
            {messageOnCancel &&
                <div className="cancel-message">
                    <p className="juan-la-mamarracha">{messageOnCancel}</p>
                </div>
            }
            <FollowInfoBar followInfo={userStatus} onClick={showFollowers} />
            <MyPlans plans={userStatus.packages} />
            <AttendedLessons title="Attended lessons" message="Oops no lessons attended..." strong="Keep calm and move on" data={props.user} />

            {userStatus.lessons &&
                <div className="container my-info">
                    {bool && <Modal onClick={hideModal} data={modalData} reservations={reservationData} onCancel={cancelReservation} hideSelectSeat />}
                    <div className="row">
                        <div className="col-12">
                            {byLessons && getGymName(upcomingLessons).map(el =>
                                <div className="row gym-name">
                                    <div className="col-sm-4 col-12">
                                        <h1 className="big-yellow">Upcoming classes scheduled in <span>{el.gym?.user?.name}</span></h1>
                                    </div>
                                    <div className="col-sm-8 col-12">
                                        <div className="row">
                                            {Object.keys(byLessons).map(key =>
                                                key === el.gym?.id &&
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
                            {byCoachLessons && getInstructorName(upcomingCoachesLessons).map(el =>
                                <div className="row gym-name">
                                    <div className="col-sm-4 col-12">
                                        <h1 className="big-pink">Upcoming classes scheduled with <span>{el.instructor?.user?.name}</span></h1>
                                    </div>
                                    <div className="col-sm-8 col-12">
                                        <div className="row">
                                            {Object.keys(byCoachLessons).map(key =>
                                                key === el.instructor?.id &&
                                                byCoachLessons[key].map(el =>
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
            <WaitingLessons title="Waiting list lessons" message="No lessons on waiting list" strong="That's good news" data={useWaitingLessons} onClick={removeFromWaitingList} />
            <UserInfo title="My info" data={userStatus} />
        </>
    )
}

export default MyInfo

