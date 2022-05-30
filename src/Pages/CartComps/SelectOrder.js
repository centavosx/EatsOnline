import axios from 'axios'
import React, { useState } from 'react'
import '../../CSS/Checkout.css'
import { decryptJSON, decrypt, encryptJSON } from '../EncryptionDecryption'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import socket from '../../socket'
const SelectOrder = (props) => {
  const [data, setData] = useState([])
  const [address, setAddress] = useState([])
  const [orderavail, setOrderAvail] = useState(true)
  const [message, setMessage] = useState(false)
  const history = useHistory()
  React.useEffect(() => {
    let x = []
    for (let v in props.data) {
      props.data[v].key = props.data[v].key
      x.push([v, props.data[v]])
    }
    props.t_data.items = x
    props.t_data.totalprice = props.totalamount
    console.log(props.t_data)
    props.setData(props.t_data)
    props.setUse(!props.use)
    if (checkItem(x)) {
      setOrderAvail(true)
      // props.setChA(false)
    } else {
      // props.setChA(true)
      setOrderAvail(false)
    }
    setData(x)
  }, [props.data, props.totalamount, props.t_data])
  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_APIURL +
          `profileData?data=${JSON.stringify(
            encryptJSON({
              id: localStorage.getItem('id'),
              data: ['addresses', 'name'],
            })
          )}`
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)
        if (response.data.addresses === undefined) {
          response.data.addresses = []
        } else {
          if (!(props.t_data.address.length > 0)) {
            for (let x of response.data.addresses) {
              if (x[1].primary) props.t_data.address = x[1].address
            }
          }
        }
        props.t_data.name = response.data.name
        props.setData(props.t_data)
        props.setUse(!props.use)
        setAddress(response.data.addresses)
      })
    socket.emit('userinfo', localStorage.getItem('id'))
    socket.on(`usercartadd/${decrypt(localStorage.getItem('id'))}`, (data) => {
      setAddress(data.addresses)
    })
  }, [])

  const changeValAdv = (e, index) => {
    let firstIndex = props.t_data.items[index][0]
    let obj = props.t_data.items[index][1]
    obj.date = e.target.value
    props.t_data.items[index] = [firstIndex, obj]
    props.setData(props.t_data)
    props.setUse(!props.use)
  }

  const checkItem = (v) => {
    let x = true

    v.forEach((data) => {
      if (!(data[1].numberofitems >= data[1].amount)) x = false
    })
    return x
  }

  const checkToContinue = async () => {
    if (props.chA) return true
    let obj = {}
    for (let x of data) {
      obj[decrypt(x[1].key)] = x[1].amount
    }
    const resp = await axios.put(
      process.env.REACT_APP_APIURL + 'checkCartItems',
      encryptJSON(obj)
    )
    setMessage(!resp.data.data)
    return resp.data.data
  }
  return (
    <div className="order-container">
      <div className="wrapper">
        <div id="one">
          <h4 className="d-flex justify-content-between mb-3">
            <span className="text">Selected Order</span>
          </h4>
          <div className="tableFixHead-cart">
            <table className="table">
              <thead className="top-head">
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Name">{data[1].title}</td>
                      <td data-label="Qty">{data[1].amount}</td>
                      <td data-label="Price">{data[1].price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div id="two">
          <div lassName="needs-validation">
            {/* <div className="my-1">
              {orderavail ? (
                <div className="order-now">
                  <input
                    id="order"
                    name="aoao"
                    type="radio"
                    className="form-check-input"
                    checked={!props.chA}
                    onClick={() => {
                      props.setChA(false)
                    }}
                  />
                  <label className="on-btn" htmlFor="order">
                    Order Now
                  </label>
                </div>
              ) : null}
              {!orderavail ? (
                <p style={{ color: 'red' }}>
                  Some products are only available for advance order, reduce or
                  remove the item to order now
                </p>
              ) : null}
              <div className={!orderavail ? 'order-now' : 'advance-order'}>
                <input
                  id="advorder"
                  name="aoao"
                  type="radio"
                  className="form-check-input"
                  checked={props.chA}
                  onClick={() => {
                    props.setChA(true)
                  }}
                />
                <label className="ao-btn" htmlFor="advorder">
                  Advance Order
                </label>
              </div>
              <br />
            </div> */}
            <h4 className="order-m">Message</h4>
            {/* style={{ width: '38vw' }}  */}
            <textarea
              className="form-control c-msg"
              name="message"
              rows="5"
              placeholder="Message"
              style={{ width: '100%' }}
              value={props.t_data.message}
              onChange={(e) => {
                props.t_data.message = e.target.value
                props.setData(props.t_data)
                props.setUse(!props.use)
              }}
            ></textarea>
            {/* {props.chA ? (
              <>
                <hr className="my-2" />
                <h4 className="order-m">
                  <span style={{ color: 'red' }}>*</span>Select Delivery Date
                </h4>
                <div className="form-group mt-2">
                  {data.map((data, index) => (
                    <div key={index}>
                      <span>
                        <strong>
                          <span style={{ color: 'red' }}>*</span>
                          {data[1].title}{' '}
                        </strong>
                      </span>

                      {'adv' in data[1] ? (
                        <select
                          className="form-control alterationTypeSelect"
                          style={{ width: '33vw' }}
                          defaultValue={props.t_data.items[index][1].date}
                          onClick={(e) => changeValAdv(e, index)}
                        >
                          <option value="">Choose Date</option>
                          {data[1].adv.map((d, i) => (
                            <option key={i} value={new Date(d).toDateString()}>
                              {new Date(d).toDateString()}
                            </option>
                          ))}
                        </select>
                      ) : (
                        // style={{ width: '33vw' }}
                        <select className="form-control alterationTypeSelect">
                          <option>No available date</option>
                        </select>
                      )}
                    </div>
                  ))}
                  <div></div>
                </div>
              </>
            ) : null} */}
            <hr className="my-2" />
            <h4 className="order-m">
              <span style={{ color: 'red' }}>*</span>Payment Method
            </h4>
            <div className="my-1">
              <div className="order-now">
                <input
                  id="cod"
                  name="payment"
                  type="radio"
                  className="form-check-input"
                  checked={props.t_data.payment == 'C.O.D'}
                  onClick={() => {
                    props.t_data.payment = 'C.O.D'
                    props.setData(props.t_data)
                    props.setUse(!props.use)
                  }}
                />
                <label className="form-check-label" htmlFor="cod">
                  Pay C.O.D{' '}
                </label>
              </div>
              <div className="advance-order">
                <input
                  id="online"
                  name="payment"
                  type="radio"
                  className="form-check-input"
                  checked={props.t_data.payment == 'Online Payment'}
                  onClick={() => {
                    props.t_data.payment = 'Online Payment'
                    props.setData(props.t_data)
                    props.setUse(!props.use)
                  }}
                />
                <label className="form-check-label" htmlFor="pay">
                  Online Payment
                </label>
              </div>
            </div>

            <hr className="my-2" />

            <div className="col-md-5">
              <h4 htmlFor="country" className="form-label">
                <span style={{ color: 'red' }}>*</span>Address
              </h4>
              {address.length > 0 ? (
                <select
                  className="form-select"
                  id="country"
                  onClick={(e) => {
                    props.t_data.address = e.target.value
                    props.setData(props.t_data)
                    props.setUse(!props.use)
                  }}
                >
                  <option value="">Choose Address</option>
                  {address.map((data, index) => (
                    <option
                      key={index}
                      value={data[1].address}
                      selected={props.t_data.address == data[1].address}
                    >
                      {data[1].address}
                    </option>
                  ))}
                </select>
              ) : (
                <p style={{ color: 'red' }}>
                  You don't have any listed address. Please add one.{' '}
                  <span
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => history.push('/profile')}
                  >
                    {'->'}
                  </span>
                </p>
              )}
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>
            <hr className="hr-line" />
            <p className="s-total">
              <strong>TOTAL: </strong>PHP{' '}
              <span id="price">{props.totalamount.toFixed(2)}</span>
              <br />
              {/* {props.toContinue() && props.t_data.address.length > 0 && props.t_data.payment.length > 0 && props.t_data.items.length > 0 ? <a href={void (0)} className="next-btn" onClick={() => props.checkOut()}>Next</a> : null} */}
              {props.toContinue() &&
              props.t_data.address.length > 0 &&
              props.t_data.payment.length > 0 &&
              props.t_data.items.length > 0 ? null : (
                <span
                  style={{ textAlign: 'end', fontSize: '14px', color: 'red' }}
                >
                  Please fill up all the requirements to continue
                </span>
              )}
              <br />
              {message ? (
                <span
                  style={{ color: 'red', textAlign: 'end', fontSize: '14px' }}
                >
                  Some products are only available for advance order, reduce or
                  remove the item to order now
                </span>
              ) : null}
            </p>
          </div>

          <div>
            {/* <div className="btns-group"> */}
            <a
              href={void 0}
              className="prev-btn"
              style={{ cursor: 'pointer' }}
              onClick={async () => {
                props.setWidth({ width: '0%' })
                props.setProgress([
                  'progress-step progress-step-active',
                  'progress-step',
                  'progress-step',
                  'progress-step',
                ])
              }}
            >
              PREVIOUS
            </a>
            {/* {props.toContinue() && props.t_data.address.length > 0 && props.t_data.payment.length > 0 && props.t_data.items.length > 0 ? <a href={void (0)} className="next-btn" onClick={() => props.checkOut()}>Next</a> : null} */}
            {props.toContinue() &&
            props.t_data.address.length > 0 &&
            props.t_data.payment.length > 0 &&
            props.t_data.items.length > 0 ? (
              <a
                href={void 0}
                className="cart-order-btn"
                onClick={async () => {
                  if (await checkToContinue()) {
                    props.setWidth({ width: '66.66%' })
                    props.setProgress([
                      'progress-step progress-step-active',
                      'progress-step progress-step-active',
                      'progress-step progress-step-active',
                      'progress-step',
                    ])
                  }
                }}
              >
                NEXT
              </a>
            ) : (
              <>
                <a
                  href={void 0}
                  className="cart-order-btn"
                  style={{ backgroundColor: 'lightgrey' }}
                >
                  NEXT
                </a>
              </>
            )}
            {/* {props.toContinue() && props.t_data.address.length > 0 && props.t_data.payment.length > 0 && props.t_data.items.length > 0 ? <a href={void (0)} className="next-btn" onClick={() => props.checkOut()}>CHECKOUT</a> : null} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectOrder
