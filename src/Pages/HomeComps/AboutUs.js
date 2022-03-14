import "../../CSS/AboutUs.css";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function AboutUs() {
    return (
        <div>
            <section className="about-section">
                <div className="container">
                    <div className="row">
                        <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <span className="a-title"><h2>About Us</h2></span>
                                    <p><br></br>
                                        Eats Online PH is an official franchisee and distributor <br></br> of Philippine regional delicacies.
                                        We aim to provide <br></br> Filipino foods originated from different regions within <br></br> the Philippines. <br></br><br></br><br></br>
                                        Order now and have it delivered at your doorsteps!
                                    </p>
                                </div>
                                <div className="a-btn">
                                    <Link to="/contactus">
                                        <a className="ab-btn btn-style-one">Contact Us</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Image Column --> */}
                        <div className="image-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column wow fadeInLeft">
                                <figure className="image-1">
                                    <a href={void (0)} className="lightbox-image" data-fancybox="images">
                                        <img title="" src="../assets/Home Slider.png" alt="" /></a>
                                </figure>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
export default AboutUs;