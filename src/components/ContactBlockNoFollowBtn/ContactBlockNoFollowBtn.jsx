import './ContactBlockNoFollowBtn.css'
import React from 'react'

const ContactBlockNoFollowBtn = ({contactInfo}) => {

    console.log(contactInfo)

    return (
        <div className="container gym-info">
            <div className="row">
                <div className="col-4">
                    <span className="address">{contactInfo.user.address}</span>
                    <span className="contact">
                        <strong>P</strong> {contactInfo.user.phone}<br />
                        <strong>M</strong> {contactInfo.user.email}
                    </span>
                </div>
            </div>
        </div>
    )
}


export default ContactBlockNoFollowBtn
