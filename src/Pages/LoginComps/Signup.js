import axios from 'axios'
import sha256 from 'crypto-js/sha256'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [address, setAddress] = useState('')
  const history = useHistory()
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [numberError, setNumberError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [passError, setPassError] = useState('')
  const [confError, setConfError] = useState('')
  const [style, setStyle] = useState({ color: 'red', fontSize: '15px' })
  const [message, setMessage] = useState('')
  const toggleForm = () => {
    const container3 = document.querySelector('.container3')
    container3.classList.toggle('active')
  }

  const signup = (e) => {
    e.preventDefault()
    reset()
    let check = validateInput()
    if (check) {
      axios
        .post(
          process.env.REACT_APP_APIURL + 'register',
          encryptJSON({
            email: email,
            password: sha256(password).toString(),
            phoneNumber: phoneNumber,
            address: address,
            name: name,
          })
        )
        .then((response) => {
          let data = decryptJSON(response.data.data)
          if (!data.error) {
            if (data.registered) {
              setStyle({ color: 'green', fontSize: '15px' })
            } else {
              setStyle({ color: 'red', fontSize: '15px' })
            }
          } else {
            setStyle({ color: 'red', fontSize: '15px' })
          }
          setMessage(data.message)
        })
    }
  }
  const reset = () => {
    setNameError('')
    setEmailError('')
    setAddressError('')
    setConfError('')
    setPassError('')
    setNumberError('')
  }

  const validateInput = () => {
    let re = /[A-Z]/
    let re2 = /[a-z]/
    let re3 = /[!@#$%^&*\(\)_+\}\{\":?><|~\.\-]/
    let re4 = /[0-9]/
    let check = true
    if (!name.length > 0) {
      setNameError('Please fill up name field')
      check = false
    }
    if (!email.length > 0) {
      setEmailError('Please fill up email field')
      check = false
    }
    let c = /^\+?\d+$/
    if (!phoneNumber.toString().length > 10) {
      if (!c.test(phoneNumber)) {
        setNumberError('Wrong number')
      }
      check = false
    }
    if (!address.length > 0) {
      setAddressError('Please fill up address field')
    }
    if (!password.length > 0) {
      setPassError('Please fill up password field')
      check = false
    }
    if (!confirmPass > 0) {
      setConfError('Please fill up confirm password field')
      check = false
    }

    if (password.length > 0 && confirmPass.length > 0) {
      if (
        !re.test(password) ||
        !re2.test(password) ||
        !re3.test(password) ||
        !re4.test(password) ||
        password.length < 8
      ) {
        setPassError(
          'Password should contain uppercase, lowercase and special characters and it should be equals or more than 8 characters'
        )
        check = false
      } else {
        if (password !== confirmPass) {
          setPassError("Password and confirm pass didn't match")
          setConfError("Password and confirm pass didn't match")
          check = false
        }
      }
    }
    return check
  }
  return (
    <div className="user signupBx">
      <div className="formBx">
        <div>
          <form
            action=""
            style={{ marginTop: '40px' }}
            onSubmit={(e) => signup(e)}
          >
            <h2>Create an account</h2>
            <label className="controllabel" style={{ color: 'black' }}>
              <span className="required">*</span>Name:
            </label>
            {nameError.length > 0 ? (
              <>
                <br />
                <span style={{ color: 'red', fontSize: '8px' }}>
                  {nameError}
                </span>
              </>
            ) : null}
            <input
              type="text"
              name=""
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required={true}
              style={{ height: '-5px' }}
            />
            <label className="controllabel" style={{ color: 'black' }}>
              <span className="required">*</span>Email:{' '}
            </label>
            {emailError.length > 0 ? (
              <>
                <br />
                <span style={{ color: 'red', fontSize: '8px' }}>
                  {emailError}
                </span>
              </>
            ) : null}
            <input
              type="email"
              name=""
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <label className="controllabel" style={{ color: 'black' }}>
              <span className="required">*</span>Address:{' '}
            </label>
            {addressError.length > 0 ? (
              <>
                <br />
                <span style={{ color: 'red', fontSize: '8px' }}>
                  {addressError}
                </span>
              </>
            ) : null}
            <input
              type="text"
              name=""
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="controllabel" style={{ color: 'black' }}>
              <span className="required">*</span>Phone Number:{' '}
            </label>
            {numberError.length > 0 ? (
              <>
                <br />
                <span style={{ color: 'red', fontSize: '8px' }}>
                  {numberError}
                </span>
              </>
            ) : null}
            <input
              type="number"
              name=""
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value.toString())}
              required={true}
            />
            <label className="controllabel" style={{ color: 'black' }}>
              <span className="required">*</span>Password:{' '}
            </label>
            {passError.length > 0 ? (
              <>
                <br />
                <span style={{ color: 'red', fontSize: '8px' }}>
                  {passError}
                </span>
              </>
            ) : null}
            <input
              type="password"
              name=""
              placeholder="Create Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="controllabel" style={{ color: 'black' }}>
              <span className="required">*</span>Confirm Password:{' '}
            </label>
            {confError.length > 0 ? (
              <>
                <br />
                <span style={{ color: 'red', fontSize: '8px' }}>
                  {confError}
                </span>
              </>
            ) : null}
            <input
              type="password"
              name=""
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <span id="errororsuccess2" style={style}>
              {message}
            </span>
            <br />
            <input type="submit" name="" value="SIGN UP" />
            <p className="signup" style={{ Top: '30px', fontWeight: 'bold' }}>
              Already have an account ?
              <a
                href={void 0}
                onClick={toggleForm}
                style={{ fontSize: '15px', textDecorationLine: 'underline' }}
              >
                {' '}
                Log in.
              </a>
            </p>
          </form>
        </div>
      </div>
      <div className="imgBx">
        <img src="./assets/2 Login SignUp Image.png" alt="" />
      </div>
    </div>
  )
}
export default Signup
