import './ContentWithLessons.css'
import React, {useState} from 'react'
import CalendarItem from '../CalendarItem/CalendarItem'
import {Link} from 'react-router-dom'

export default function ContentWithLessons({title, data, onClick}) {

    const [bool, setSBool] = useState(false)

    const showAll = () => {
        setSBool(!bool)
    }

    return (
        <div className="container">
            <div className="row p-0 row-block">
                <div className="col-12 col-sm-4">
                    <h1 className="__title">{title}</h1>
                    {data.length > 4 &&
                        <p className="show-all" onClick={showAll}>{!bool ? 'See' : 'Hide'} all</p>}
                </div>
                <div className="col-12 col-sm-8">

                    {!bool ?
                        <div className="row p-0">
                            {data.length > 0 ? data.slice(0, 4).map(gym =>
                                <CalendarItem
                                    data={gym}
                                    capacity={gym.capacity}
                                    onClick={onClick} />
                            ) : <h2>No lessons has been added yet <strong>keep calm and <Link className="inner-link" to="lessons">add your owns!</Link></strong></h2>}
                        </div> : <div className="row p-0">
                            {data.map(gym =>
                                <CalendarItem
                                    data={gym}
                                    capacity={gym.capacity}
                                    onClick={onClick}
                                    borderBottom={bool} />
                            )}
                        </div>}
                </div>
            </div>
        </div>
    )
}
