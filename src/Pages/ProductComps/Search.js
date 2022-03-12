import axios from "axios";
import { useState } from "react";
import "../../CSS/Search.css";
import { decryptJSON, encryptJSON} from "../EncryptionDecryption";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Search = (props) =>{
    const [v, setV] = useState("");
    const search = (value) =>{
        axios.post(process.env.REACT_APP_APIURL+"search",
        encryptJSON({
            reference: "products",
            data: "title",
            value: value
        })).then((resp)=>{
            resp.data = decryptJSON(resp.data.data)
            if(!resp.data.error){
                if(resp.data.search){
                    props.setValues(resp.data.data);
                    history.push("/products")
                }
            }
        })
    }
    const history = useHistory();
    return(
        <div className="right-menu">
        {/* <div className="s-container"> */}
            <div className="search-box">
                <input type="text" className="search-input" placeholder="Search.." onChange={(e)=>setV(e.target.value)}/>
                <button className="search-button" onClick={()=>search(v)}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        {/* </div> */}
    </div>
    )
}

export default Search;