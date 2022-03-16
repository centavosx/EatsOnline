import axios from 'axios';
import React, {useState} from 'react'
import "../../CSS/Category.css";
import "../../CSS/Search.css";
import Search from "../ProductComps/Search.js"
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
function Category(props){
    const [cat, setCat] = useState([]);

    React.useEffect(()=>{   
        axios.get(process.env.REACT_APP_APIURL+"category").then((resp)=>{
            resp.data = decryptJSON(resp.data.data)
            setCat(resp.data.data);
        })
    }, [])

    const search = (value, what) =>{
        props.setLoading(true);
        axios.post(process.env.REACT_APP_APIURL+"search",
        encryptJSON({
            reference: "products",
            data: what,
            value: value
        })).then((resp)=>{
            resp.data = decryptJSON(resp.data.data)
            if(!resp.data.error){
                if(resp.data.search){
                    props.setValues(resp.data.data);
                    // history.push("/products")
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
                <li className="shop" onClick={()=>search("", "type")}><a href={void(0)}>All</a></li>
                    {cat.map((data, index)=> <li className="shop" key={index} onClick={()=>search(data, "type")} style={{cursor:'pointer'}}><a href={void(0)}>{data}</a></li>)}
                </ul>
                <Search setValues={props.setValues} search = {search}/>
            </div>
        </nav>
    </nav>
    )
}
export default Category;