import "../../CSS/ContactUs.css";
import React, { useState } from 'react';

function ContactUs() {
    return (

        
        <div class="contact-container">

        <div className="head">
            <h4 className="Con-h4">CONTACT US</h4>
        </div>  

            <div class="wrapperCU">

                <div class="formContactUs">
                    <h3>We would love to hear from you!</h3>
                    {/* <h2 class="form-headline">Send us a message!</h2> <br /> */}
                    <form id="submit-form" action="">
                        <p>
                            <input id="name" class="form-inputCU" type="text" placeholder="Your Name*" />
                            <small class="name-error"></small>
                        </p>
                        <p>
                            <input id="email" class="form-inputCU" type="email" placeholder="Your Email*" />
                            <small class="name-error"></small>
                        </p>

                        <p class="full-width">
                            <textarea minlength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
                            <small></small>
                        </p>
                        <p class="full-width">
                            <button class="reset-btn" onclick="reset()">Reset</button>
                            <input type="submit" class="submit-cubtn" value="Submit" onclick="checkValidations()" />
                        </p>
                    </form>
                </div>

            </div>
        </div>

    );
}
export default ContactUs;