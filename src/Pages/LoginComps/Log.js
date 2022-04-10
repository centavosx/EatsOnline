import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import sha256 from 'crypto-js/sha256'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
const Log = () => {
  const [idn, setId] = useState('')
  const [verify, setVerification] = useState(false)
  const [name, setName] = useState(null)
  const [email1, setEmail1] = useState(null)
  const [password1, setPassword1] = useState(null)
  const [code, setCode] = useState(null)
  const [forget, setForget] = useState(false)
  const history = useHistory()
  const [login, setLogin] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState({ color: 'red' })
  const toggleForm = () => {
    const container3 = document.querySelector('.container3')
    container3.classList.toggle('active')
  }

  const reverify = () => {
    axios
      .patch(
        process.env.REACT_APP_APIURL + 'reverify',
        encryptJSON({
          id: idn,
          name: name,
          email: email1,
        })
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)
        if (!response.data.error) {
          if (response.data.sent) {
            console.log(color)
            setColor({ color: 'green' })
          } else {
            setColor({ color: 'red' })
          }
        } else {
          setColor({ color: 'red' })
        }

        setMessage(response.data.message)
      })
  }
  const verifyAccount = (e) => {
    e.preventDefault()
    axios
      .patch(
        process.env.REACT_APP_APIURL + 'verify',
        encryptJSON({
          id: idn,
          code: code,
        })
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)
        if (!response.data.error) {
          if (response.data.verified) {
            localStorage.setItem('id', idn)
            window.location.reload(false)
          } else {
            setColor({ color: 'red' })
          }
        } else {
          setColor({ color: 'red' })
        }
        setMessage(response.data.message)
      })
  }

  const guest = (e) => {
    e.preventDefault()

    axios.post(process.env.REACT_APP_APIURL + 'guest').then((response) => {
      response.data = decryptJSON(response.data.data)
      console.log('guest')
      console.log(response.data)
      if (!response.data.error) {
        if (response.data.registered) {
          localStorage.setItem('id', response.data.id)
          window.location.reload(false)
        }
      }
    })
  }

  const loginAccount = (e) => {
    e.preventDefault()
    axios
      .post(
        process.env.REACT_APP_APIURL + 'login',
        encryptJSON({
          email: email1,
          password: sha256(password1).toString(),
        })
      )
      .then((resp) => {
        let data = decryptJSON(resp.data.data)

        if (!data.error) {
          if ('id' in data) {
            if (data.login) {
              localStorage.setItem('id', data.id)
              history.push('/')
              window.location.reload(false)
            } else {
              setName(data.name)
              setId(data.id)
              setError(data.message)
              setVerification(true)
            }
          } else {
            setError(data.message)
          }
        } else {
          setError(data.message)
        }
      })
  }

  return (
    <div className="user signinBx">
      <div className="imgBx">
        <img src="./assets/2 Login SignUp Image.png" alt="" />
      </div>
      <div className="formBx">
        <div>
          {!login ? (
            <form style={{ display: 'grid' }}>
              {/* <div className="row"> */}

              <input
                type="submit"
                name=""
                value="LOGIN / SIGN UP"
                onClick={() => setLogin(true)}
                style={{
                  maxWidth: '500px',
                  width: '230px',
                  height: '50px',
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  textDecoration: 'inherit',
                }}
              />
              {/* </div> */}
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                OR
              </h1>
              {/* <div className="col-lg-6 col-md-6 col-xs-12 col-sm-6"> */}
              <div>
                <input
                  type="submit"
                  onClick={(e) => guest(e)}
                  name=""
                  value="LOGIN as GUEST"
                  style={{
                    maxWidth: '500px',
                    width: '230px',
                    height: '50px',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    textDecoration: 'inherit',
                  }}
                />
              </div>
              {/* </div> */}
              <div>
                <input
                  type="submit"
                  id="homeLog"
                  onClick={() => {
                    history.push('/')
                  }}
                  className="homehome"
                  value="HOME"
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    textDecoration: 'inherit',
                    width: '120px',
                    top: '100px',
                    left: '45px',
                    border: '2px solid #0d6efd',
                    marginBottom: '100px',
                  }}
                />
              </div>
            </form>
          ) : (
            <form actionName="" onSubmit={(e) => loginAccount(e)}>
              <input
                type="submit"
                name=""
                value="BACK"
                onClick={(e) => {
                  e.preventDefault()
                  setLogin(false)
                }}
              />
              <h2>LOGIN</h2>
              <label className="controllabel" style={{ color: 'black' }}>
                <span className="required">*</span>Email:{' '}
              </label>
              <input
                type="email"
                name=""
                placeholder="Email Address"
                onChange={(e) => setEmail1(e.target.value)}
                required={true}
              />
              <label className="controllabel" style={{ color: 'black' }}>
                <span className="required">*</span>Password:{' '}
              </label>
              <input
                type="password"
                name=""
                placeholder="Password"
                onChange={(e) => setPassword1(e.target.value)}
                required={true}
              />
              <span id="errororsuccess" style={{ color: 'red' }}>
                {error}
              </span>
              <br />
              <input
                type="submit"
                name=""
                value="LOGIN"
                onClick={(e) => setForget(false)}
              />
              <p className="signup" style={{ fontWeight: 'bold' }}>
                Don't have an account ?
                <a
                  href={void 0}
                  onClick={toggleForm}
                  style={{ fontSize: '15px', textDecorationLine: 'underline' }}
                >
                  {' '}
                  Sign Up.
                </a>
              </p>
              <h5>
                <Link
                  onClick={(e) => {
                    forget ? setForget(false) : setForget(true)
                    setVerification(false)
                  }}
                  style={{ color: '#97191d', fontSize: '15px' }}
                >
                  Forget your password?
                </Link>
              </h5>

              {/*dito*/}
            </form>
          )}

          {verify && login ? (
            <div>
              <form onSubmit={(e) => verifyAccount(e)}>
                <input
                  type="text"
                  style={{ color: 'black' }}
                  name="code"
                  placeholder="Verification Code"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <p style={color}>{message}</p>
                <a
                  style={{
                    cursor: 'pointer',
                    color: 'blue',
                    textDecoration: 'underline',
                  }}
                  onClick={() => reverify()}
                >
                  Resend verification code
                </a>
                <br />

                <input type="submit" value="VERIFY" />
              </form>
            </div>
          ) : null}
          {forget && login ? (
            <form>
              <h2>Password Reset</h2>
              <input
                className="input-form"
                type="email"
                name="email1"
                placeholder="Enter your email to send reset link."
                style={{ color: 'black' }}
                required={true}
              />
              <p></p>
              <input type="submit" value="SEND" />
            </form>
          ) : null}
          {/* <form>      
                            <input type="submit" name="" value="&#xf015; Home" onClick={goHome} style={{top: '110px', left: '250px', fontFamily: 'FontAwesome',fontWeight: 'normal',fontSize: '17px', fontstyle: 'normal', textDecoration: 'inherit'}}/></form> */}
        </div>
      </div>
    </div>
  )
}
export default Log
