import axios from 'axios';
import React, { useState } from 'react'
import "../../CSS/CartConfirmation.css"
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
const CartConfirmation = (props) => {
    const [value, setValue] = useState(true);
    const [adminData, setAdminData] = useState({});
    const [val, setVal] = useState("bank");
    const [image, setImage] = useState(null);
    React.useEffect(() => {
        axios.post(process.env.REACT_APP_APIURL + "toPay",
            encryptJSON({
                data: val
            })).then((resp) => {
                resp.data = decryptJSON(resp.data.data)
                setAdminData(resp.data.data);
            })
    }, [adminData])


    const filechange = (e) => {
        if (e.target.files[0]){
            // setImage(e.target.files[0]);
            var file = e.target.files[0];
            var reader  = new FileReader();
            // reader.onload = function(e)  {
            //     document.getElementById("image").src = e.target.result;
            //  }
            console.log(e.target.files[0]);
             reader.readAsDataURL(file);
        }
      };


    return (
        <div className="confirm-wrapper">
            <div className="three">

                <img className="logo" src='../assets/EOLogo_TransparentBG.png' alt="Logo" />

                <div id="title">
                    <h4>EATS ONLINE</h4>
                </div>
                <div id="mid">
                    <div className="info">
                        <h4 className="h4">Thank you for your order!</h4>
                        <p>
                            Order ID: {props.output.id}<br />
                            Order Date: {new Date(props.output.dateBought).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}<br />
                            Name: {props.output.name}<br />
                            Address: {props.output.address}<br />
                        </p>
                        <hr classNameName="hr-line" />
                    </div>
                </div>
                <div className="summary">
                    <h4 className="sum-h4">SUMMARY</h4>
                </div>
                <div classNameName="tble">
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
                                    <div className="scrollit">
                                        <table>
                                            {props.output.items.map((data, index) => {
                                                return (
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
                {/* // <!--End Invoice Mid--> */}
            </div>
            {/* rigth */}
            <div className="four">
                <div className="info">
                    <p>
                        Order Status: {props.output.status} <br />
                        Payment Status: {props.output.pstatus}<br />
                        Payment Mode: {props.output.payment}<br />
                    </p>
                    <hr classNameName="hr-line" />
                </div>
                <h2 className='pay'>PAYMENT DETAILS</h2>
                <select name="payment-details" defaultValue={true} onChange={(e) => { setValue(e.target.value === 'true'); value ? setVal('bank') : setVal('gcash') }}>
                    <option value={true}>Bank Detail</option>
                    <option value={false}>Gcash Detail</option>
                </select>
                {value ?
                    <div>
                        <h1 className='Pay-bank'>Bank Account Detail</h1>
                        <div className="text-center">
                            <img src={adminData.url}
                                className="img-thumbnail img-responsive" data-output="qrcode" />
                        </div>
                        <div className="info">
                            <p>
                                {adminData.bank} <br />
                                {adminData.holder} <br />
                                {adminData.number}<br />
                            </p>
                        </div>
                    </div>
                    :
                    <div>
                        <h1 className='Pay-gcash'>Gcash Account Detail</h1>
                        <div className="text-center">
                            <img src={adminData.url}
                                className="img-thumbnail img-responsive" data-output="qrcode" />
                        </div>
                        <div className="info">
                            <p>
                                {adminData.holder} <br />
                                {adminData.number}<br />
                            </p>
                        </div>
                    </div>
                }
                <hr className="hr-line" />
                <h2 className='pay'>Upload Receipt</h2>
                <form action="/action_page.php">
                    <input className="upload" type="file" id="myFile" onChange={(e)=>filechange(e)} name="filename" />
                </form>
                <input className="up-btn" value="UPLOAD" type="submit" />
            </div>
        </div>
    )
}
export default CartConfirmation;