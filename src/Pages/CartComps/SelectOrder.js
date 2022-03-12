import axios from "axios";
import React, { useState } from "react"
import "../../CSS/Checkout.css"
import { decryptJSON, encryptJSON } from "../EncryptionDecryption";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SelectOrder = (props) =>{
    const [data,setData] = useState([]);
    const [address, setAddress] = useState([]);
    const [orderoA, setOrderoA] = useState(false);
    const history = useHistory();
    React.useEffect(()=>{
        let x = [];
        for(let v in props.data){
            x.push([v, props.data[v]])
        }
        setData(x);
    }, [props.data, props.totalamount])
    React.useEffect(()=>{
        axios.post(process.env.REACT_APP_APIURL+"profileData", encryptJSON({
            id: localStorage.getItem("id"),
            data: ["addresses"]
        })).then((response)=>{
            response.data = decryptJSON(response.data.data)
            if(response.data.addresses===undefined){
                response.data.addresses = [];
            }
            setAddress(response.data.addresses);
        })
    }, []);
    return(
  <div className="order-container">
      <div class="outerDiv">
			<div class="leftDiv">
                <h4 className="d-flex justify-content-between mb-3">
                    <span className="text">Selected Order</span>
                </h4>
                <div className="tble">
                    <table border="2">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody id="style-4">
                            <tr>
                                <td colSpan="3">
                            <div class="scrollit">
                                <table>
                                    {data.map((data, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td >{data[1].title}</td>
                                                    <td>{data[1].amount}</td>
                                                    <td>{data[1].price}</td>
                                                </tr>
                                            )
                                        }
                                    )}  
                                </table>
                            </div>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
			</div>
			<div class="rightDiv">
                <div lassName="needs-validation">
                    <h4 className="order-m">Order Method</h4>
                        <div className="my-3">
                            <div className="order-now">
                                <input id="order" name="aoao" type="radio" className="form-check-input" onClick={()=>setOrderoA(false)}/>
                                <label className="on-btn" htmlFor="order">Order Now</label>
                            </div>
                            
                            <div className="advance-order">
                                <input id="advorder" name="aoao" type="radio" className="form-check-input" onClick={()=>setOrderoA(true)}/>
                                <label className="ao-btn" htmlFor="advorder">Advance Order</label>
                            </div>
                        </div>
            {orderoA?
            <>
            <hr className="my-4"/>
            <div class="form-group mt-3" >
            <textarea class="form-control" name="message" rows="5" placeholder="Message"></textarea>
                <label class="inline">Select Delivery Date </label>
                <div><span>Chipolata </span>
                    <select class="form-control alterationTypeSelect" style={{width:'40vw'}}>
                        <option>Thu Jun 10 2021</option><option>Fri Jun 11 2021</option>
                        <option>Sat Jun 12 2021</option><option>Sun Jun 13 2021</option>
                        <option >Mon Jun 14 2021</option><option>Tue Jun 15 2021</option>
                        <option>Wed Jun 16 2021</option></select></div>
                <div><span>Merquez </span>
                    <select class="form-control alterationTypeSelect" style={{width:'40vw'}}>
                        <option>No available date for advance order</option></select></div></div>
                </>:null
            }
            <hr className="my-4"/>
            <h4 className="order-m">Payment Method</h4> 
                <div className="my-3">
                    <div className="order-now">
                        <input id="cod" name="payment" type="radio" className="form-check-input"/>
                        <label className="form-check-label" htmlFor="cod">Pay C.O.D </label>
                    </div>
                    <div className="advance-order">
                        <input id="online" name="payment" type="radio" className="form-check-input"/>
                        <label className="form-check-label" htmlFor="pay">Online Payment</label>
                    </div>
                </div>

            <hr className="my-4"/>

            <div className="col-md-5">
                <h4 htmlFor="country" className="form-label">Address</h4>
                {address.length>0?
                <select className="form-select" id="country" required="">
                <option value="">Choose...</option>
                {address.map((data, index)=><option key={index}>{data}</option>)}
                
                </select>
                :<p>You don't have any listed address, please add one <span style={{color:'blue', cursor:'pointer'}} onClick={()=>history.push("/profile")}>{'->'}</span></p>}
                    <div className="invalid-feedback">
                            Please select a valid country.
                    </div>
            </div>
            <hr className="hr-line" />
                <p className="s-total">Total: PHP <span id="price">{props.totalamount}</span></p>
        </div>
       
               
	</div>		
			<div>
                
            </div>
		</div>
    
    </div>

    )
}

export default SelectOrder;