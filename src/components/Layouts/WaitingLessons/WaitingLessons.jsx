import './WaitingLessons.css'
import React, {useState} from 'react'
import CalendarItem from '../../CalendarItem/CalendarItem'
import Modal from '../../Modal/Modal'

const WaitingLessons = ({title, message, strong, data, onClick}) => {

    const [bool, setBool] = useState(false)
    const [clickedLessonId, setClickedLessonId] = useState('')

    const showModal = (lessonId) => {
        setBool(!bool)
        setClickedLessonId(lessonId)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    return (
        <>
            {bool && <Modal onClick={hideModal}
                onRemoveWaitingLesson={(lessonId) => {
                    onClick(lessonId)
                    hideModal()
                }
                } data={clickedLessonId} waitingList />}
            {data && data.length > 0 ?
                <div className="container waiting-row">
                    <div className="row" >
                        <div className="col-sm-4 col-12 title">
                            <h1>{title}</h1>
                        </div>
                        <div className="col-sm-8 col-12">
                            <div className="row">
                                {data.map(el => <CalendarItem data={el.lesson} onClick={(lessonId) => showModal(lessonId)} waitingList />)}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container waiting-row">
                    <div className="row">
                        <div className="col-sm-4 col-12 title">
                            <h1>{title}</h1>
                        </div>
                        <div className="col-sm-8 col-12 message">
                            <p>{message}</p>
                            <strong>{strong}</strong>
                        </div>
                    </div>
                </div>}
        </>
    )

}

export default WaitingLessons
