import axios from 'axios'
import { useState } from 'react'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
const Address = (props) => {
  const [show, setShow] = useState(false)
  const [address, setAddress] = useState('')

  const add = () => {
    axios
      .post(
        process.env.REACT_APP_APIURL + 'address',
        encryptJSON({
          id: localStorage.getItem('id'),
          data: [
            'name',
            'address',
            'email',
            'phoneNumber',
            'addresses',
            'guest',
          ],
          address: address,
        })
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)
        if (response.data.addresses == null) {
          response.data.addresses = []
        }
        response.data.password = ''
        props.setProfileData(response.data)
      })
  }

  const update = (change, address, addressId, primary) => {
    console.log(addressId)
    axios
      .patch(
        process.env.REACT_APP_APIURL + 'address',
        encryptJSON({
          id: localStorage.getItem('id'),
          data: [
            'name',
            'address',
            'email',
            'phoneNumber',
            'addresses',
            'guest',
          ],
          address: address,
          primary: primary,
          change: change,
          addressId: addressId,
        })
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)
        if (response.data.addresses == null) {
          response.data.addresses = []
        }
        response.data.password = ''
        props.setProfileData(response.data)
      })
  }
  const deleteAddress = (addressId) => {
    axios
      .delete(
        process.env.REACT_APP_APIURL + 'address',
        encryptJSON({
          id: localStorage.getItem('id'),
          data: [
            'name',
            'address',
            'email',
            'phoneNumber',
            'addresses',
            'guest',
          ],
          addressId: addressId,
        })
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)
        if (response.data.addresses == null) {
          response.data.addresses = []
        }
        response.data.password = ''
        props.setProfileData(response.data)
      })
  }
  return (
    <div>
      <div>
        <div className="justify-content-between align-items-center experience">
          <span className="address-es">ADDRESS/ES</span>
          <span
            className="border px-3 p-1 add-experience"
            style={{ cursor: 'pointer' }}
            onClick={() => (show ? setShow(false) : setShow(true))}
          >
            <i className={!show ? 'fa fa-plus' : 'fa fa-minus'}></i>&nbsp;
            {!show ? 'Add' : 'Cancel'}
          </span>
        </div>
        <br />
        {show ? (
          <>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              style={{ width: '100%' }}
              onChange={(e) => setAddress(e.target.value)}
            />
            {address.length > 0 ? (
              <button className="Add-add" onClick={() => add()}>
                Add
              </button>
            ) : null}
            <br />
          </>
        ) : null}
        {props.addresses.map((data, index) => {
          return (
            <>
              <div className="col-md-12" key={index}>
                {index + 1}.<label className="labels">{data[1].address}</label>
                {data[1].primary ? (
                  <label className="default">DEFAULT</label>
                ) : (
                  <div className="addressContainer-btn">
                    <button
                      className="set-pri"
                      onClick={() =>
                        update(false, data[1].address, data[0], true)
                      }
                    >
                      Primary
                    </button>
                    <button
                      className="Del"
                      onClick={() => deleteAddress(data[0])}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <br />
            </>
          )
        })}
      </div>
    </div>
  )
}
export default Address
