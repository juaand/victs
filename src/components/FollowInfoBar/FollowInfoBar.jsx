import './FollowInfoBar.css'

import React from 'react'

export default function FollowInfoBar({followInfo, onClick}) {
    return (
        <>
            {
                followInfo.followers.length > 0 &&
                <div className={followInfo.following.length > 0 ? 'followers disabled' : 'followers'} onClick={onClick}>
                    {followInfo.followers.length} followers
        </div>
            }
            {
                followInfo.following.length > 0 &&
                <div className={followInfo.following.length > 0 ? 'following disabled' : 'following'} onClick={onClick}>
                    {followInfo.followers.length} following
        </div>
            }
        </>
    )
}
