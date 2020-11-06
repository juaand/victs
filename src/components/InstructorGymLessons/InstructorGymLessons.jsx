import './InstructorGymLessons.css'
import React, {useState} from 'react'

export default function InstructorGymLessons({title, data}) {

    console.log(data.filter(el => el.gym))

    const [bool, setBool] = useState(false)

    const showAll = () => {
        setBool(!bool)
    }

    const formatDate = (date) => {
        const format = (s) => (s < 10 ? '0' + s : s)
        var d = new Date(date)
        return [format(d.getDate()), format(d.getMonth() + 1), d.getFullYear()].join(
            '/'
        )
    }

    return (
        <>
            <div className="container">
                <div className="row p-0 row-block">
                    <div className="col-12 col-sm-4">
                        <h1 className="__title">{title}</h1>
                        <p className="show-all" onClick={showAll}>{!bool ? 'See' : 'Hide'} all</p>
                    </div>
                    <div className="col-12 col-sm-8">

                        {!bool ?
                            <div className="row p-0">
                                {data.filter(el => el.gym).slice(0, 4).map(lesson =>
                                    <div className="false-link calendar-item col-3">
                                        <span className="cal-item __date">{formatDate(lesson.date)}</span>
                                        <span className="cal-item __hour">{new Date(lesson.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                                        <span className="cal-item __discipline">{lesson.name}</span>
                                        <small><strong>gym</strong> {lesson.gym?.user?.name}</small>
                                        <small><strong>capacity</strong>{lesson.classroom?.rows?.reduce((acc, el) => acc + parseInt(el), 0)}</small>
                                    </div>
                                )}
                            </div> : <div className="row p-0">
                                {data.filter(el => el.gym).map(lesson =>
                                    <div className="false-link calendar-item col-3 border-bottom">
                                        <span className="cal-item __date">{formatDate(lesson.date)}</span>
                                        <span className="cal-item __hour">{new Date(lesson.date).toLocaleTimeString().replace(/:\d+ /, ' ')}</span>
                                        <span className="cal-item __discipline">{lesson.name}</span>
                                        <small><strong>gym</strong> {lesson.gym?.user?.name}</small>
                                        <small><strong>capacity</strong>{lesson.classroom?.rows?.reduce((acc, el) => acc + parseInt(el), 0)}</small>
                                    </div>
                                )}
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
