import './ContentWithClassrooms.css'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function ContentWithClassrooms({data, title}) {

    const [bool, setSBool] = useState(false)

    const showAll = () => {
        setSBool(!bool)
    }


    return (
        <div className="container">
            <div className="row p-0 row-block">
                <div className="col-12 col-sm-4">
                    <h1 className="__title">{title}</h1>
                    <p className="show-all" onClick={showAll}>{!bool ? 'See' : 'Hide'} all</p>
                </div>
                <div className="col-12 col-sm-8">
                    {!bool ?
                        <div className="row p-0">
                            {data.slice(0, 4).map(el =>
                                <Link className="col-12 col-sm-3 class-card" to={{
                                    pathname: '/edit-classroom',
                                    state: {
                                        classroom: el
                                    }
                                }}>
                                    <h1>{el.name}</h1>
                                    <span className="capacity">{el.rows.reduce((acc, el) => acc + parseInt(el), 0)} seats</span>
                                </Link>
                            )}
                        </div>
                        :
                        <div className="row p-0">
                            {data.map(el =>
                                <Link className="col-12 col-sm-3 class-card" to={{
                                    pathname: '/edit-classroom',
                                    state: {
                                        classroom: el
                                    }
                                }}>
                                    <h1>{el.name}</h1>
                                    <span className="capacity">{el.rows.reduce((acc, el) => acc + parseInt(el), 0)} seats</span>
                                </Link>)}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
