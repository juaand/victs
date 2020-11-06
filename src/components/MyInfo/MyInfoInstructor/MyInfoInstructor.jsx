import './MyInfoInstructor.css'
import React, {useState, useEffect} from 'react'
import {getInstructorLessons, getFollowersUsers} from '../../../services/ApiClient'
import ContactBlockNoFollowBtn from '../../ContactBlockNoFollowBtn/ContactBlockNoFollowBtn'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'
import InstructorGymLessons from '../../InstructorGymLessons/InstructorGymLessons'
import FollowInfoBar from '../../FollowInfoBar/FollowInfoBar'
import InstructorLessons from '../../InstructorLessons/InstructorLessons'

const MyInfoInstructor = ({user, instructor}) => {

    const [lessonList, setLessonList] = useState([])
    const [bool, setBool] = useState(false)
    const [followersList, setFollowersList] = useState([])

    const hideModal = () => {
        setBool(!bool)
    }

    const showFollowers = async () => {
        setBool(!bool)
        const res = await getFollowersUsers(user.followers)
        setFollowersList(res)
        console.log(res)
    }

    useEffect(() => {
        const fetchData = async () => {
            const lessons = await getInstructorLessons(instructor.id)
            setLessonList(lessons)
        }
        fetchData()
    }, [instructor.id])

    return (
        <section className="MyInfoInstructor">
            {bool &&
                <section className="followers-modal modal">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-6 col-12 followers-content modal-body">
                                <span className="close" onClick={hideModal}></span>
                                <h1>{user.name} <br />followers</h1>
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
            <UserAccordeon user={user} instructorInfo={instructor} />
            <FollowInfoBar followInfo={user} onClick={showFollowers} />
            <ContactBlockNoFollowBtn contactInfo={instructor} />
            <div className="container-fluid quote">
                <h1>{instructor.quote}</h1>
            </div>
            {lessonList ? <InstructorGymLessons title="Upcoming gym lessons" data={lessonList} /> : <p>Loading</p>}
            {lessonList ? <InstructorLessons title="My upcoming lessons" data={lessonList} /> : <p>Loading</p>}
        </section>
    )
}

export default MyInfoInstructor