import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Link } from 'react-router-dom'
import '../CSS/ProfileBtn.css'
const ProfileBtn = (props) => {
  const history = useHistory()
  const logout = () => {
    localStorage.removeItem('id')
    window.location.replace('/')
  }
  // $(".profile .icon_wrap").click(function(){
  //     $(this).parent().toggleClass("active");
  //     $(".notifications").removeClass("active");
  //   });
  const [showProfile, setShow] = useState(false)
  return (
    <div className="profilecontainer">
      <div
        className="icon_prof"
        onClick={() => (showProfile ? setShow(false) : setShow(true))}
      >
        <img
          className="prof_pic"
          src={!props.data.img ? './assets/eatsonlinelogo.png' : props.data.img}
          alt="profile_pic"
        />
        <span className="name">
          {props.data.name.substring(0, 13)}
          {props.data.name.length > 15 ? '...' : null}
        </span>
        <i className="fas fa-chevron-down"></i>
      </div>
      {/* Dropdown for User menu */}
      {showProfile ? (
        <div className="profile_dd">
          <ul className="profile_ul">
            <li className="profile_li">
              <a className="profile" href={void 0}>
                <span className="picon">
                  <i className="fas fa-user-alt" aria-hidden="true"></i>
                </span>
                {props.data.name.substring(0, 13)}
                {props.data.name.length > 15 ? '...' : null}
              </a>
              <Link
                className="prof_btn"
                to="/profile"
                style={{ cursor: 'pointer' }}
              >
                My Account
              </Link>
            </li>
            <li className="cart">
              <Link className="pb-profile" to="/cartlist">
                <span className="picon">
                  <i class="fa-solid fa-cart-shopping"></i>
                </span>
                My Cart
              </Link>
            </li>
            <li className="logout">
              <a
                className="profile"
                onClick={() => logout()}
                style={{ cursor: 'pointer' }}
              >
                <span className="picon">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}
export default ProfileBtn
