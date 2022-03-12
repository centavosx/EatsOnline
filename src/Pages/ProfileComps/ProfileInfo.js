import axios from 'axios';
import React, { useState } from 'react';
import { useHistory} from "react-router-dom";
import Address from './Address';
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
import "../../CSS/Profileinfo.css";
import sha256 from 'crypto-js/sha256';
function ProfileInfo(){
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        addresses: []
    })

    const [profileDataC, setProfileDataC] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        addresses: []
    })

    const[show, setShow] = useState([true, false, false, false])

    React.useEffect(()=>{
        axios.post(process.env.REACT_APP_APIURL+"profileData", encryptJSON({
            id: localStorage.getItem("id"),
            data: ["name", "address", "email", "phoneNumber", "addresses"]
        })).then((response)=>{
            response.data = decryptJSON(response.data.data)
            if(response.data.addresses==null){
                response.data.addresses = [];
            }
            setProfileDataC(response.data);
            setProfileData(response.data);
        })
    }, []);

    React.useEffect(()=>{
        const script = document.createElement('script');
        script.src = "https://code.jquery.com/jquery-3.3.1.slim.min.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }

    }, [profileData])
    return (
        <div>
        {/* // <!-- Demo header--> */}
<section class="profile-section">
    <div class="container py-4">
        <div class="row">
            <div class="col-md-3">
                {/* <!-- Tabs nav --> */}
                <div class="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class={show[0]?"nav-link mb-3 p-3 shadow active":"nav-link mb-3 p-3 shadow"} id="v-pills-home-tab" style={!show[0]?{cursor:'pointer'}:{}} data-toggle="pill" onClick={()=>setShow([true, false, false, false])}>
                        <span class="font-weight-bold small text-uppercase">Personal information</span></a>
                    <a class={show[1]?"nav-link mb-3 p-3 shadow active":"nav-link mb-3 p-3 shadow"} id="v-pills-profile-tab" style={!show[1]?{cursor:'pointer'}:{}} data-toggle="pill" onClick={()=>setShow([false, true, false, false])}>
                        <span class="font-weight-bold small text-uppercase">Purchase History</span></a>
                    <a class={show[2]?"nav-link mb-3 p-3 shadow active":"nav-link mb-3 p-3 shadow"} id="v-pills-messages-tab" style={!show[2]?{cursor:'pointer'}:{}} data-toggle="pill" onClick={()=>setShow([false, false, true, false])}>
                        <span class="font-weight-bold small text-uppercase">Advance Order</span></a>
                    </div>
            </div>


            <div class="col-md-9">
                {/* <!-- Tabs content --> */}
                <div class="tab-content" id="v-pills-tabContent">
                    {show[0]?
                    <div class="tab-pane fade shadow bg-white show active p-3" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <div className="p-title">PROFILE INFORMATION</div> 
                            <img src="../assets/Home Slider.png" className="p-c-img" alt="Profile Image"/>   
                        <div className="p-3 py-5">
                            {/* <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div> */}
                            <div className="row mt-2">
                                <label className="labels">Name</label>
                                <input type="text" className="form-control" placeholder={profileData.name} />
                                <label className="labels">Email</label>
                                <input type="text" className="form-control" placeholder={profileData.email}/>
                                <label className="labels">Phone Number</label>
                                <input type="text" className="form-control" placeholder={profileData.phoneNumber}/>
                                <label className="labels">Password</label>
                                <input type="text" className="form-control" placeholder={profileData.password}/>
                                <label className="labels">Confirm Password</label>
                                <input type="text" className="form-control" placeholder={profileData.confirmPassword}/>
                            </div>
                            <div id="col">
                                <button type="button" class="btn btn-primary btn-block">Edit</button>
                            </div>
                        </div>
                    </div>:null}

                    {/* <!-- Purchase History --> */}
                    {show[1]?
                    <div className="tab-pane tab-paneph fade shadow bg-white show active p-3" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div className="p-title">PURCHASE HISTORY</div> 
                     <div class="tableFixHead tbody-scroll">      
                     <table>
                        <thead className="top-head">
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Order Item</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">View Order</th>
                                <th scope="col">Cancel Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>:null}

                    {/* <!-- Advance Order --> */}
                    {show[2]?
                    <div className="tab-pane tab-paneao fade shadow bg-white show active p-3" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                    <div className="p-title">ADVANCE ORDER</div> 
                    <div className="tableFixHead tbody-scroll">
                    <table>
                        <thead className="top-head">
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Advance Order Date</th>
                                <th scope="col">Order Item</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Order Status</th>
                                <th scope="col">View Order</th>
                                <th scope="col">Cancel Order</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="No.">Visa - 3412</td>
                                <td data-label="Order ID">04/01/2016</td>
                                <td data-label="Order Date">$1,190</td>
                                <td data-label="Order Item">03/01/2016 - 03/31/2016</td>
                                <td data-label="Total Price">Visa - 3412</td>
                                <td data-label="Order Status">04/01/2016</td>
                                <td data-label="View Order">
                                    <button className="v-button button-small button-round">View</button>
                                </td>
                                <td data-label="Cancel Order">
                                    <button className="c-button button-small button-round">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    </div>:null}
                </div>
            </div>
        </div>
    </div>
</section>
</div>
    );
}

export default ProfileInfo;