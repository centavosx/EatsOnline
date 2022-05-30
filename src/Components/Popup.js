import React from 'react'
import '../CSS/Popup.css'
const Popup = (props) => {
  return (
    <div className="popupBackground">
      <div className="pop-display-block">
        <div className="popupContainer">
          <h2>Your Order is Successfully Added to your Cart!</h2>
        </div>
        <div className="pop-bottom">
          <div style={{ margin: '10px' }}>
            <button
              className="popup-Cancel"
              onClick={() => props.cancelModal(false)}
            >
              Cancel
            </button>
          </div>
          <div style={{ margin: '10px' }}>
            <button className="popup-Confirm" onClick={props.confirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Popup
