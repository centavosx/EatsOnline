import { useState } from "react";

const Address = (props) =>{
    const [show, setShow] = useState(false);
    return(
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Addresses</span><span className="border px-3 p-1 add-experience" style={{cursor:'pointer'}} onClick={()=>show?setShow(false):setShow(true)}><i className={!show?"fa fa-plus":"fa fa-minus"}></i>&nbsp;{!show?"Add":"Cancel"}</span></div><br />
                {show?<><input type="text" className="form-control" placeholder="Address" value=""/><br/></>:null}
                {props.addresses.map((data, index)=>{
                    return(
                    <><div className="col-md-12" key={index}>{index+1}. <label className="labels">{data[1].address}</label></div><br /></>
                    );
                })}
                
            
            </div>
        </div>
    )
}

export default Address;