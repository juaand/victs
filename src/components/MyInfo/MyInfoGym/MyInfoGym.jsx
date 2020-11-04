import './MyInfoGym.css'
import React, {useState, useEffect} from 'react'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'
import {getGymLessons, getGymClassrooms} from '../../../services/ApiClient'
import ContactBlockNoFollowBtn from '../../ContactBlockNoFollowBtn/ContactBlockNoFollowBtn'
import ContentWithLessons from '../../ContentWithLessons/ContentWithLessons'
import ContentWithInstructors from '../../ContentWithInstructors/ContentWithInstructors'
import {useHistory} from 'react-router-dom'
import ContentWithClassrooms from '../../ContentWithClassrooms/ContentWithClassrooms'

const MyInfoGym = ({user, gym}) => {

    console.log(user)
    console.log(gym)

    const [userStatus, setUserStatus] = useState(user)
    const [gymLessons, setGymLessons] = useState([])
    const [gymClassrooms, setGymClassrooms] = useState([])
    const history = useHistory()

    const editLesson = async (lesson) => {
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

    useEffect(() => {
        const fetchData = async () => {
            const classrooms = await getGymClassrooms(gym.id)
            setGymClassrooms(classrooms)
        }
        fetchData()
    }, [gym.id])

    return (
        <>
            <UserAccordeon user={userStatus} gymInfo={gym} />
            <ContactBlockNoFollowBtn contactInfo={gym} />
            {gymLessons ? <ContentWithLessons onClick={editLesson} title="Upcoming lessons" data={gymLessons} /> : 'Loading'}
            <ContentWithInstructors title="Instructors" data={gymLessons} />
            <ContentWithClassrooms title="Classrooms" data={gymClassrooms} />
        </>
    )
}

export default MyInfoGym


