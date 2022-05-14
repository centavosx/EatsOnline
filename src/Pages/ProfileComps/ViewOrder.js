import React, { useState } from 'react'
import '../../CSS/ViewOrder.css'
import socket from '../../socket'
const ViewOrder = (props) => {
  const [data, setData] = useState({})
  React.useEffect(() => {
    setData(props.data[0])
    socket.on(
      `currtransact/${localStorage.getItem('id')}/${props.data[2]}`,
      (data) => {
        if (props.data[1] === 'transaction') {
          setData(data)
        }
      }
    )

    socket.on(
      `currreserve/${localStorage.getItem('id')}/${props.data[2]}`,
      (data) => {
        if (props.data[1] === 'reservation') {
          setData(data)
        }
      }
    )
  }, [])
  return Object.keys(data).length > 0 ? (
    <div className="v-container">
      <a className="v-btn" onClick={() => props.setData([])}>
        BACK
      </a>

      <div className="v-card">
        <div className="v-card-header">
          <strong>
            {new Date(data.dateBought).toDateString()}{' '}
            {new Date(data.dateBought).toLocaleTimeString()}
          </strong>
          <span className="float-right">
            {' '}
            <strong>Status of Order:</strong> {data.status}
          </span>
        </div>
        <div className="v-card-body">
          <div className="row mb-4">
            <div className="infor col-sm-6">
              <div>
                <strong>
                  {' '}
                  {data.name.substring(0, 20)}
                  {data.name.length > 20 ? '...' : null}
                </strong>
              </div>
              <div>
                <strong>Address: </strong> {data.address}
              </div>
              <div>
                <strong>Phone: </strong>
                {data.phone}
              </div>
            </div>

            <div className="vcol col-sm-6">
              <h6 className="mb-3">
                <strong>STATUS</strong>
              </h6>
              <strong> ORDER STATUS: </strong>
              {data.status}
              <br />
              <strong> PAYMENT STATUS: </strong>
              {data.pstatus}
              <br />
              <strong> PAYMENT MODE: </strong>
              {data.payment}
              <br />
              <strong>*</strong>Delivered in{' '}
              <strong>
                {new Date(data.dateBought).toDateString()}{' '}
                {new Date(data.dateBought).toLocaleTimeString()}
              </strong>
            </div>
          </div>

          <div className="table-responsive-sm">
            <table className="v-table table-striped">
              <thead className="theadd">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Item</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody className="tbodyy">
                {data.items.map((data, index) => (
                  <tr key={index}>
                    <td data-label="No.">{index + 1}</td>
                    <td data-label="Item">{data[1].title}</td>
                    <td data-label="Description">{data[1].desc}</td>
                    <td data-label="Price">{data[1].price}</td>
                    <td data-label="Qty">{data[1].amount}</td>
                    <td data-label="Total">
                      {(data[1].price * data[1].amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="ttl-amts">
              <h4>
                {' '}
                <strong>TOTAL : </strong> {data.totalprice}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default ViewOrder
