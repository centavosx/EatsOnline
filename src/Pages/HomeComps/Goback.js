import React, { useState } from 'react'
import '../../CSS/Goback.css'

function Goback() {
  window.onscroll = function () {
    scrollFunction()
  }

  function scrollFunction() {
    const mybutton = document.getElementById('myBtn')
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = 'block'
    } else {
      mybutton.style.display = 'none'
    }
  }

  function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
  return (
    <div>
      <button
        onClick={() => topFunction()}
        id="myBtn"
        title="Go to top"
        style={{ position: 'fixed' }}
      >
        <a href={void 0} id="return-to-top">
          <i className="fa-solid fa-chevron-up"></i>
        </a>
      </button>
    </div>
  )
}
export default Goback
