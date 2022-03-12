import React, { useState } from 'react'

import ProfileInfo from './ProfileComps/ProfileInfo.js';
import Goback from './HomeComps/Goback.js';
const Profile = (props) => {
    React.useEffect(()=>{
        localStorage.setItem("page", "profile");
    }, [])
    
    return (
        <main>
            {/* <Header/> */}
            <ProfileInfo />
            <Goback/>
        </main>
    )
}

export default Profile;