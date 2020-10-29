import './GymSingle.css'
import React, {useState, useEffect} from 'react'
import {getGymDetail} from '../../../services/ApiClient'
import Banner from '../../Banner/Banner'
import Button from '../../Button/Button'

export default function GymSingle(props) {

    const [gymData, setGymdata] = useState([])

    const gym = props.location.state.gym

    const follow = () => {
        console.log('follow')
    }

    useEffect(() => {
        getGymDetail(props.location.state.id)
            .then(gym => {
                setGymdata(gym)
            })
            .catch((e) => console.log(e))
    }, [props.location.state.id])


    return (
        <div className="container-fluid margin-top">
            <Banner name={gym.name} city={gym.city} />
            <div className="container">
                <div className="row">
                    <div className="col-4 gym-info">
                        <span className="address">{gym.address}</span>
                        <span className="contact">
                            <strong>P</strong> {gym.phone}<br />
                            <strong>M</strong> {gym.email}
                        </span>
                        <Button onClick={follow} className="button __follow-btn">follow {gym.name}</Button>
                    </div>
                </div>
            </div>
            {gymData.map(gym =>
                <p>{gym.name}</p>
            )}
        </div>
    )
}
