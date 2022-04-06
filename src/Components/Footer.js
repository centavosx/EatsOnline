import React, { useState } from 'react'
import '../CSS/Footer.css'
const Footer = (props) => {
  return (
    <footer>
      <div className="footer-content">
        <h2 className="footerh2">Eats Online</h2>
        <p
          className="footer-p"
          style={
            props.legitkey === true &&
            props.logedin === true &&
            props.idnum !== null
              ? null
              : { color: 'white' }
          }
        >
          <strong
            style={
              props.legitkey === true &&
              props.logedin === true &&
              props.idnum !== null
                ? null
                : { color: 'white' }
            }
          >
            Location:
          </strong>{' '}
          19, Via Milano St., Villa Firenze, Quezon City, Philippines <br></br>
          <strong
            style={
              props.legitkey === true &&
              props.logedin === true &&
              props.idnum !== null
                ? null
                : { color: 'white' }
            }
          >
            Open Hours:
          </strong>{' '}
          Monday-Saturday: 9:00 AM-5:00 PM<br></br>
          <strong
            style={
              props.legitkey === true &&
              props.logedin === true &&
              props.idnum !== null
                ? null
                : { color: 'white' }
            }
          >
            Phone:
          </strong>{' '}
          09157483872<br></br>
          <strong
            style={
              props.legitkey === true &&
              props.logedin === true &&
              props.idnum !== null
                ? null
                : { color: 'white' }
            }
          >
            Email:{' '}
          </strong>{' '}
          eats.onlne@gmail.com<br></br>
        </p>
        <ul className="socials">
          <li>
            <a href="#hero" className="facebook">
              <i className="fab fa-facebook-f white-text mr-4"></i>
              {'     '}
            </a>
          </li>
          <li>
            <a href="#hero" className="instagram">
              <i className="fab fa-instagram white-text"></i>
              {'     '}
            </a>
          </li>
          <li>
            <a href="#hero" className="twitter">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        © 2020 Eats Online.
        <a className="text-white" href="https://eatsonlineph.com/">
          {' '}
          All Rights Reserved.
        </a>
      </div>
    </footer>
  )
}

export default Footer
