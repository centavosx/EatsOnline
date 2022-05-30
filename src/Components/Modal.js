import React, { useState } from 'react'
import '../CSS/Modal.css'

const Modal = (props) => {
  const [others, setOthers] = useState(false)
  const setVal = (v) => {
    if (v === 'Others') {
      props.reason(null)
      return setOthers(true)
    }
    setOthers(false)
    if (v === 'Choose Reason' || v === 'null' || v === null)
      return props.reason(null)
    return props.reason(v)
  }
  return props.display ? (
    <div className="modalBackground">
      <div className="display-block">
        <div className="modalContainer">
          <ul className="cancel_ul">
            <h2>Do you want to Cancel your order?</h2>
            <p className="please">Please Select Reason</p>
            <select
              name="slct"
              id="reas"
              style={{ width: '100%' }}
              onChange={(e) => setVal(e.target.value)}
            >
              <option disabled="" value={null}>
                Choose Reason
              </option>
              <option value="Want to change payment method">
                Want to change payment method
              </option>
              <option value="Change/Combine order">Change/Combine order</option>
              <option value="Delivery time is too long">
                Delivery time is too long
              </option>
              <option value="Duplicate Order">Duplicate Order</option>
              <option value="Sourcing payment issue">
                Sourcing payment issue
              </option>
              <option value="Change of mind">Change of mind</option>
              <option value="Decided for alternative product">
                Decided for alternative product
              </option>
              <option value="Fees-shipping costs">Fees-shipping costs</option>
              <option value="Others">Others</option>
            </select>
          </ul>
        </div>
        {others ? (
          <textarea
            placeholder="Please type your reason for cancelling this transaction."
            onChange={(e) => props.reason('Others: ' + e.target.value)}
          />
        ) : null}
        <div className="bottom">
          <div style={{ margin: '10px' }}>
            <button
              className="modal-Cancel"
              onClick={() => props.cancelModal(false)}
            >
              Cancel
            </button>
          </div>
          <div style={{ margin: '10px' }}>
            <button className="modal-Confirm" onClick={props.confirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Modal
