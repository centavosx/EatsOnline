import axios from "axios";
import React, { useState }  from "react";
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
const Transactions = (props) =>{
    
    const [data, setData] = useState([]);
    const [reason, setReason] = useState("");
    React.useEffect(()=>{
        axios.post(process.env.REACT_APP_APIURL+"getTransactions", encryptJSON({
            id: localStorage.getItem("id"),
            transaction: props.transaction?"transaction":"reservation"
        })).then((response)=>{
            response.data = decryptJSON(response.data.data)
            console.log(response.data.data);
            setData(response.data.data);
        })
    }, [])


    const Cancel = (id) =>{
        console.log(id);
        axios.post(process.env.REACT_APP_APIURL+"cancelorder", encryptJSON({
            id:localStorage.getItem("id"),
            ref:props.transaction?"transaction":"reservation",
            reason: reason,
            key: id
        })).then((response)=>{
            response.data = decryptJSON(response.data.data);
            setData(response.data.data);
        })
    }



    return(<div className="tab-pane tab-paneph fade shadow bg-white show active p-3" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
    <div className="p-title">{props.transaction?"PURCHASE HISTORY":"ADVANCE ORDER"}</div> 
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
        {data.map((d, i)=>
        <tr key={i}>
            <td data-label="No.">{i+1}</td>
            <td data-label="Order ID">{d[1].id}</td>
            <td data-label="Order Date">{new Date(d[1].dateBought).toDateString()} {new Date(d[1].dateBought).toLocaleTimeString()}</td>
            <td data-label="Order Item">{d[1].items.length}</td>
            <td data-label="Total Price">Php{d[1].totalprice.toFixed(2)}</td>
            <td data-label="Order Status">{d[1].status}</td>
            <td data-label="View Order">
                <button className="v-button button-small button-round">View</button>
            </td>
            <td data-label="Cancel Order">
               {d[1].status!=="Cancelled"? <button className="c-button button-small button-round" onClick={()=>Cancel(d[0])}>Cancel</button>:"Cancelled"}
            </td>
        </tr>
        )}
    </tbody>
    </table>
</div>
</div>)
}

export default Transactions;