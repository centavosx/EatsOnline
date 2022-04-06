import React, { useState } from 'react'
import '../CSS/Login.css'
import { useHistory, Link } from 'react-router-dom'
import Log from './LoginComps/Log.js'
import Signup from './LoginComps/Signup.js'
const Login = () => {
  React.useEffect(() => {
    localStorage.setItem('page', 'login')
  }, [])

  return (
    // <div >
    //     <div style={{backgroundImage: "url('/assets/img/BACKGROUND IMAGE 2.png')", height: '100%', position: 'absolute', width: '100%'}}></div>

    //     <div style={{backgroundImage: "url('./assets/img/Eats Online logo.png')", width:'20%', height: '20%'}}></div>

    // </div>
    <main>
      <section id="section1">
        <div className="container3">
          <Log />
          <Signup />
        </div>
      </section>
    </main>
  )
}
export default Login
