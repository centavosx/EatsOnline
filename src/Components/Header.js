import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import Menu from '../Pages/Menu.js';
import Profile from '../Pages/Profile.js';
import "../CSS/Header.css";
import { decryptJSON, encryptJSON } from '../Pages/EncryptionDecryption.js';
import axios from 'axios';
import Notification from './Notification';
import ProfileBtn from './ProfileBtn';
const Header = (props) => {
    const [name,setName] = useState({name:'', link:''});
    const history = useHistory();
    React.useEffect(()=>{
        if(localStorage.getItem("id")!==null){
            axios.post(process.env.REACT_APP_APIURL+"profileData", encryptJSON({
                id: localStorage.getItem("id"),
                data: ["name", "link"]
            })).then((response)=>{
                response.data = decryptJSON(response.data.data)
                if(!response.data.error){
                    setName(response.data);
                }else{
                    setName({});
                }
            })
        }
        
    }, []);
   
    return (
        <nav className="navbar navbar-expand-sm navbar-dark" aria-label="Third navbar example">
            <div className="container-fluid">
                <a className="navbar-brand" href={void(0)}>EATS LOGO</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>

                    </ul>
                    <li className="navbar-item">
                        <Notification/>
                    </li>
                    <li className="navbar-item">  
                        {name.name.length>0?<ProfileBtn data={name}/>:<a className="nav-link" style={{cursor: 'pointer'}} onClick={()=>{history.push("/login"); window.location.reload(false);}}>LogIn or Sign Up</a>}
                    </li>
                </div>
            </div>
        </nav>
    )
}

export default Header;