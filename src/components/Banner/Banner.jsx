import './Banner.css'
import React from 'react'

export default function Banner({name, city}) {
    return (
        <div className="row p-0">
            <div className="col-12 row-banner">
                <h1>{name}
                    <span className="tag">{city}</span>
                </h1>
            </div>
        </div>
    )
}
