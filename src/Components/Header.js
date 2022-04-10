import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../CSS/Header.css'
import { decryptJSON, encryptJSON } from '../Pages/EncryptionDecryption.js'
import axios from 'axios'
import Notification from './Notification'
import ProfileBtn from './ProfileBtn'
import Chat from './Chat.js'
import { useLocation } from 'react-router-dom'

const Header = (props) => {
  const location = useLocation()
  const [name, setName] = useState(null)
  const history = useHistory()
  React.useEffect(async () => {
    if (
      localStorage.getItem('id') !== null &&
      localStorage.getItem('id').length > 0
    ) {
      await axios
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
            setName(response.data)
          } else {
            setName({ name: '' })
          }
        })
        .catch(() => {
          setName(false)
        })
    } else {
      setName({ name: '' })
    }
  }, [localStorage.getItem('id')])

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark"
      aria-label="Third navbar example"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="../assets/eatsonlinelogo.png"
            width={'50px'}
            height={'50px'}
          />
          &nbsp;Eats Online
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                to={location.pathname === '/' ? null : '/'}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
          </ul>
          {name === null ? null : name.name.length > 0 ? (
            <li className="navbar-item">
              <Notification
                loggedin={name === null ? false : name.name.length > 0}
              />
            </li>
          ) : null}
          <li className="navbar-item">
            {name === null ? null : name.name.length > 0 ? (
              <ProfileBtn data={name} />
            ) : (
              <button className="btn-login">
                <a
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    history.push('/login')
                  }}
                >
                  LogIn or Sign Up
                </a>
              </button>
            )}
          </li>
        </div>
        {name === null ? null : name.name.length > 0 ? <Chat /> : null}
      </div>
    </nav>
  )
}

export default Header
