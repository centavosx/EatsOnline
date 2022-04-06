import React, { useState } from 'react'
import '../CSS/Notification.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { decryptJSON, encryptJSON } from '../Pages/EncryptionDecryption.js'
const Notification = (props) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  React.useEffect(async () => {
    if (localStorage.getItem('id') !== null) {
      let req = await axios.post(
        process.env.REACT_APP_APIURL + 'notif',
        encryptJSON({
          id: localStorage.getItem('id'),
        })
      )
      setData(decryptJSON(req.data.data))
    }
  }, [data])
  return (
    <div className="notifications">
      <div className="icon_wrap">
        <i class="far fa-bell" onClick={() => setShow(!show)}></i>
      </div>
      {show ? (
        <div className="notification_dd" style={{ display: 'block' }}>
          <ul className="notification_ul">
            {data.map((data, index) => (
              <a href={`/cartlist?id=${data[0][0]}&what=${data[0][1]}`}>
                <li
                  key={index}
                  className={
                    data[1].status == 'Completed'
                      ? 'success starbucks'
                      : data[1].status == 'Pending'
                      ? 'pending pizza_hut'
                      : data[1].status == 'Cancelled'
                      ? 'failed mcd'
                      : 'delivery baskin_robbins'
                  }
                >
                  <div className="notify_icon">
                    <span className="icon"></span>
                  </div>
                  <div className="notify_data">
                    <div class="notif_title">{data[1].id}</div>
                    <div className="sub_title">{data[1].payment}</div>
                  </div>
                  <div className="notify_status">
                    <p>{data[1].status}</p>
                  </div>
                </li>
              </a>
            ))}
            <li className="show_all">
              <p className="link">Show All Activities</p>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}
export default Notification
