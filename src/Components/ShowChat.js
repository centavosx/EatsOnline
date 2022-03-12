import React, { useState } from 'react';
import "../CSS/Goback.css";
import axios from 'axios';
import { decrypt, decryptJSON, encrypt, encryptJSON } from "../Pages/EncryptionDecryption.js";

const ShowChat = (props) =>{
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  React.useEffect(()=>{
    axios.post(process.env.REACT_APP_APIURL+"chat", encryptJSON({
      id: localStorage.getItem("id"),
      what: "get"
    })).then((response)=>{
        response.data = decryptJSON(response.data.data)
        setChat(response.data.data);
    })
  }, [chat]);

  const send = () =>{
    setSending(true);
    axios.post(process.env.REACT_APP_APIURL+"chat", encryptJSON({
      id: localStorage.getItem("id"),
      message: message,
      what: "post"
    })).then((response)=>{
        setSending(false);
        setMessage("");
    })
  }
    return(
        <div className="messenger_dd" style={{display: 'block'}}>
          <ul className="messenger_ul">
            <li className="messenger_li">
              
              <a className="profilemsg" href={void(0)}>
                <div className="msgcontainer">
                  <div className="msgheader">
                    <div className="msgheader-img">
                      <img src={"../../../assets/EOLogo_TransparentBG.png"}/>
                    </div>
                    <div className="msgactive">
                      <h4>EATS Online</h4>
                      <h6></h6>
                    </div>
                    <div className="msgheader-icon">
                      <i className="fas fa-window-minimize"></i>
                    </div>
                  </div>

                  <div className="chat-page">
                    <div className="msg-inbox">
                        <div className="chats">
                            <div className="msg-page">
                              {chat.map((data, index)=>{
                                if(data[1].who == "user"){
                                  return(
                                    <div className="outgoing-chats" key={index}>
                                      <div className="outgoing-msg">
                                            <p>{data[1].message}</p>
                                            <span className="time">{new Date(data[1].date).toDateString()} {new Date(data[1].date).toLocaleTimeString()}</span>
                                      </div>
                                      <div className="outgoing-msg-img">
                                        <img src={"../../../assets/EOLogo_TransparentBG.png"}/>
                                      </div>
                                  </div>
                                  );
                                }else{
                                  return(
                                    <div className="received-chats">
                                    <div className="received-msg-img">
                                      <img src={"../../../assets/EOLogo_TransparentBG.png"}/>
                                    </div>
                                    <div className="received-msg">
                                      <div className="received-msg-inbox">
                                          <p>{data[1].message}</p>
                                            <span className="time">{new Date(data[1].date).toDateString()} {new Date(data[1].date).toLocaleTimeString()}</span>
                                      </div>
                                    </div>
                                </div>
                                  );
                                }
                              })}
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="msg-bottom">
                    <div className="msg-input-group">
                      <input type="text" className="msg-form-control" placeholder="Write a message..." value={message} onChange={(e)=>setMessage(e.target.value)}/>
                      <div className="input-group-append" >
                        {!sending?
                          <span className="msg-input-group-text" onClick={()=>send()}><i className="fas fa-paper-plane"></i></span>:null}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            
          </ul>
        </div>
    )

}

export default ShowChat;