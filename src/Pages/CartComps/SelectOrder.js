import axios from 'axios'
import React, { useState } from 'react'
import '../../CSS/Checkout.css'
import { decryptJSON, decrypt, encryptJSON } from '../EncryptionDecryption'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const SelectOrder = (props) => {
  const [data, setData] = useState([])
  const [address, setAddress] = useState([])
  const history = useHistory()
  React.useEffect(() => {
    let x = []
    for (let v in props.data) {
      delete props.data[v].date
      props.data[v].key = props.data[v].key
      x.push([v, props.data[v]])
    }
    props.t_data.items = x
    props.t_data.totalprice = props.totalamount
    props.setData(props.t_data)
    props.setUse(!props.use)
    setData(x)
  }, [props.data, props.totalamount, props.t_data])
  React.useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_APIURL + 'profileData',
        encryptJSON({
          id: localStorage.getItem('id'),
          data: ['addresses', 'name'],
        })
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
  }, [])

  const changeValAdv = (e, index) => {
    let firstIndex = props.t_data.items[index][0]
    let obj = props.t_data.items[index][1]
    obj.date = e.target.value
    props.t_data.items[index] = [firstIndex, obj]
    props.setData(props.t_data)
    props.setUse(!props.use)
  }

  return (
    <div className="order-container">
      <div className="wrapper">
        <div id="one">
          <h4 className="d-flex justify-content-between mb-3">
            <span className="text">Selected Order</span>
          </h4>
          <div className="tableFixHead-cart tbody-scroll">
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
            <h4 className="order-m">Order Method</h4>
            <div className="my-1">
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

              <div className="advance-order">
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
            </div>
            <hr className="my-2" />
            <h4 className="order-m">Message</h4>
            {/* style={{ width: '38vw' }}  */}
            <textarea
              className="form-control c-msg"
              name="message"
              rows="5"
              placeholder="Message"
              value={props.t_data.message}
              onChange={(e) => {
                props.t_data.message = e.target.value
                props.setData(props.t_data)
                props.setUse(!props.use)
              }}
            ></textarea>
            {props.chA ? (
              <>
                <hr className="my-2" />
                <h4 className="order-m">Select Delivery Date</h4>
                <div className="form-group mt-2">
                  {data.map((data, index) => (
                    <div key={index}>
                      <span>
                        <strong>{data[1].title} </strong>
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
            ) : null}
            <hr className="my-2" />
            <h4 className="order-m">Payment Method</h4>
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
                Address
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
                <p>
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
            </p>
          </div>

          <div>
            {/* <div className="btns-group"> */}
            <a
              href={void 0}
              className="prev-btn"
              onClick={() => {
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
                onClick={() => {
                  props.setWidth({ width: '66.66%' })
                  props.setProgress([
                    'progress-step progress-step-active',
                    'progress-step progress-step-active',
                    'progress-step progress-step-active',
                    'progress-step',
                  ])
                }}
              >
                NEXT
              </a>
            ) : null}
            {/* {props.toContinue() && props.t_data.address.length > 0 && props.t_data.payment.length > 0 && props.t_data.items.length > 0 ? <a href={void (0)} className="next-btn" onClick={() => props.checkOut()}>CHECKOUT</a> : null} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectOrder
