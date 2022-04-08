import React, { useState } from 'react'
import Carousel from './HomeComps/Carousel.js'
import Products from './HomeComps/Products.js'
import AboutUs from './HomeComps/AboutUs.js'
import Goback from './HomeComps/Goback.js'
import axios from 'axios'
// import ContactUs from './HomeComps/ContactUs.js';

const Home = (props) => {
  React.useEffect(() => {
    props.setPage('/')
  })
  return (
    <main>
      <Carousel />
      <Products
        max={10}
        featured={true}
        sortwhat={'totalsold'}
        value={[]}
        search={[]}
      />
      <AboutUs />
      {/*\\<ContactUs/> */}
      <Goback />
    </main>
  )
}

export default Home
