import "../../CSS/ContactUs.css";
import React, { useState } from 'react';

function ContactUs() {
    return (
        <div class="con-contain">

            <div class="wrapper">

                <div class="form">
                    <h3>Experienced any problem?</h3>
                    <h2 class="form-headline">Send us a message!</h2> <br />
                    <form id="submit-form" action="">
                        <p>
                            <input id="name" class="form-input" type="text" placeholder="Your Name*" />
                            <small class="name-error"></small>
                        </p>
                        <p>
                            <input id="email" class="form-input" type="email" placeholder="Your Email*" />
                            <small class="name-error"></small>
                        </p>
                        <p class="full-width">
                            <input id="company-name" class="form-input" type="text" placeholder="Company Name*" required />
                            <small></small>
                        </p>
                        <p class="full-width">
                            <textarea minlength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
                            <small></small>
                        </p>
                        <p class="full-width">
                            <input type="submit" class="submit-btn" value="Submit" onclick="checkValidations()" />
                            <button class="reset-btn" onclick="reset()">Reset</button>
                        </p>
                    </form>
                </div>

            </div>
        </div>

    );
}
export default ContactUs;