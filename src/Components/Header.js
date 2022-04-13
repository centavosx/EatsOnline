import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../CSS/Header.css'
import { decryptJSON, encryptJSON } from '../Pages/EncryptionDecryption.js'
import axios from 'axios'
import Notification from './Notification'
import ProfileBtn from './ProfileBtn'
import Chat from './Chat.js'

const Header = (props) => {
  const [name, setName] = useState(null)
  const history = useHistory()
  const [clicked, setClicked] = useState(false)
  React.useEffect(async () => {
    try {
      if (
        localStorage.getItem('id') !== null &&
        localStorage.getItem('id').length > 0
      ) {
        await axios
          .post(
            process.env.REACT_APP_APIURL + 'profileData',
            encryptJSON({
              id: localStorage.getItem('id'),
              data: ['name', 'img'],
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
            setName({ name: '' })
          })
      } else {
        setName({ name: '' })
      }
    } catch {
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
          style={!clicked ? { position: 'relative' } : {}}
          onClick={(e) => {
            e.currentTarget.ariaExpanded === 'true'
              ? setClicked(true)
              : setClicked(false)
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
          </ul>
          {!name || name === null ? null : name.name.length > 0 ? (
            <li className="navbar-item">
              <Notification
                loggedin={name === null ? false : name.name.length > 0}
              />
            </li>
          ) : null}
          <li className="navbar-item">
            {!name || name === null ? null : name.name.length > 0 ? (
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
      </div>
      {!name || name === null ? null : name.name.length > 0 ? <Chat /> : null}
    </nav>
  )
}

export default Header
