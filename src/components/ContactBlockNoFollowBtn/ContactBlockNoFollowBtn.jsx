import './ContactBlockNoFollowBtn.css'
import React from 'react'

const ContactBlockNoFollowBtn = ({contactInfo}) => {

    return (
        <div className="container gym-info">
            <div className="row m-0">
                <div className="col-sm-4 col-12">
                    {(contactInfo.role === 'Instructor') &&
                        <h1 className="discipline">{contactInfo.disciplines[0]}</h1>}
                    <span className="address">{contactInfo.user.address ? contactInfo.user.address : 'No address provided'}</span>
                    <span className="contact">
                        <strong>P</strong> {contactInfo.user.phone ? contactInfo.user.phone : 'No phone number provided'}<br />
                        <strong>M</strong> {contactInfo.user.email}
                    </span>
                </div>
                {contactInfo.role === 'Instructor' &&
                    <div className="col-12 col-sm-8 d-flex justify-content-center coach-avatar-row">
                        <div className="coach-avatar" style={{background: `url(${contactInfo.user.avatar ? contactInfo.user.avatar : 'https://res.cloudinary.com/dutvbml2i/image/upload/v1603784830/victs/foto-perfil.jpg'}) no-repeat center center / cover`}}></div>
                    </div>
                }
            </div>
        </div>
    )
}


export default ContactBlockNoFollowBtn
