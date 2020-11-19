import './ModalDonate.css'
import React, {useState, useEffect} from 'react'
import {getOngs} from '../../services/ApiClient'
import {Link} from 'react-router-dom'

export default function ModalDonate({onClick}) {

    const [ongs, setOngs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOngs()
            setOngs(result)
            console.log(result)
        }
        fetchData()
    }, [])

    return (
        <div className="modal ModalDonate">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-8 col-12 modal-body donate">
                        <span className="close" onClick={onClick}></span>
                        <span className="banner"></span>
                        <h1 className="big big-yellow">Help us</h1>
                        <p>At VICTS we like to help with various causes or pymes. 10 points will be added to the option you choose and when it reaches 10,000 points, we will donate the amount of € 100.</p>
                        <p><strong>Don´t be lazy is just a click!</strong></p>
                        <hr />
                        <h1 className="big big-purple">ORGs</h1>
                        <div className="row justify-content-center">
                            {ongs.filter(el => el.role === 'ONG').map(el =>
                                <div className="col-12 col-sm-6">
                                    <span className="avatar" style={{background: `url(${el.avatar}) no-repeat center center / contain`}}></span>
                                    <span className="name">{el.name}</span>
                                    <span className="description">{el.description}</span>
                                    <span className="points">{el.points}</span>
                                    <Link to={el.url} className="url">Website</Link>
                                </div>
                            )}
                        </div>
                        <hr />
                        <h1 className="big big-purple">Pymes</h1>
                        <div className="row justify-content-center">
                            {ongs.filter(el => el.role === 'Pyme').map(el =>
                                <div className="col-12 col-sm-6">
                                    <span className="avatar" style={{background: `url(${el.avatar}) no-repeat center center / contain`}}></span>
                                    <span className="name">{el.name}</span>
                                    <span className="description">{el.description}</span>
                                    <span className="points">{el.points}</span>
                                    <Link to={el.url} className="url">Website</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
