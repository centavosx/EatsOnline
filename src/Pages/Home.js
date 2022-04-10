import React, { useState } from 'react'
import Carousel from './HomeComps/Carousel.js'
import Products from './HomeComps/Products.js'
import AboutUs from './HomeComps/AboutUs.js'
import Goback from './HomeComps/Goback.js'
import axios from 'axios'
// import ContactUs from './HomeComps/ContactUs.js';
import { encryptJSON, decryptJSON } from './EncryptionDecryption.js'
const Home = (props) => {
  const [login, setLoggedin] = useState(false)
  React.useEffect(() => {
    props.setPage('/')
  }, [])
  React.useEffect(() => {
    console.log('e')
    try {
      if (
        localStorage.getItem('id') !== null &&
        localStorage.getItem('id').length > 0
      ) {
        axios
          .post(
            process.env.REACT_APP_APIURL + 'profileData',
            encryptJSON({
              id: localStorage.getItem('id'),
              data: ['name', 'link'],
            })
          )
          .then((response) => {
            response.data = decryptJSON(response.data.data)
            if (!response.data.error) {
              setLoggedin(response.data.name.length > 0)
            } else {
              setLoggedin(false)
            }
          })
          .catch(() => {
            setLoggedin(false)
          })
      } else {
        setLoggedin(false)
      }
    } catch (e) {
      console.log(e)
      setLoggedin(false)
    }
  }, [localStorage.getItem('id')])
  return (
    <main>
      <Carousel />
      <Products
        max={10}
        featured={true}
        sortwhat={'totalsold'}
        value={[]}
        search={[]}
        login={login}
      />
      <AboutUs />
      {/*\\<ContactUs/> */}
      <Goback />
    </main>
  )
}

export default Home
