import './FollowInfoBar.css'

import React from 'react'

export default function FollowInfoBar({followInfo, onClick}) {
    console.log(followInfo)
    return (
        <>
            {
                followInfo.role !== 'Guest' &&
                <div className="followers" onClick={onClick}>
                    {followInfo?.followers?.length} followers
        </div>
            }
        </>
    )
}
