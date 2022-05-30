import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { decrypt, decryptJSON, encryptJSON } from '../EncryptionDecryption'
import '../../CSS/ViewOrder.css'
import socket from '../../socket'
import Modal from '../../Components/Modal'
// import Modal from '../src/Components/Modal.js';
const Transactions = (props) => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [reason, setReason] = useState(null)
  const history = useHistory()
  const [id, setId] = useState(null)
  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_APIURL +
          `getTransactions?data=${JSON.stringify(
            encryptJSON({
              id: localStorage.getItem('id'),
              transaction: props.transaction ? 'transaction' : 'reservation',
            })
          )}`
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)

        setData(response.data.data)
      })
    socket.on(
      `${props.transaction ? 'transaction-all' : 'reservation-all'}/${decrypt(
        localStorage.getItem('id')
      )}`,
      (data) => {
        setData(data)
      }
    )
  }, [])

  const Cancel = (id) => {
    if (reason === null) return alert('Please add a reason!')
    axios
      .patch(
        process.env.REACT_APP_APIURL + 'cancelorder',
        encryptJSON({
          id: localStorage.getItem('id'),
          ref: props.transaction ? 'transaction' : 'reservation',
          reason: reason,
          key: id,
        })
      )
      .then((response) => {
        response.data = decryptJSON(response.data.data)
        setShowModal(false)
      })
  }

  return (
    <div
      className="tab-pane fade shadow bg-white show active p-3"
      id="v-pills-profile"
      role="tabpanel"
      aria-labelledby="v-pills-profile-tab"
    >
      <Modal
        display={showModal}
        cancelModal={setShowModal}
        reason={(v) => setReason(v)}
        confirm={() => Cancel(id)}
      />
      <div className="p-title">
        {props.transaction ? 'PURCHASE HISTORY' : 'ADVANCE ORDER'}
      </div>
      <br />
      <div className="tableFixHead tbody-scroll">
        <table>
          <thead className="top-head">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Order ID</th>
              <th scope="col">Order Date</th>
              <th scope="col">Order Item</th>
              <th scope="col">Total Price</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Order Status</th>
              <th scope="col">View Order</th>
              <th scope="col">Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td data-label="No.">{i + 1}</td>
                <td data-label="Order ID">{d[1].id}</td>
                <td data-label="Order Date">
                  {new Date(d[1].dateBought).toDateString()}{' '}
                  {new Date(d[1].dateBought).toLocaleTimeString()}
                </td>
                <td data-label="Order Item">{d[1].items.length}</td>
                <td data-label="Total Price">
                  Php{d[1].totalprice.toFixed(2)}
                </td>
                <td data-label="Payment Status">{d[1].pstatus}</td>
                <td data-label="Order Status">{d[1].status}</td>
                <td data-label="View Order">
                  <button
                    className="v-button button-small button-round"
                    onClick={() =>
                      props.setData([
                        d[1],
                        props.transaction ? 'transaction' : 'reservation',
                        d[0],
                      ])
                    }
                  >
                    View
                  </button>
                </td>
                <td data-label="Cancel Order">
                  {d[1].status !== 'Cancelled' ? (
                    d[1].status === 'Completed' ? (
                      'Completed'
                    ) : (
                      <button
                        className="c-button button-small button-round"
                        onClick={() => /*Cancel(d[0])*/ {
                          setId(d[0])
                          setShowModal(true)
                        }}
                      >
                        Cancel
                      </button>
                    )
                  ) : (
                    'Cancelled'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions
