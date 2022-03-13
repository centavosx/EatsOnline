import axios from "axios";
import { useState } from "react";
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
const Address = (props) =>{
    const [show, setShow] = useState(false);
    const [address,setAddress] = useState("");

    const add = () =>{
        axios.post(process.env.REACT_APP_APIURL+"address", encryptJSON({
            id: localStorage.getItem("id"),
            data: ["name", "address", "email", "phoneNumber", "addresses"],
            address: address
        })).then((response)=>{
            response.data = decryptJSON(response.data.data)
            if(response.data.addresses==null){
                response.data.addresses = [];
            } 
            response.data.password = '';
            props.setProfileData(response.data);
        })
    }

    const update = (change, address, addressId, primary) =>{
        console.log(addressId);
        axios.patch(process.env.REACT_APP_APIURL+"address", encryptJSON({
            id: localStorage.getItem("id"),
            data: ["name", "address", "email", "phoneNumber", "addresses"],
            address: address,
            primary: primary,
            change: change,
            addressId: addressId
        })).then((response)=>{
            response.data = decryptJSON(response.data.data)
            if(response.data.addresses==null){
                response.data.addresses = [];
            } 
            response.data.password = '';
            props.setProfileData(response.data);
        })
    }
    return(
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Addresses</span><span className="border px-3 p-1 add-experience" style={{cursor:'pointer'}} onClick={()=>show?setShow(false):setShow(true)}><i className={!show?"fa fa-plus":"fa fa-minus"}></i>&nbsp;{!show?"Add":"Cancel"}</span></div><br />
                {show?<><input type="text" className="form-control" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/><button onClick={()=>add()}>Add</button><br/></>:null}
                {props.addresses.map((data, index)=>{
                    return(
                    <><div className="col-md-12" key={index}>{index+1}. <label className="labels">{data[1].address}</label> {data[1].primary?<label>Default</label>:<button onClick={()=>update(false, data[1].address, data[0], true)}>Set to Primary</button>}</div><br /></>
                    );
                })}
                
            
            </div>
        </div>
    )
}

export default Address;