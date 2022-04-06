import React, { useState } from 'react'
import '../CSS/Modal.css'

const Modal = (props) => {
  return (
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            {/* <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5> */}
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5 class="modalh5">Are you sure you want to proceed?</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="y-btn btn-primary">
              Yes
            </button>
            <button
              type="button"
              class="n-btn btn-secondary"
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
