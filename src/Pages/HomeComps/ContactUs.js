import '../../CSS/ContactUs.css'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'

function ContactUs() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const ref = useRef()
  React.useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const submit = async () => {
    setLoading(true)
    try {
      let x = await axios.post(
        process.env.REACT_APP_APIURL + 'contactus',
        encryptJSON({
          email,
          name,
          subject,
          message,
        })
      )
      let o = decryptJSON(x.data.data)
      if (o.sent) setResponse('Successful')
      else setResponse('Failed')
    } catch {}
    setLoading(false)
  }
  return (
    <section className="profile-section" ref={ref}>
      <h1 className="text-center">CONTACT US</h1>
      <div className="con-container">
        <div className="contact-row">
          <h3 className="con-h3">We would love to hear from you!</h3>
        </div>
        <div className="contact-row input-container">
          <div className="col-xs-12">
            <label className="cu-labels">Name:</label>
            <div className="styled-input wide">
              <input
                className="Con-Name"
                type="text"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="cu-placeholder">Your Name</label>
            </div>
          </div>
          <div className="col-xs-12">
            <label className="cu-labels">Email:</label>
            <div className="styled-input wide">
              <input
                className="Con-Email"
                type="text"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Your Email</label>
            </div>
          </div>
          <div className="col-xs-12">
            <label className="cu-labels">Subject</label>
            <div className="styled-input wide">
              <input
                className="Con-Name"
                type="text"
                required={true}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label>Subject</label>
            </div>
          </div>
          <div className="col-xs-12">
            <label className="cu-labels">Message:</label>
            <div className="styled-input wide">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required={true}
              ></textarea>
              <label>Your Message</label>
            </div>
          </div>
          {response.length > 0 ? (
            <div className="col-xs-12">
              <div className="styled-input wide">
                <h6 style={{ color: 'blue' }}>{response}</h6>
              </div>
            </div>
          ) : null}

          {!loading ? (
            message.length > 0 &&
            email.length > 0 &&
            message.length > 0 &&
            subject.length > 0 ? (
              <div className="col-md-6 col-sm-12">
                <div
                  className="submit btn-lrg submit-btn"
                  style={{ cursor: 'pointer' }}
                  onClick={() => submit()}
                >
                  Submit
                </div>
              </div>
            ) : (
              <div className="col-xs-12">
                <div className="styled-input wide">
                  <h6>Please fill up all blank fields</h6>
                </div>
              </div>
            )
          ) : (
            <div className="col-xs-12">
              <div className="styled-input wide">
                <h6>Loading...</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default ContactUs
