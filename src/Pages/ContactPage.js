import React, { useState } from 'react'
import Carousel from './HomeComps/Carousel.js'
import ContactUs from './HomeComps/ContactUs.js'
import Goback from './HomeComps/Goback.js'

const ContactPage = () => {
  return (
    <main>
      {/* <Carousel /> */}
      <img
        className="contact-banner-img"
        title=""
        src="../assets/BANNER SIZES/Contact Banner_1900x723.png"
        alt=""
      />
      <ContactUs />
      <Goback />
    </main>
  )
}
export default ContactPage
