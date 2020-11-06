import './ContactBlock.css'
import React, {useState, useEffect} from 'react'
import Button from '../Button/Button'
import {followInfo} from '../../services/ApiClient'
import {useAuthContext} from '../../contexts/AuthContext'

const ContactBlock = ({contactInfo}) => {

    const {user} = useAuthContext()
    const {login} = useAuthContext()

    const [bool, setBool] = useState(false)

    const follow = () => {
        followInfo(contactInfo.id)
            .then((res) => {
                login(res[0])
                setBool(!bool)
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        if (user.following.includes(contactInfo.id)) {
            setBool(bool => !bool)
        }
    }, [user.following, contactInfo.id])

    return (
        <div className="container gym-info">
            <div className="row">
                <div className="col-4">
                    <span className="address">{contactInfo.address}</span>
                    <span className="contact">
                        <strong>P</strong> {contactInfo.phone}<br />
                        <strong>M</strong> {contactInfo.email}
                    </span>
                    <Button onClick={follow} className={!bool ? 'button __follow-btn' : 'button __yellow-btn'}>{!bool ? 'follow' : 'unfollow'} {contactInfo.name}</Button>
                </div>
            </div>
        </div>
    )
}


export default ContactBlock
