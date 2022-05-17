import React, { useState } from 'react'
import Carousel from './HomeComps/Carousel.js'
import ViewOrder from './ProfileComps/ViewOrder.js'
import ProfileInfo from './ProfileComps/ProfileInfo.js'
import Goback from './HomeComps/Goback.js'
const Profile = (props) => {
  const [data, setData] = useState([])
  return data.length > 0 ? (
    <ViewOrder data={data} setData={setData} />
  ) : (
    <main>
      {/* <Carousel /> */}
      <img
        className="profile-banner-img"
        title=""
        src="../assets/BANNER SIZES/Account Banner_1900x723.png"
        alt=""
      />
      <ProfileInfo setData={setData} />
      <Goback />
    </main>
  )
}

export default Profile
