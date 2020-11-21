import './ModalDonate.css'
import React, {useState, useEffect} from 'react'
import {getOngs} from '../../services/ApiClient'
import DonateCard from '../DonateCard/DonateCard'

export default function ModalDonate({onClick, lessonId}) {

    const [ongs, setOngs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOngs()
            setOngs(result)
        }
        fetchData()
    }, [])

    return (
        <div className="modal ModalDonate">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-12 modal-body donate">
                        <span className="close" onClick={onClick}></span>
                        <span className="banner"></span>
                        <div className="row justify-content-center">
                            <div className="col-12 col-sm-7">
                                <h1 className="big big-yellow">Help us</h1>
                                <p>At VICTS we like to help with various causes or pymes. 10 points will be added to the option you choose and when it reaches 1000 points, we will donate € 100.</p>
                                <p><strong>Don´t be lazy is just a click!</strong></p>
                            </div>
                        </div>
                        <hr />
                        <h1 className="big big-gray">ORGs</h1>
                        <div className="row justify-content-center">
                            {ongs.filter(el => el.role === 'ONG').map(el =>
                                <DonateCard data={el} lessonId={lessonId} />
                            )}
                        </div>
                        <hr />
                        <h1 className="big big-gray">Pymes</h1>
                        <div className="row justify-content-center">
                            {ongs.filter(el => el.role === 'Pyme').map(el =>
                                <DonateCard data={el} lessonId={lessonId} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
