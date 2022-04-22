import axios from 'axios'
import React, { useState, useRef } from 'react'
import '../../CSS/CartConfirmation.css'
import { decrypt, decryptJSON, encryptJSON } from '../EncryptionDecryption'
import socket from '../../socket'
const Checkout = (props) => {
  const [value, setValue] = useState(true)
  const [image, setImage] = useState(null)
  const [adminData, setAdminData] = useState({})
  const [val, setVal] = useState('bank')
  const [imgurl, setImgurl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [gcash, setGcash] = useState({})
  const [bank, setBank] = useState({})
  const [output, setOutput] = useState({})
  const ref = useRef()
  React.useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
    setOutput(props.output)
    socket.emit('qrcodes')
    socket.on('gcash', (data) => {
      setGcash(data)
    })
    socket.on('bank', (data) => {
      setBank(data)
    })
    socket.on(
      `currtransact/${localStorage.getItem('id')}/${decrypt(
        props.output.iditem
      )}`,
      (data) => {
        if (props.output.what === 'transaction') {
          setOutput(data)
        }
      }
    )
    socket.on(
      `currreserve/${localStorage.getItem('id')}/${decrypt(
        props.output.iditem
      )}`,
      (data) => {
        if (props.output.what === 'reservation') {
          setOutput(data)
        }
      }
    )
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

  const uploadReceipt = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData()
      form.append('image', image)
      form.append(
        'data',
        encryptJSON({
          imagename: image.name,
          id: output.iditem,
          what: output.what,
        }).data
      )
      await axios.post(process.env.REACT_APP_APIURL + 'uploadreceipt', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return Object.keys(output).length > 0 ? (
    <div className="confirm-wrapper" ref={ref}>
      <div id="three">
        <img
          className="logo"
          src="../assets/EOLogo_TransparentBG.png"
          alt="Logo"
        />
        <div className="title-h4">
          <h4>EATS ONLINE</h4>
        </div>
        <div id="mid">
          <div className="info">
            <h4 className="h4">ORDER SUMMARY</h4>
            <p>
              <strong>ORDER ID: </strong>
              {output.id}
              <br />
              <strong>ORDER DATE: </strong>
              {new Date(output.dateBought).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
              <br />
              <strong>NAME: </strong>
              {output.name.substring(0, 20)}
              {output.name.length > 20 ? '...' : null}
              <br />
              <strong>ADDRESS: </strong>
              {output.address}
              <br />
            </p>
            <hr classNameName="hr-line" />
          </div>
        </div>
        <div className="summary">
          <h4 className="sum-h4">SUMMARY</h4>
        </div>
        <div className="tble">
          <table>
            <thead className="cartcon-thead">
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody id="style-4">
              <tr>
                <td colSpan="3">
                  <div className="scrollit">
                    <table className="cart-table">
                      {output.items.map((data, index) => {
                        return (
                          <tr className="cart-tr" key={index}>
                            <td data-label="Name">{data[1].title}</td>
                            <td data-label="Qty">{data[1].amount}</td>
                            <td data-label="Price">{data[1].price}</td>
                          </tr>
                        )
                      })}
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* // <!--End Invoice Mid--> */}
      </div>
      {/* rigth */}
      <div id="four">
        <div className="info">
          <p>
            <strong>ORDER: </strong>
            <strong
              style={
                output.what === 'reservation'
                  ? { color: 'red' }
                  : { color: 'green' }
              }
            >
              {output.what === 'reservation' ? 'Advance Order' : 'Order Now'}
            </strong>
            <br />
            <strong>ORDER STATUS: </strong>
            {output.status} <br />
            <strong>PAYMENT STATUS: </strong>
            {output.pstatus}
            <br />
            <strong>PAYMENT MODE: </strong>
            {output.payment}
            <br />
          </p>
          <hr classNameName="hr-line" />
        </div>
        <h2 className="pay">PAYMENT DETAILS</h2>
        <select
          className="dropdown-center"
          name="payment-details"
          defaultValue={true}
          onChange={(e) => {
            setValue(e.target.value === 'true')
            e.target.value === 'true' ? setVal('bank') : setVal('gcash')
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
        {imgurl !== null || output.receipt ? (
          <center>
            <img
              src={imgurl === null ? output.receipt : imgurl}
              className="img-thumbnail img-responsive"
              data-output="qrcode"
            />
          </center>
        ) : null}
        {output.payment === 'Online Payment' ? (
          <>
            <h2 className="pay">Upload Receipt</h2>
            <form action="/action_page.php">
              <input
                className="upload"
                type="file"
                id="myFile"
                onChange={(e) => filechange(e)}
                name="filename"
                accept="image/*"
              />
            </form>
            {image !== null ? (
              loading ? (
                <h5 className="pay">Uploading...</h5>
              ) : (
                <input
                  className="up-btn"
                  value="UPLOAD"
                  type="submit"
                  onClick={(e) => uploadReceipt(e)}
                />
              )
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  ) : (
    <div ref={ref}></div>
  )
}
export default Checkout
