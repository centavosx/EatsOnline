import React, { useState } from 'react';
import ShowChat from "./ShowChat.js";
import "../CSS/Goback.css";



const Chat = (props) =>{
    const [show, setShow] = useState(false);
    return(
        <div>
        <button onClick={()=>setShow(!show)}id="msgBtn" title="Chat feature">
        <a href={void(0)} id="messenger">
          <img src={'../../assets/EOLogo_TransparentBG.png'}></img>
        </a>
        </button>
        {show?
        <ShowChat/>:null}
       
        
        </div>

    )

}

export default Chat;