import React, { useState } from 'react'
import '../CSS/Notification.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { decryptJSON, encryptJSON } from '../Pages/EncryptionDecryption.js'
import socket from '../socket'
const Notification = (props) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  const [advanced, setAdvanced] = useState([])
  const [order, setOrder] = useState([])
  const [notif, setNotif] = useState(0)
  React.useEffect(async () => {
    if (props.loggedin) {
      let req = await axios.get(
        process.env.REACT_APP_APIURL +
          `notif?data=${JSON.stringify(
            encryptJSON({
              id: localStorage.getItem('id'),
            })
          )}`
      )
      setData(decryptJSON(req.data.data))
      socket.emit('notifications', localStorage.getItem('id'))
      socket.on(`transact/${localStorage.getItem('id')}`, (data) => {
        setOrder(data)
      })
      socket.on(`advanced/${localStorage.getItem('id')}`, (data) => {
        setAdvanced(data)
      })
      socket.on(`notifcount/${localStorage.getItem('id')}`, (count) => {
        setNotif(notif + count)
      })
    }
  }, [props.loggedin])

  React.useEffect(() => {
    setData([...order, ...advanced])
  }, [order, advanced])

  return (
    <div className="notifications">
      <div className="icon_wrap">
        <i className="far fa-bell" onClick={() => setShow(!show)}></i>
        <span
          style={{
            position: 'absolute',
            fontSize: '15px',
            color: 'red',
            fontWeight: 'bold',
          }}
        >
          {notif > 0 ? notif : null}
        </span>
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
                    <div className="notif_title">{data[1].id}</div>
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
