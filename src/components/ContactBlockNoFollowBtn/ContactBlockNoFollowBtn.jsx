import './ContactBlockNoFollowBtn.css'
import React, {useState} from 'react'
import {getFollowersUsers} from '../../services/ApiClient'

const ContactBlockNoFollowBtn = ({contactInfo}) => {

    const followersArr = contactInfo.user.followers

    const [bool, setBool] = useState(false)
    const [followersList, setFollowersList] = useState([])

    const showFollowers = async () => {
        setBool(!bool)
        const res = await getFollowersUsers(followersArr)
        setFollowersList(res)
        console.log(res)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    return (
        <>
            {bool &&
                <section className="followers-modal">
                <span className="close" onClick={hideModal}>close</span>
                {followersList.map(el => <p>{el.name}</p>)}
                </section>
            }
            <div className="container gym-info">
                <div className="row">
                    <div className="col-4">
                        <span className="address">{contactInfo.user.address}</span>
                        <span className="contact">
                            <strong>P</strong> {contactInfo.user.phone}<br />
                            <strong>M</strong> {contactInfo.user.email}
                            <div className="followers" onClick={showFollowers}>
                                <strong>F</strong> {contactInfo.user.followers.length} followers
                        </div>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ContactBlockNoFollowBtn
