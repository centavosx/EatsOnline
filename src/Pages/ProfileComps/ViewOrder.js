import React, { useState } from 'react'
import '../../CSS/ViewOrder.css'

const ViewOrder = (props) => {
  return (
    <div class="v-container">
      <a className="v-btn" onClick={() => props.setData({})}>
        BACK
      </a>

      <div class="v-card">
        <div class="v-card-header">
          <strong>
            {new Date(props.data.dateBought).toDateString()}{' '}
            {new Date(props.data.dateBought).toLocaleTimeString()}
          </strong>
          <span class="float-right">
            {' '}
            <strong>Status of Order:</strong> {props.data.status}
          </span>
        </div>
        <div class="v-card-body">
          <div class="row mb-4">
            <div class="infor col-sm-6">
              <div>
                <strong>
                  {' '}
                  {props.data.name.substring(0, 20)}
                  {props.data.name.length > 20 ? '...' : null}
                </strong>
              </div>
              <div>
                <strong>Address: </strong> {props.data.address}
              </div>
              <div>
                <strong>Phone: </strong>
                {props.data.phone}
              </div>
            </div>

            <div class="vcol col-sm-6">
              <h6 class="mb-3">
                <strong>STATUS</strong>
              </h6>
              <strong> ORDER STATUS: </strong>
              {props.data.status}
              <br />
              <strong> PAYMENT STATUS: </strong>
              {props.data.pstatus}
              <br />
              <strong> PAYMENT MODE: </strong>
              {props.data.payment}
              <br />
              <strong>*</strong>Delivered in{' '}
              <strong>
                {new Date(props.data.dateBought).toDateString()}{' '}
                {new Date(props.data.dateBought).toLocaleTimeString()}
              </strong>
            </div>
          </div>

          <div class="table-responsive-sm">
            <table class="v-table table-striped">
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
                {props.data.items.map((data, index) => (
                  <tr>
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
          <div class="row">
            <div class="ttl-amts">
              <h4>
                {' '}
                <strong>TOTAL : </strong> {props.data.totalprice}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewOrder
