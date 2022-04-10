import axios from 'axios'
import React, { useState } from 'react'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
import socket from '../../socket'
const Reviews = (props) => {
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('')
  const [rate, setRate] = useState(0)
  const [submitted, setSubmitted] = useState({ success: false, message: '' })
  React.useEffect(() => {
    console.log(props)
    if (props.id.length > 0) {
      axios
        .post(
          process.env.REACT_APP_APIURL + 'comment',
          encryptJSON({
            id: props.id.replaceAll(' ', '+'),
            get: true,
          })
        )
        .then((response) => {
          response.data = decryptJSON(response.data.data)
          if (!response.data.error) {
            setComments(response.data.data)
          }
        })
      socket.emit('comments', props.id.replaceAll(' ', '+'))
      socket.on(`productcomment/${props.id.replaceAll(' ', '+')}`, (data) => {
        setComments(data)
      })
    }
  }, [])

  const sendComment = () => {
    if (rate > 0 && message.length > 0) {
      axios
        .post(
          process.env.REACT_APP_APIURL + 'comment',
          encryptJSON({
            id: props.id.replaceAll(' ', '+'),
            get: false,
            message: message,
            rate: rate,
            uid: localStorage.getItem('id'),
          })
        )
        .then((response) => {
          response.data = decryptJSON(response.data.data)
          setSubmitted(response.data)
          setMessage('')
          setRate(0)
        })
    } else {
      setSubmitted({
        success: false,
        message: 'Please rate and type your message!',
      })
    }
  }

  const showStar = (i) => {
    let arr = []
    for (let x = 0; x < i; x++) {
      arr.push(null)
    }
    return arr.map((data, index) => (
      <i className="fa fa-star text-warning" key={index}></i>
    ))
  }
  return (
    <>
      <div className="s-review">REVIEWS</div>
      <div className="review-card">
        <div className="row">
          <div className="col-2">
            <img
              src="https://i.imgur.com/xELPaag.jpg"
              className="rounded-circle"
            />{' '}
          </div>
          <div className="col-10">
            <div className="comment-box ml-2">
              <h4 className="comment">ADD A COMMENT</h4>
              <div className="rating">
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  id="star5"
                  checked={rate === 5}
                  c
                  style={{ display: 'none' }}
                  onClick={() => setRate(5)}
                />
                <label htmlFor="star5" title="text">
                  ★
                </label>
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  id="star4"
                  checked={rate === 4}
                  style={{ display: 'none' }}
                  onClick={() => setRate(4)}
                />
                <label htmlFor="star4" title="text">
                  ★
                </label>
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  id="star3"
                  checked={rate === 3}
                  style={{ display: 'none' }}
                  onClick={() => setRate(3)}
                />
                <label htmlFor="star3" title="text">
                  ★
                </label>
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  id="star2"
                  checked={rate === 2}
                  style={{ display: 'none' }}
                  onClick={() => setRate(2)}
                />
                <label htmlFor="star2" title="text">
                  ★
                </label>
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  id="star1"
                  checked={rate === 1}
                  style={{ display: 'none' }}
                  onClick={() => setRate(1)}
                />
                <label htmlFor="star1" title="text">
                  ★
                </label>
              </div>

              <div className="comment-area">
                <textarea
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your experience and help others make better choices!"
                  rows="4"
                ></textarea>
              </div>
              <div className="comment-btns mt-2">
                <div className="row">
                  {/* <div className="col-6"> */}
                  {submitted.message.length > 0 ? (
                    <div className="pull-left">
                      <span
                        style={
                          submitted.success
                            ? { fontSize: '12px', color: 'green' }
                            : { fontSize: '12px', color: 'red' }
                        }
                      >
                        {submitted.message}
                      </span>
                    </div>
                  ) : null}
                  {/* </div> */}
                  {props.login ? (
                    <button
                      className="btn btn-success send btn-sm"
                      onClick={() => sendComment()}
                    >
                      SEND
                      {/* <i className="fa fa-long-arrow-right ml-1"></i> */}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-div1">
        <div className="scroll-object">
          <div className="r-row">
            {comments.map((data, index) => {
              return (
                <div className="card-p-3" key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                      <div className="col-2">
                        <div className="row">
                          <img
                            src="https://i.imgur.com/hczKIze.jpg"
                            width="30"
                            className="user-img rounded-circle mr-2"
                          />
                        </div>
                      </div>
                      <br />
                      <span>
                        &nbsp;
                        <small className="font-weight-bold text-primary">
                          &nbsp;
                          {data[1].name.length > 12 ? (
                            <>{data[1].name.substr(0, 12)}...</>
                          ) : (
                            data[1].name
                          )}
                        </small>
                        <small
                          className="font-weight-bold"
                          style={{ color: 'grey' }}
                        >
                          &nbsp;@{data[1].email}
                        </small>
                        <br />
                        &nbsp;
                        <small className="font-weight-bold">
                          &nbsp;{data[1].message}
                        </small>
                      </span>
                    </div>
                    <small>2 days ago</small>
                  </div>

                  <div className="action d-flex justify-content-between mt-2 align-items-center">
                    <div className="icons align-items-center">
                      {showStar(data[1].rating)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default Reviews
