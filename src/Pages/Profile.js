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
      <Carousel />
      <ProfileInfo setData={setData} />
      <Goback />
    </main>
  )
}

export default Profile
