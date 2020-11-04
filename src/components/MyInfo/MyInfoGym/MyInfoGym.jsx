import './MyInfoGym.css'
import React, {useState, useEffect} from 'react'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'
import {getGymLessons} from '../../../services/ApiClient'
import ContactBlockNoFollowBtn from '../../ContactBlockNoFollowBtn/ContactBlockNoFollowBtn'
import ContentWithLessons from '../../ContentWithLessons/ContentWithLessons'
import ContentWithInstructors from '../../ContentWithInstructors/ContentWithInstructors'
import {useHistory} from 'react-router-dom'

const MyInfoGym = ({user, gym}) => {

    const [userStatus, setUserStatus] = useState(user)
    const [gymLessons, setGymLessons] = useState([])
    const history = useHistory()

    const editLesson = async (lesson) => {
        console.log(lesson)
        history.push({
            pathname: '/edit-lesson',
            state: { lesson: lesson }
          })
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

    console.log(gymLessons)

    return (
        <>
            <UserAccordeon user={userStatus} gymInfo={gym} />
            <ContactBlockNoFollowBtn contactInfo={gym} />
            {gymLessons ? <ContentWithLessons onClick={editLesson} title="Upcoming lessons" data={gymLessons} /> : 'Loading'}
            <ContentWithInstructors title="Instructors" data={gymLessons} />
        </>
    )
}

export default MyInfoGym


