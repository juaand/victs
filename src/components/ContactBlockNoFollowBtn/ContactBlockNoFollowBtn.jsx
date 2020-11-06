import './ContactBlockNoFollowBtn.css'
import React from 'react'

const ContactBlockNoFollowBtn = ({contactInfo}) => {

    return (
        <div className="container gym-info">
            <div className="row">
                <div className="col-sm-4 col-12">
                    <span className="address">{contactInfo.user.address}</span>
                    <span className="contact">
                        <strong>P</strong> {contactInfo.user.phone}<br />
                        <strong>M</strong> {contactInfo.user.email}
                    </span>
                </div>
                {contactInfo.role === 'Instructor' && 
                <div className="col-12 col-sm-8 d-flex justify-content-center coach-avatar-row">
                    <div className="coach-avatar" style={{background: `url(${contactInfo.user.avatar}) no-repeat center center / cover`}}></div>
                </div>
                }
            </div>
        </div>
    )
}


export default ContactBlockNoFollowBtn
