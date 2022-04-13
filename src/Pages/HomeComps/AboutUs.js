import '../../CSS/AboutUs.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AboutUs() {
  return (
    <section className="section2" id="AboutUs">
      <table className="about-table">
        <tbody>
          <tr>
            <td>
              <a
                href={void 0}
                className="lightbox-image"
                data-fancybox="images"
              >
                <img
                  className="about-img"
                  title=""
                  src="../assets/Home Slider.png"
                  alt=""
                />
              </a>
            </td>
            <td>
              <span className="about-title">
                <h2 className="about-h2">About Us</h2>
              </span>
              <p className="about-p">
                <br></br>
                Eats Online PH is an official franchisee and <br></br>{' '}
                distributor of Philippine regional delicacies. <br></br>
                We aim to provide Filipino foods originated <br></br> from
                different regions within the Philippines. <br></br>
                <br></br>
                Order now and have it delivered at your doorsteps!
              </p>
              <div className="btn1">
                <Link to="/contactus">
                  <div className="ab-btn btn-style-one">Contact Us</div>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
export default AboutUs
