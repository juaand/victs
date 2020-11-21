import './AttendedLessons.css'
import React, {useState} from 'react'
import CalendarItem from '../../CalendarItem/CalendarItem'
import ModalDonate from '../../ModalDonate/ModalDonate'

const AttendedLessons = ({title, message, strong, data}) => {

    const today = new Date()
    const [bool, setBool] = useState(false)
    const [clickedLessonId, setClickedLessonId] = useState('')

    const attendedArr = data.reservations.filter(el => new Date(el.lesson?.date).getDate() < today.getDate() && new Date(el.lesson?.date).getMonth() === today.getMonth() && new Date(el.lesson?.date).getFullYear() === today.getFullYear())


    const showModal = (lessonId) => {
        setBool(!bool)
        setClickedLessonId(lessonId)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    return (
        <>
            {bool && <ModalDonate onClick={hideModal} lessonId={clickedLessonId} />}
            {attendedArr && attendedArr.length < 0 ?
                <div className="container empty-row">
                    <div className="row">
                        <div className="col-sm-4 col-12">
                            <h1 className="big-purple big">{title}</h1>
                        </div>
                        <div className="col-sm-8 col-12 message">
                            <p>{message}</p>
                            <strong>{strong}</strong>
                        </div>
                    </div>
                </div>
                :
                <div className="container empty-row">
                    <div className="row">
                        <div className="col-sm-4 col-12">
                            <h1 className="big-purple big">{title}</h1>
                        </div>
                        <div className="col-sm-8 col-12">
                            <div className="row">
                                {attendedArr && attendedArr.map(el => <CalendarItem data={el.lesson} points={el.points} oldLessons={true} onClick={(lessonId) => showModal(lessonId)} />)}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default AttendedLessons
