import axios from 'axios';
import React, {useState} from 'react'
import "../../CSS/Category.css";
import "../../CSS/Search.css";
import Search from "../ProductComps/Search.js"
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
function Category(props){
    const search = (category, value) =>{
    
        axios.post(process.env.REACT_APP_APIURL+"search",
        encryptJSON({
            reference: "products",
            data: category,
            value: value
        })).then((resp)=>{
            resp.data = decryptJSON(resp.data.data)
            if(!resp.data.error){
                if(resp.data.search){
                    props.setValues(resp.data.data);
                }
            }
        })
    }
    return(
        <nav>
             {/* <!-- heading --> */}
    <div className="heading">
        <h3>MENU</h3>
    </div>
    
    <nav>
                        <div className="category">
                            <div className="toggle"></div>
                            <ul className="category-list">
                                <li><a href="#">HOTDOG</a></li>
                                <li  class="shop"><a href="#" >HOTDOG</a></li>
                                <li><a href="#">HOTDOG</a></li>
                                <li><a href="#">HOTDOG</a></li>
                            </ul>
                            <div class="right-menu inputWithIcon">
                                <input type="text" class="search-click" name="" setValues={props.setValues} placeholder="search here..." />
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                    </nav>
                </nav>
    )
}
export default Category;