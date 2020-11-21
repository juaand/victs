import './DonateCard.css'
import React, {useState} from 'react'
import Button from '../Button/Button'
import {earnedPoints} from '../../services/ApiClient'
import {useAuthContext} from '../../contexts/AuthContext'


export default function DonateCard({data, lessonId}) {

    const {login} = useAuthContext()
    const [socialData, setSocialData] = useState(data)

    const addPoints = async (e) => {
        e.target.classList.add('thanks')
        e.target.innerText = 'Thanks!!'

        const result = await earnedPoints(socialData.id, lessonId)
        login(result[1])
        setSocialData(result[0])
        document.querySelectorAll('.add-points').forEach(el => el.classList.add('disabled'))
    }

    return (
        <div className="col-12 col-sm-4 DonateCard">
            <div className="card col-12">
                <div className="hero" style={{background: `url(${socialData.avatar}) no-repeat center center / cover`}} >
                    <a href={socialData.url} target="_new" className="card-title">{socialData.name}</a>
                </div>
                <div className="card-body">
                    <p className="card-text">{socialData.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item points-bar">
                        <Button className="button __yellow-btn add-points" onClick={addPoints}>+ 10</Button>
                        <span className="fill-bar" style={{width: `${socialData.points / 10}%`}}></span>points <strong>{socialData.points}</strong></li>
                </ul>
            </div>
        </div>
    )
}
