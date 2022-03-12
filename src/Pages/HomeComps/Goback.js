import React, { useState } from 'react';
import "../../CSS/Goback.css";


function Goback(){
   
    
    window.onscroll = function() {
        scrollFunction();
    };
    
    function scrollFunction() {
        const mybutton = document.getElementById("myBtn");
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    return(
    <div>
        <button onClick={()=>topFunction()} id="myBtn" title="Go to top">
        <a href={void(0)} id="return-to-top">
          <i className="fa-solid fa-chevron-up"></i>
        </a>
        </button>
        {/* <div>
        <button id="msgBtn" title="Chat feature">
        <a href={void(0)} id="messenger">
          <img src={'../../assets/EOLogo_TransparentBG.png'}></img>
        </a>
        <div className="messenger_dd" style={{display: 'block'}}>
          <ul className="messenger_ul">
            <li className="messenger_li">
              <a className="profilemsg" href="#">
                <div className="msgcontainer">
                  <div className="msgheader">
                    <div className="msgheader-img">
                      <img src={"https://oliver-andersen.se/wp-content/uploads/2018/03/cropped-Profile-Picture-Round-Color-300x300.png"}/>
                    </div>
                    <div className="msgactive">
                      <h4>Name</h4>
                      <h6>3 hours ago..</h6>
                    </div>
                    <div className="msgheader-icon">
                      <i className="fas fa-window-minimize"></i>
                    </div>
                  </div>

                  <div className="chat-page">
                    <div className="msg-inbox">
                        <div className="chats">
                            <div className="msg-page">

                                <div className="received-chats">
                                    <div className="received-msg-img">
                                      <img src={"https://oliver-andersen.se/wp-content/uploads/2018/03/cropped-Profile-Picture-Round-Color-300x300.png"}/>
                                    </div>
                                    <div className="received-msg">
                                      <div className="received-msg-inbox">
                                          <p>Hi!! Hotdog nga po yung tig lilimang piso pag wala ediwag</p>
                                          <span className="time">11:01 PM | March 02</span>
                                      </div>
                                    </div>
                                </div>

                                <div className="outgoing-chats">
                                    <div className="outgoing-msg">
                                          <p>Hi!! Hotdog nga po yung tig lilimang piso pag wala ediwag</p>
                                          <span className="time">11:01 PM | March 02</span>
                                    </div>
                                    <div className="outgoing-msg-img">
                                      <img src={"../../../assets/EOLogo_TransparentBG.png"}/>
                                    </div>
                                </div>
                                
                                <div className="received-chats">
                                    <div className="received-msg-img">
                                      <img src={"https://oliver-andersen.se/wp-content/uploads/2018/03/cropped-Profile-Picture-Round-Color-300x300.png"}/>
                                    </div>
                                    <div className="received-msg">
                                      <div className="received-msg-inbox">
                                          <p>Hi!! Hotdog nga po yung tig lilimang piso pag wala ediwag</p>
                                          <span className="time">11:01 PM | March 02</span>
                                      </div>
                                    </div>
                                </div>

                                <div className="outgoing-chats">
                                    <div className="outgoing-msg">
                                          <p>Hi!! Hotdog nga po yung tig lilimang piso pag wala ediwag</p>
                                          <span className="time">11:01 PM | March 02</span>
                                    </div>
                                    <div className="outgoing-msg-img">
                                      <img src={"../../../assets/EOLogo_TransparentBG.png"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="msg-bottom">
                    <div className="msg-input-group">
                      <input type="text" className="msg-form-control" placeholder="Write a message..." />
                      <div className="input-group-append">
                          <span className="msg-input-group-text"><i className="fas fa-paper-plane"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            
          </ul>
        </div>
        </button>
        </div> */}
    </div>
    
    );
}
export default Goback;