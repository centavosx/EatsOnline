import React, { useState } from 'react'
import Carousel from './HomeComps/Carousel.js'
import ContactUs from './HomeComps/ContactUs.js'
import Goback from './HomeComps/Goback.js'

const ContactPage = () => {
  return (
    <main>
      <Carousel />
      <ContactUs />
      <Goback />
    </main>
  )
}
export default ContactPage
