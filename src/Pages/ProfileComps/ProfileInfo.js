import axios from 'axios'
import React, { useState, useRef } from 'react'
import Address from './Address'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
import '../../CSS/Profileinfo.css'
import Transactions from './Transactions'
import sha256 from 'crypto-js/sha256'
function ProfileInfo(props) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirm] = useState('')
  const [image, setImage] = useState(null)
  const [imgurl, setImgurl] = useState(null)
  const [loading, setLoading] = useState(false)
  const ref = useRef()
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    addresses: [],
    password: '',
    guest: false,
    img: './assets/eatsonlinelogo.png',
  })

  const [show, setShow] = useState([true, false, false, false])

  React.useEffect(async () => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
    const response = await axios.get(
      process.env.REACT_APP_APIURL +
        `profileData?data=${JSON.stringify(
          encryptJSON({
            id: localStorage.getItem('id'),
            data: [
              'name',
              'address',
              'email',
              'phoneNumber',
              'addresses',
              'guest',
              'img',
            ],
          })
        )}`
    )
    response.data = decryptJSON(response.data.data)
    if (response.data.addresses == null) {
      response.data.addresses = []
    }
    response.data.password = ''
    if (!response.data.img) {
      response.data.img = './assets/eatsonlinelogo.png'
    }
    setProfileData(response.data)
    const script = document.createElement('script')
    script.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const validatePass = () => {
    let re = /[A-Z]/
    let re2 = /[a-z]/
    let re3 = /[!@#$%^&*\(\)_+\}\{\":?><|~\.\-]/
    let re4 = /[0-9]/
    return !(
      !re.test(password) ||
      !re2.test(password) ||
      !re3.test(password) ||
      !re4.test(password) ||
      password.length < 8
    )
  }

  const checkP = () => {
    return password.length > 0 && validatePass()
      ? password === confirmPassword
      : false
  }

  const checkName = () => {
    return password.length > 0 && name.length > 0
      ? checkP() && !(name === profileData.name)
      : name.length > 0 && phoneNumber.length > 0
      ? checkNumber()
        ? !(name === profileData.name)
        : false
      : name.length > 0
      ? !(name === profileData.name)
      : false
  }

  const checkNumber = () => {
    let c = /^\+?\d+$/
    return password.length > 0 && phoneNumber.length > 0
      ? checkP() && !(phoneNumber === profileData.phoneNumber)
      : phoneNumber.length > 10
      ? c.test(phoneNumber) && !(phoneNumber === profileData.phoneNumber)
      : false
  }

  const updateData = () => {
    let updateData = {}
    if (name.length > 0 && name !== profileData.name) updateData.name = name
    if (password.length > 0) updateData.password = sha256(password).toString()
    if (phoneNumber.length > 0 && phoneNumber !== profileData.phoneNumber)
      updateData.phoneNumber = phoneNumber
    axios
      .patch(
        process.env.REACT_APP_APIURL + 'profileData',
        encryptJSON({
          id: localStorage.getItem('id'),
          updateData: updateData,
        })
      )
      .then(() => {
        window.location.reload(false)
      })
  }

  const filechange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.onload = function (e) {
        setImgurl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const uploadPIC = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData()
      form.append('image', image)
      form.append(
        'data',
        encryptJSON({
          imagename: image.name,
          id: localStorage.getItem('id'),
        }).data
      )
      await axios.post(
        process.env.REACT_APP_APIURL + 'uploadprofileimage',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div ref={ref}>
      {/* // <!-- Demo header--> */}
      <section className="profile-section">
        <h1 className="text-center">MY ACCOUNT</h1>
        <div className="container3 py-4">
          <div className="row">
            <div className="col-md-3">
              {/* <!-- Tabs nav --> */}
              <div
                className="nav flex-column nav-pills nav-pills-custom"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className={
                    show[0]
                      ? 'nav-link mb-3 p-3 shadow active'
                      : 'nav-link mb-3 p-3 shadow'
                  }
                  id="v-pills-home-tab"
                  style={!show[0] ? { cursor: 'pointer' } : {}}
                  data-toggle="pill"
                  onClick={() => setShow([true, false, false, false])}
                >
                  <span className="font-weight-bold small text-uppercase">
                    Personal information
                  </span>
                </a>
                <a
                  className={
                    show[1]
                      ? 'nav-link mb-3 p-3 shadow active'
                      : 'nav-link mb-3 p-3 shadow'
                  }
                  id="v-pills-profile-tab"
                  style={!show[1] ? { cursor: 'pointer' } : {}}
                  data-toggle="pill"
                  onClick={() => setShow([false, true, false, false])}
                >
                  <span className="font-weight-bold small text-uppercase">
                    Purchase History
                  </span>
                </a>
                <a
                  className={
                    show[2]
                      ? 'nav-link mb-3 p-3 shadow active'
                      : 'nav-link mb-3 p-3 shadow'
                  }
                  id="v-pills-messages-tab"
                  style={!show[2] ? { cursor: 'pointer' } : {}}
                  data-toggle="pill"
                  onClick={() => setShow([false, false, true, false])}
                >
                  <span className="font-weight-bold small text-uppercase">
                    Advance Order
                  </span>
                </a>
              </div>
            </div>

            <div className="col-md-9">
              {/* <!-- Tabs content --> */}
              <div className="tab-content" id="v-pills-tabContent">
                {show[0] ? (
                  <div
                    className="tab-pane fade shadow bg-white show active p-3"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="display-flex">
                      <div className="display-left">
                        <div className="p-title">
                          <h5>PROFILE INFORMATION</h5>
                        </div>
                        <div className="center-div">
                          <div className="user-profile">
                            <img
                              src={imgurl !== null ? imgurl : profileData.img}
                              alt="Profile Image"
                              style={{
                                width: '100%',
                                borderRadius: '50px',
                                marginBottom: '10px',
                              }}
                            />
                          </div>
                          <div className="display-flex">
                            <div className="display-left-btn">
                              <input
                                type="file"
                                className="form-control"
                                style={{ width: '80%', height: '35px' }}
                                onChange={(e) => filechange(e)}
                                accept="image/*"
                              />
                            </div>

                            <div className="display-right-btn">
                              {!loading ? (
                                <button
                                  className="img-save"
                                  onClick={(e) => uploadPIC(e)}
                                >
                                  Save
                                </button>
                              ) : (
                                <p>Uploading...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="display-right">
                        <div className="mt-2">
                          <br />
                          <label className="labels">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={profileData.name}
                            value={name}
                            style={{ width: '100%' }}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label className="labels">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: '100%' }}
                            placeholder={profileData.email}
                          />
                          <label className="labels">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={profileData.phoneNumber}
                            value={phoneNumber}
                            style={{ width: '100%' }}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />

                          {!profileData.guest ? (
                            <>
                              <h4>
                                {' '}
                                &nbsp; &nbsp;
                                <br />
                                Change pass
                              </h4>
                              <label className="labels">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder={profileData.password}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              {password.length > 0 ? (
                                <>
                                  <label className="labels">
                                    Confirm Password
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder={profileData.confirmPassword}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirm(e.target.value)}
                                  />
                                </>
                              ) : null}
                            </>
                          ) : null}
                          <Address
                            setProfileData={(val) => setProfileData(val)}
                            addresses={profileData.addresses}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="display-flex">
                        <div className="display-left-div"></div>
                        <div className="display-right-div"></div>
                      </div>
                      <div id="col">
                        {checkP() || checkName() || checkNumber() ? (
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => updateData()}
                          >
                            Save
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* <!-- Purchase History --> */}
                {show[1] ? (
                  <Transactions transaction={true} setData={props.setData} />
                ) : null}

                {/* <!-- Advance Order --> */}
                {show[2] ? (
                  <Transactions transaction={false} setData={props.setData} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileInfo
