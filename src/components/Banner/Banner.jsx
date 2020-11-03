import './Banner.css'
import React from 'react'

export default function Banner({title, subtitle}) {
    return (
        <div className="row p-0">
            <div className="col-12 row-banner">
                <h1>{title}
                    <span className="tag">{subtitle}</span>
                </h1>
            </div>
        </div>
    )
}
