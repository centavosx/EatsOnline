import axios from 'axios'
import React, { useState } from 'react'
import '../../CSS/CartConfirmation.css'
import socket from '../../socket'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
const CartConfirmation = (props) => {
  const [value, setValue] = useState(true)
  const [adminData, setAdminData] = useState({})
  const [val, setVal] = useState('bank')
  const [gcash, setGcash] = useState({})
  const [bank, setBank] = useState({})
  React.useEffect(() => {
    socket.emit('qrcodes')
    socket.on('gcash', (data) => {
      setGcash(data)
    })
    socket.on('bank', (data) => {
      setBank(data)
    })
    axios
      .get(
        process.env.REACT_APP_APIURL +
          `toPay?data=${JSON.stringify(
            encryptJSON({
              data: 'bank',
            })
          )}`
      )
      .then((resp) => {
        resp.data = decryptJSON(resp.data.data)
        setBank(resp.data.data)
      })
    axios
      .get(
        process.env.REACT_APP_APIURL +
          `toPay?data=${JSON.stringify(
            encryptJSON({
              data: 'gcash',
            })
          )}`
      )
      .then((resp) => {
        resp.data = decryptJSON(resp.data.data)
        setGcash(resp.data.data)
      })
  }, [])
  React.useEffect(() => {
    setAdminData(val === 'bank' ? bank : gcash)
  }, [val, gcash, bank])

  return (
    <div className="confirm-wrapper">
      <div id="three">
        <img
          className="logo"
          src="../assets/EOLogo_TransparentBG.png"
          alt="Logo"
        />
        <div id="title">
          <h4 className="title-h4">EATS ONLINE</h4>
        </div>
        <div id="mid">
          <div className="info">
            <h4 className="h4">ORDER CONFIRMATION</h4>
            <p className="info-customer">
              {/* Order ID: {props.output.id}<br />
                            Order Date: {new Date(props.output.dateBought).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}<br /> */}
              <strong>NAME: </strong>
              {props.output.name.substring(0, 20)}
              {props.output.name.length > 20 ? '...' : null}
              <br />
              <strong>ADDRESS: </strong>
              {props.output.address}
              <br />
              <strong>PAYMENT MODE: </strong>
              {props.output.payment}
            </p>
            <hr classNameName="hr-line" />
          </div>
        </div>
        <div className="summary">
          <h4 className="sum-h4">SUMMARY</h4>
        </div>
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
              {props.output.items.map((data, index) => {
                return (
                  <tr className="cart-tr" key={index}>
                    <td data-label="Name">{data[1].title}</td>
                    <td data-label="Qty">{data[1].amount}</td>
                    <td data-label="Price">{data[1].price}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* // <!--End Invoice Mid--> */}
      </div>
      {/* rigth */}
      <div id="four">
        {props.output.payment === 'Online Payment' ? (
          <>
            <h2 className="pay">PAYMENT DETAILS</h2>
            <select
              className="dropdown-center"
              name="payment-details"
              defaultValue={true}
              onChange={(e) => {
                setValue(e.target.value === 'true')
                e.target.value ? setVal('bank') : setVal('gcash')
              }}
            >
              <option value={true}>Bank Detail</option>
              <option value={false}>Gcash Detail</option>
            </select>
            {value ? (
              <div>
                <h1 className="Pay-bank">Bank Account Detail</h1>
                <div className="text-center">
                  <img
                    src={adminData.url}
                    className="img-thumbnail img-responsive"
                    data-output="qrcode"
                  />
                </div>
                <div className="info">
                  <p>
                    {adminData.bank} <br />
                    {adminData.holder} <br />
                    {adminData.number}
                    <br />
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="Pay-gcash">Gcash Account Detail</h1>
                <div className="text-center">
                  <img
                    src={adminData.url}
                    className="img-thumbnail img-responsive"
                    data-output="qrcode"
                  />
                </div>
                <div className="info">
                  <p>
                    {adminData.holder} <br />
                    {adminData.number}
                    <br />
                  </p>
                </div>
              </div>
            )}
            <hr className="hr-line" />
          </>
        ) : null}
        {/*
                <h2 className='pay'>Upload Receipt</h2>
                <form action="/action_page.php">
                    <input className="upload" type="file" id="myFile" onChange={(e)=>filechange(e)} name="filename" />
                </form> */}
        {/* <input className="up-btn" value="UPLOAD" type="submit" /> */}
        <a
          href={void 0}
          className="prev-btn"
          onClick={() => {
            props.setWidth({ width: '33.33%' })
            props.setProgress([
              'progress-step progress-step-active',
              'progress-step progress-step-active',
              'progress-step',
              'progress-step',
            ])
          }}
          style={{ cursor: 'pointer' }}
        >
          PREVIOUS
        </a>
        {props.toContinue() &&
        props.output.address.length > 0 &&
        props.output.payment.length > 0 &&
        props.output.items.length > 0 ? (
          <a
            href={void 0}
            className="next-btn"
            onClick={() => props.checkOut()}
            style={{ cursor: 'pointer' }}
          >
            Submit Order
          </a>
        ) : null}
      </div>
    </div>
  )
}
export default CartConfirmation
