import './ContentWithInstructors.css'
import React, {useState} from 'react'
import InstructorItem from '../InstructorItem/InstructorItem'
import {Link} from 'react-router-dom'

export default function ContentWithInstructors({data, title}) {

    const byInstructors = data.reduce((acc, e) => {
        acc[e.instructor.user.name] = (acc[e.instructor.user.name] || [])
        acc[e.instructor.user.name].push(e)
        return acc
    }, {})

    const [bool, setSBool] = useState(false)

    const showAll = () => {
        setSBool(!bool)
    }

    return (
        <div className="container">
            <div className="row p-0 row-block">
                <div className="col-12 col-sm-4">
                    <h1 className="__title">{title}</h1>
                    {Object.keys(byInstructors).length &&
                        <p className="show-all" onClick={showAll}>{!bool ? 'See' : 'Hide'} all</p>
                    }
                </div>
                <div className="col-12 col-sm-8">
                    {!bool ?
                        <div className="row p-0">
                            {Object.keys(byInstructors).length ?
                                Object.keys(byInstructors).slice(0, 4).map(key => byInstructors[key][0]).map(el => <InstructorItem instructor={el.instructor} />) : <h2>No coaches yet...<strong>keep calm and <Link className="inner-link" to="lessons">find one</Link></strong></h2>}
                        </div> : <div className="row p-0">
                            {Object.keys(byInstructors).map(key => byInstructors[key][0]).map(el => <InstructorItem instructor={el.instructor} />)}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
