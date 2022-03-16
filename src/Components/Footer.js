import React, { useState } from 'react'

const Footer = (props) => {
    return (
        <footer className="footer">

            {/* <div className="container p-4"> */}
                <section className="mb-4">
                <div className="row">
                        <div col-lg-3="true" col-md-6="true">
                            <div className="footer-info">
                                <div className="section-title">
                                <h2 className="footer-h2">Eats Online</h2>
                                </div>
                                <p style={props.legitkey===true && props.logedin===true && props.idnum!==null?null:{color: 'white'}}>
                                <strong style={props.legitkey===true && props.logedin===true && props.idnum!==null?null:{color: 'white'}}>Location:</strong> 19, Via Milano St., Villa Firenze, Quezon City, Philippines <br></br>
                                    <strong style={props.legitkey===true && props.logedin===true && props.idnum!==null?null:{color: 'white'}}>Open Hours:</strong> Monday-Saturday: 9:00 AM-5:00 PM<br></br>
                                    <strong style={props.legitkey===true && props.logedin===true && props.idnum!==null?null:{color: 'white'}}>Phone:</strong> 09157483872<br></br>
                                    <strong style={props.legitkey===true && props.logedin===true && props.idnum!==null?null:{color: 'white'}}>Email: </strong> eats.onlne@gmail.com<br></br>
                                </p>
                                <div className="social-links mt-3">
									<a href="#hero" className="facebook"><i className="fab fa-facebook-f white-text mr-4"></i>{'     '}</a>
									<a href="#hero" className="instagram"><i className="fab fa-instagram white-text"></i>{'     '}</a>
									<a href="#hero" className="twitter"><i className="fab fa-google-plus-g"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            {/* </div> */}


            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2020 Copyright:
                <a className="text-white" href="https://eatsonlineph.com/"> EatsOnline2020</a>
                <a href="Home.js" title="Up Button"> <span className="up-button"></span>
                </a>
            </div>

        </footer>

    )
}

export default Footer;