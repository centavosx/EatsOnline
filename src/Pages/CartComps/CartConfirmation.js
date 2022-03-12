import React, {useState} from 'react'
import "../../CSS/CartConfirmation.css"
const CartConfirmation = (props) =>{
    const [value, setValue] = useState(true);
    const [data,setData] = useState([]);
    React.useEffect(()=>{
        let x = [];
        for(let v in props.data){
            x.push([v, props.data[v]])
        }
        setData(x);
    }, [props.data, props.totalamount])
    return(
        <div  className="outerDiv">
			<div  className="leftDiv1">
                
                <img  className="logo" src='../assets/EOLogo_TransparentBG.png' alt="Logo"/>

                <div id="title">
                    <h4>EATS ONLINE</h4>
                </div>
				<div id="mid">
					<div  className="info">
						<h4  className="h4">Thank you for your order!</h4>
						<p> 
							Order ID: 0000<br/>
							Order Date: --/--/----<br/>
							Name: John Doe<br/>
							Address: street city, state 0000<br/>
						</p>
						<hr  classNameName="hr-line" />
					</div>
				</div>
				<div  className="summary"> 
						<h4 className="sum-h4">SUMMARY</h4>
					</div>
					<div  classNameName="tble">
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
        <div  className="scrollit">
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
				{/* // <!--End Invoice Mid--> */}
			</div>
			{/* rigth */}
			<div  className="rightDiv2">
				<div  className="info">
						<p> 
							Order Status: Pending <br/>
							Payment Status: Not paid<br/>
							Payment Mode: Online Payment<br/>
						</p>
						<hr  classNameName="hr-line" />
				</div>
                <h2 className='pay'>PAYMENT DETAILS</h2>
				<select name="payment-details" defaultValue={true} onChange={(e)=>setValue(e.target.value === 'true')}>
                    <option value={true}>Bank Detail</option>
                    <option value={false}>Gcash Detail</option>
                </select>
                {value?
                <div>
                    <h1 className='Pay-bank'>Bank Account Detail</h1>
                    <div  className="text-center">
                        <img src="https://chart.googleapis.com/chart?cht=qr&chl=https://mikethedj4.github.io/kodeWeave/editor/&chs=160x160&chld=L|0"
                             className="img-thumbnail img-responsive" data-output="qrcode"/>
                    </div>
                    <div  className="info">
						<p> 
							Account Holder: Maria juana <br/>
							Acoount Number: 0000-000-000<br/>
						</p>
				</div>
                </div>
                :
                <div>
                    <h1 className='Pay-gcash'>Gcash Account Detail</h1>
                    <div  className="text-center">
                        <img src="https://chart.googleapis.com/chart?cht=qr&chl=https://mikethedj4.github.io/kodeWeave/editor/&chs=160x160&chld=L|0"
                             className="img-thumbnail img-responsive" data-output="qrcode"/>
                    </div>
                    <div  className="info">
						<p> 
							Account Holder: Maria juana <br/>
							Acoount Number: 0000-000-000<br/>
						</p>
				</div>
                </div>
                }
                <hr  className="hr-line" />
                <h2 className='pay'>Upload Receipt</h2>
                <form action="/action_page.php">
                    <input  className="upload" type="file" id="myFile" name="filename"/>
                </form>
                 <input  className="up-btn" value="UPLOAD" type="submit"/>
			</div>
		</div>
    )
}
export default CartConfirmation;