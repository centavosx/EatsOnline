import React, {useState} from 'react'
import '../CSS/Notification.css'
const Notification = (props) => {
    const [show, setShow] =useState(false);
    return(
        <div className="notifications">
            <div className="icon_wrap">
                <i class="far fa-bell" onClick={()=>setShow(!show)}></i>
            </div>
            {show?
            <div className="notification_dd" style={{display:"block"}}>
                <ul className="notification_ul">
                    <li className="success starbucks">
                        <div className="notify_icon">
                            <span className="icon"></span>
                        </div>
                        <div className="notify_data">
                            <div class="notif_title">
                                Eats Online Admin
                            </div>
                            <div className="sub_title">
                                Lorem ipsum dolor sit amet, consectetur.
                            </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>
                        </div>
                    </li>
                    <li className="delivery baskin_robbins">
                        <div className="notify_icon">
                            <span class="icon"></span>
                        </div>
                        <div className="notify_data">
                            <div class="notif_title">
                                Eats Online Admin
                            </div>
                            <div className="sub_title">
                                Lorem ipsum dolor sit amet, consectetur.
                            </div>
                        </div>
                        <div className="notify_status">
                            <p>Delivering</p>
                        </div>
                    </li>
                    <li className="failed mcd">
                        <div className="notify_icon">
                            <span class="icon"></span>
                        </div>
                        <div className="notify_data">
                            <div class="notif_title">
                                Eats Online Admin
                            </div>
                            <div className="sub_title">
                                Lorem ipsum dolor sit amet, consectetur.
                            </div>
                        </div>
                        <div className="notify_status">
                            <p>Failed</p>
                        </div>
                    </li>
                    <li className="pending pizza_hut">
                        <div className="notify_icon">
                            <span class="icon"></span>
                        </div>
                        <div className="notify_data">
                            <div class="notif_title">
                                Eats Online Admin
                            </div>
                            <div className="sub_title">
                                Lorem ipsum dolor sit amet, consectetur.
                            </div>
                        </div>
                        <div className="notify_status">
                            <p>Pending</p>
                        </div>
                    </li>
                    <li className="success kfc">
                        <div className="notify_icon">
                            <span class="icon"></span>
                        </div>
                        <div className="notify_data">
                            <div class="notif_title">
                                Eats Online Admin
                            </div>
                            <div className="sub_title">
                                Lorem ipsum dolor sit amet, consectetur.
                            </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>
                        </div>
                    </li>
                    <li className="show_all">
                        <p className="link">Show All Activities</p>
                    </li>
                </ul>
            </div>:null}
        </div>
    )
}
export default Notification;