
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory} from "react-router-dom";
import Address from './Address';
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
import "../../CSS/Profileinfo.css";
import sha256 from 'crypto-js/sha256';
import Transactions from './Transactions';
function ProfileInfo(){
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    const [profileData, setProfileData] = useState({
        name: '',
        phoneNumber: '',
        addresses: [],
        password: '',
        guest: false,
    })

    const[show, setShow] = useState([true, false, false, false])

    React.useEffect(()=>{
        axios.post(process.env.REACT_APP_APIURL+"profileData", encryptJSON({
            id: localStorage.getItem("id"),
            data: ["name", "address", "email", "phoneNumber", "addresses", "guest"]
        })).then((response)=>{
            response.data = decryptJSON(response.data.data)
            if(response.data.addresses==null){
                response.data.addresses = [];
            } 
            response.data.password = '';
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


    const validatePass = () =>{
        let re = /[A-Z]/;
        let re2 = /[a-z]/;
        let re3 = /[!@#$%^&*\(\)_+\}\{\":?><|~\.\-]/;
        let re4 = /[0-9]/;
        return !(!re.test(password) || !re2.test(password) || !re3.test(password) || !re4.test(password) || password.length<8)
    }
    
    const checkP = () =>{
        return password.length>0 && validatePass() ? password === confirmPassword : false 
    }

    const checkName = () =>{
        return password.length>0 && name.length>0 ? checkP() && !(name === profileData.name) : name.length>0 ? !(name === profileData.name) : false
    }

    const checkNumber = () =>{
        let c = /^\+?\d+$/;
        return password.length>0 && phoneNumber.length>0 ? checkP() && !(phoneNumber === profileData.phoneNumber) : phoneNumber.length>10 ? c.test(phoneNumber) && !(phoneNumber === profileData.phoneNumber) : false
    }

    const updateData = () => {
        let updateData = {}
        if(name.length>0 && name !== profileData.name) updateData.name = name
        if(password.length>0) updateData.password = name
        if(phoneNumber.length>0 && phoneNumber !== profileData.phoneNumber) updateData.phoneNumber = phoneNumber
        axios.patch(process.env.REACT_APP_APIURL+"profileData", encryptJSON({
            id: localStorage.getItem("id"),
            updateData: updateData
        })).then(()=>{
           window.location.reload(false);
        })
    }
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
                                <input type="text" className="form-control" placeholder={profileData.name} value={name} onChange={(e)=>setName(e.target.value)} />
                                <label className="labels">Email</label>
                                <input type="text" className="form-control" placeholder={profileData.email}/>
                                <label className="labels">Phone Number</label>
                                <input type="text" className="form-control" placeholder={profileData.phoneNumber} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                                
                               {!profileData.guest?
                               <>
                                <h4> &nbsp; &nbsp;<br/>Change pass</h4>
                                <label className="labels">Password</label>
                                <input type="password" className="form-control" placeholder={profileData.password} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                {password.length>0?<>
                                <label className="labels">Confirm Password</label>
                                <input type="password" className="form-control" placeholder={profileData.confirmPassword} value={confirmPassword}onChange={(e)=>setConfirm(e.target.value)}/></>
                                :null}
                                </>
                                :null} 
                

                                
                            </div>
                            <Address setProfileData={setProfileData} addresses={profileData.addresses}/>
                            <div id="col">
                                {checkP() || (checkName() || checkNumber()) ? <button type="button" class="btn btn-primary btn-block" onClick={()=>updateData()}>Save</button> : null}
                            </div>
                        </div>
                    </div>:null}

                    {/* <!-- Purchase History --> */}
                    {show[1]?<Transactions transaction={true}/>
                    :null}

                    {/* <!-- Advance Order --> */}
                    {show[2]?
                    
                    <Transactions transaction={false}/>:null}
                </div>
            </div>
        </div>
    </div>
</section>
</div>
    );
}

export default ProfileInfo;