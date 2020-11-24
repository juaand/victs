import './InstructorLessons.css'
import React, {useState} from 'react'
import Button from '../Button/Button'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../contexts/AuthContext'
import {booking} from '../../services/ApiClient'

export default function InstructorLessons({title, data}) {

    const {user} = useAuthContext()
    const {login} = useAuthContext()
    const [bool, setBool] = useState(false)
    const history = useHistory()

    const showAll = () => {
        setBool(!bool)
    }

    const formatDate = (date) => {
        const format = (s) => (s < 10 ? '0' + s : s)
        var d = new Date(date)
        return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    const bookInstructorLesson = async (lessonId) => {
        const result = await booking(lessonId, 50, 50)
        login(result[4])
        history.push('/my-info')
    }

    return (
        <>
            <div className="container InstructorLessons">
                <div className="row p-0 row-block">
                    <div className="col-12 col-sm-4">
                        <h1 className="__title purple">{title}</h1>
                        {data.lenght &&
                            <p className="show-all" onClick={showAll}>{!bool ? 'See' : 'Hide'} all</p>
                        }
                    </div>
                    <div className="col-12 col-sm-8">

                        {!bool ?
                            <div className="row p-0">
                                {data.length ? data.filter(el => !el.gym).slice(0, 4).map(lesson =>
                                    <div className="false-link calendar-item col-sm-3 col-6">
                                        <span className="cal-item __date">{formatDate(lesson.date)}</span>
                                        <span className="cal-item __hour">{new Date(lesson.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                                        <span className="cal-item __discipline">{lesson.name}</span>
                                        <span>{lesson.address}</span>
                                        <span className="capacity">{lesson.capacity}</span>
                                        {console.log(user.reservations.filter(el => el.lesson === lesson.id))}
                                        {console.log(user.reservations)}
                                        {console.log(lesson.id)}
                                        {user.reservations.filter(el => el.lesson?.id === lesson.id).length && user.role === 'Guest' ?
                                            <span className="already-booked">Already booked</span>
                                            :
                                            <Button className="btn __yellow-btn" onClick={() => bookInstructorLesson(lesson.id)}>Book</Button>
                                        }
                                    </div>
                                ) : <h2>No personal lessons added <strong>what your waiting for?</strong></h2>}
                            </div> : <div className="row p-0">
                                {data.filter(el => !el.gym).map(lesson =>
                                    <div className="false-link calendar-item col-sm-3 col-6 border-bottom">
                                        <span className="cal-item __date">{formatDate(lesson.date)}</span>
                                        <span className="cal-item __hour">{new Date(lesson.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                                        <span className="cal-item __discipline">{lesson.name}</span>
                                        <span>{lesson.address}</span>
                                        <span className="capacity">{lesson.capacity}</span>
                                        {user.reservations.filter(el => el.lesson === lesson.id) && user.role === 'Guest' ?
                                            <span className="already-booked">Already booked</span>
                                            :
                                            <Button className="btn __yellow-btn" onClick={() => bookInstructorLesson(lesson.id)}>Book</Button>
                                        }
                                    </div>
                                )}
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
