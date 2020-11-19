import './AttendedLessons.css'
import React, {useState} from 'react'
import CalendarItem from '../../CalendarItem/CalendarItem'
import ModalDonate from '../../ModalDonate/ModalDonate'

const AttendedLessons = ({title, message, strong, data}) => {

    const today = new Date()
    const attendedArr = data?.lessons?.filter(el => new Date(el.date).getDate() < today.getDate() && new Date(el.date).getMonth() === today.getMonth() && new Date(el.date).getFullYear() === today.getFullYear())

    const [bool, setBool] = useState(false)

    const showModal = () => {
        setBool(!bool)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    return (
        <>
            {bool && <ModalDonate onClick={hideModal} />}
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
                                {attendedArr && attendedArr.map(el => <CalendarItem data={el} oldLessons={true} onClick={showModal} />)}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default AttendedLessons
