import axios from "axios";
import React, { useState } from "react"
import "../../CSS/Checkout.css"
import { decryptJSON, decrypt, encryptJSON } from "../EncryptionDecryption";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SelectOrder = (props) =>{
    const [data,setData] = useState([]);
    const [address, setAddress] = useState([]);
    const [orderoA, setOrderoA] = useState(null);
    const [chA, setChA] = useState(true);
    const history = useHistory();
    React.useEffect(()=>{
        let x = [];
        for(let v in props.data){
            if(!("adv" in props.data[v])){
                setChA(false);
            }
            delete props.data[v].date;
            props.data[v].key = decrypt(props.data[v].key)
            x.push([v, props.data[v]]);
        }
        props.t_data.items = x;
        props.t_data.totalprice = props.totalamount;
        
        props.setData(props.t_data);
        console.log(props.t_data);
        setData(x);
    }, [props.data, props.totalamount, props.t_data])
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
                        <hr className="my-4"/>
                        <h4 className="order-m">Message</h4> 
                        <textarea class="form-control" name="message" rows="5" style={{width: '40vw'}}placeholder="Message" onChange={(e)=>{props.t_data.message = e.target.value; props.setData(props.t_data);}}></textarea>
            {orderoA?
            <>
            <hr className="my-4"/>
            <div class="form-group mt-3" >
            
            <h4 className="order-m">Select Delivery Date</h4> 
                {data.map((data,index)=><div key={index}><span>{data[1].title} </span>
                    {"adv" in data[1]?<select class="form-control alterationTypeSelect" style={{width:'40vw'}} onClick={(e)=>{props.t_data.items[index][1].date = e.target.value; props.setData(props.t_data); console.log(props.t_data)}}>
                        {data[1].adv.map((d, i)=> <option key={i} value={new Date(d).toDateString()}>{new Date(d).toDateString()}</option>)}
                        </select>
                        :<select class="form-control alterationTypeSelect" style={{width:'40vw'}}>
                            <option>No available date</option>
                        </select>
                }</div>)}
                <div></div></div>
                </>:null
            }
            <hr className="my-4"/>
            <h4 className="order-m">Payment Method</h4> 
                <div className="my-3">
                    <div className="order-now" >
                        <input id="cod" name="payment" type="radio" className="form-check-input" onClick={()=>{props.t_data.payment = "C.O.D"; props.setData(props.t_data); console.log(props.t_data);}}/>
                        <label className="form-check-label" htmlFor="cod">Pay C.O.D </label>
                    </div>
                    <div className="advance-order">
                        <input id="online" name="payment" type="radio" className="form-check-input" onClick={()=>{props.t_data.payment = "Online Payment"; props.setData(props.t_data)}}/>
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
                <p className="s-total">Total: PHP <span id="price">{props.totalamount.toFixed(2)}</span></p>
        </div>
       
               
	</div>		
			<div>
                
            </div>
		</div>
    
    </div>

    )
}

export default SelectOrder;