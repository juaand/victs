import './MyInfoGym.css'
import React, {useState, useEffect} from 'react'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'
import {getGymLessons, getGymClassrooms, getFollowersUsers} from '../../../services/ApiClient'
import ContactBlockNoFollowBtn from '../../ContactBlockNoFollowBtn/ContactBlockNoFollowBtn'
import ContentWithLessons from '../../ContentWithLessons/ContentWithLessons'
import ContentWithInstructors from '../../ContentWithInstructors/ContentWithInstructors'
import {useHistory} from 'react-router-dom'
import ContentWithClassrooms from '../../ContentWithClassrooms/ContentWithClassrooms'

const MyInfoGym = ({user, gym}) => {

    const [userStatus, setUserStatus] = useState(user)
    const [gymLessons, setGymLessons] = useState([])
    const [gymClassrooms, setGymClassrooms] = useState([])
    const [followersList, setFollowersList] = useState([])
    const [bool, setBool] = useState(false)
    const history = useHistory()

    const editLesson = async (lesson) => {
        history.push({
            pathname: '/edit-lesson',
            state: {lesson: lesson}
        })
    }

    const showFollowers = async () => {
        setBool(!bool)
        const res = await getFollowersUsers(gym.user.followers)
        setFollowersList(res)
        console.log(res)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    useEffect(() => {
        setUserStatus(user)
    }, [user])

    useEffect(() => {
        const fetchData = async () => {
            const lessons = await getGymLessons(gym.id)
            setGymLessons(lessons)

        }
        fetchData()
    }, [gym.id])

    useEffect(() => {
        const fetchData = async () => {
            const classrooms = await getGymClassrooms(gym.id)
            setGymClassrooms(classrooms)
        }
        fetchData()
    }, [gym.id])

    return (
        <section className="MyInfoGym">
            {bool &&
                <section className="followers-modal modal">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-6 col-12 followers-content modal-body">
                                <span className="close" onClick={hideModal}></span>
                                <h1>{gym.user.name} <br />followers</h1>
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
            <UserAccordeon user={userStatus} gymInfo={gym} />
            <ContactBlockNoFollowBtn contactInfo={gym} onClick={showFollowers} />
            {gymLessons ? <ContentWithLessons onClick={editLesson} title="Upcoming lessons" data={gymLessons} /> : 'Loading'}
            {gymLessons ? <ContentWithInstructors title="Instructors" data={gymLessons} /> : 'Loading'}
            {gymClassrooms ? <ContentWithClassrooms title="Classrooms" data={gymClassrooms} /> : 'Loading'}
        </section>
    )
}

export default MyInfoGym


