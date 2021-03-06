import './Calendar.css'
import React, {useState} from 'react'
import Banner from '../../Banner/Banner'
import CalendarItem from '../../CalendarItem/CalendarItem'
import SelectWithLabel from '../../Form/SelectWithLabel/SelectWithLabel'
import {getAllLessons, lessonInfo} from '../../../services/ApiClient'
import Modal from '../../Modal/Modal'

export default function Calendar({user}) {

    const colArr = []
    const today = new Date()
    const [currentDay, setCurrentDay] = useState(new Date())
    const [lessons, setLessons] = useState(user?.lessons)
    const [lessonData, setLessonData] = useState([])
    const [reservationData, setReservationdata] = useState([])
    const [bool, setBool] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const drawColumns = (date) => {

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        for (let i = 0; i < 7; i++) {
            let next = new Date(date)
            next.setDate(date.getDate() + i)
            colArr.push(
                <div className="col box">
                    <div className={(date.getDate() + i) === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() ? 'date-num current' : 'date-num'}>
                        {<span className="big-date">
                            {new Date(next).getDate()}
                            <small className="month">/ <span>{new Date(next).getMonth() + 1}
                            </span>
                            </small>
                        </span>}
                        <span className="day">{days[new Date(next).getDay()]}
                        </span>
                    </div>
                    {lessons?.filter(el => new Date(el.date).getDate() === date.getDate() + i && new Date(el.date).getMonth() === currentDay.getMonth() && new Date(el.date).getFullYear() === currentDay.getFullYear()).map(el => <CalendarItem data={el} capacity={el.capacity} onClick={showModal} />)}
                </div>)
        }
        return colArr
    }

    const getLessons = async () => {
        const allLessons = await getAllLessons()
        setLessons(allLessons)
    }

    const changeLessonsView = async (e) => {
        if (e.target.value === "My lessons") {
            setLessons(user?.lessons)
        } else if (e.target.value === "Mind & body") {
            setLessons(lessons.filter(el => el.discipline.includes('Mind & body')))
        } else if (e.target.value === "Aqua") {
            setLessons(lessons.filter(el => el.discipline.includes('Aqua')))
        } else if (e.target.value === "Cycle") {
            setLessons(lessons.filter(el => el.discipline.includes('Cycle')))
        } else if (e.target.value === "Conditioning") {
            setLessons(lessons.filter(el => el.discipline.includes('Conditioning')))
        } else if (e.target.value === "Dance") {
            setLessons(lessons.filter(el => el.discipline.includes('Dance')))
        } else if (e.target.value === "Martial arts") {
            setLessons(lessons.filter(el => el.discipline.includes('Martial arts')))
        } else if (e.target.value === "Other") {
            setLessons(lessons.filter(el => el.discipline.includes('Other')))
        } else if (e.target.value === "Express workout") {
            setLessons(lessons.filter(el => el.discipline.includes('Express workout')))
        } else {
            getLessons()
        }
    }

    const nextWeek = () => {
        setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 7))
        drawColumns(currentDay)
        setBool(true)
    }

    const prevWeek = () => {
        setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 7))
        drawColumns(currentDay)
        if (today.getDate() === currentDay.getDate()) {
            setBool(!bool)
        }
    }

    const setToday = () => {
        setCurrentDay(today)
        setBool(false)
    }

    const hideModal = () => {
        setModalShow(!modalShow)
    }

    const showModal = async (data) => {

        try {
            const lessonResult = await lessonInfo(data.id)
            setLessonData(lessonResult[1])
            setReservationdata(lessonResult[0])
            setModalShow(!modalShow)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {modalShow && <Modal onClick={hideModal} data={lessonData} reservations={reservationData} hideCancel />}
            <section className="container-fluid margin-top Calendar">
                <Banner title="My Calendar" subtitle={user.name} />
                <div className="row calendar-select">
                    <div className="col-12">
                        <SelectWithLabel options={["My lessons", "All lessons", "Aqua", "Conditioning", "Cycle", "Dance", "Express workout", "Martial arts", "Mind & body", "Other"]} 
                        onChange={changeLessonsView} />
                    </div>
                </div>
                <div className="row week-select">
                    <div className="col-12 btns-row">
                        <span className="today" onClick={setToday}>TODAY</span>
                        <span className={bool ? 'prev' : 'prev disabled'} onClick={prevWeek}></span>
                        <span className="next" onClick={nextWeek}></span>
                    </div>
                </div>
                <div className="row dates-row p-0">
                    {drawColumns(currentDay)}
                    <hr />
                </div>
            </section>
        </>
    )
}