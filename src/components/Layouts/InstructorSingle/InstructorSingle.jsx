import React, {useState, useEffect} from 'react'
import {getInstructorInfo, followInfo} from '../../../services/ApiClient'
import Banner from '../../Banner/Banner'
import InstructorLessons from '../../InstructorLessons/InstructorLessons'
import {useAuthContext} from '../../../contexts/AuthContext'
import Button from '../../Button/Button'

export default function InstructorSingle(props) {

    const instructor = props.location.state.instructor
    const id = props.location.state.id
    const [instructorData, setInstructorData] = useState([])
    const [lessonList, setLessonList] = useState([])
    const [bool, setBool] = useState(false)

    const {login} = useAuthContext()

    const follow = () => {
        followInfo(id)
            .then((res) => {
                login(res[0])
                setBool(!bool)
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        const fetchInstructor = async () => {
            const instructor = await getInstructorInfo(id)
            setInstructorData(instructor[0])
            setLessonList(instructor[1])
        }
        fetchInstructor()
    }, [id])

    return (

        <section className="MyInfoInstructor container-fluid margin-top">
            <Banner title={instructor.name} subtitle={instructorData?.disciplines} />
            <div className="container gym-info">
                <div className="row m-0">
                    <div className="col-sm-4 col-12">
                        <span className="address">{instructorData?.user?.address}</span>
                        <span className="contact">
                            <strong>P</strong> {instructorData?.user?.phone}<br />
                            <strong>M</strong> {instructorData?.user?.email}
                        </span>
                        <Button onClick={follow} className={!bool ? 'button __follow-btn' : 'button __yellow-btn'}>{!bool ? 'follow' : 'unfollow'} {instructor.name}</Button>
                    </div>
                    {instructorData?.role === 'Instructor' &&
                        <div className="col-12 col-sm-8 d-flex justify-content-center coach-avatar-row">
                            <div className="coach-avatar" style={{background: `url(${instructorData?.user?.avatar}) no-repeat center center / cover`}}></div>
                        </div>
                    }
                </div>
            </div>
            <div className="container-fluid quote">
                <h1>{instructorData.quote}</h1>
            </div>
            {lessonList ? <InstructorLessons title="My upcoming lessons" data={lessonList} /> : <p>Loading</p>}
        </section>

    )
}
