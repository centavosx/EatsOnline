import React, { useState } from 'react'
import '../CSS/Modal.css'

const Modal = (props) => {
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {/* <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5 className="modalh5">Are you sure you want to proceed?</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="y-btn btn-primary">
              Yes
            </button>
            <button
              type="button"
              className="n-btn btn-secondary"
              data-dismiss="modal"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
