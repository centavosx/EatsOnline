import React, {useState} from 'react'
// import styles from "../CSS/CartList.css";
import Carousel from './HomeComps/Carousel.js';
import CartList from "./CartComps/CartList.js"
import Goback from "./HomeComps/Goback.js"

import SelectOrder from './CartComps/SelectOrder.js';
import Progress from './CartComps/Progress.js';

const Cart = (props) => {
    

    React.useEffect(()=>{
        localStorage.setItem("page", "cartlist");
    }, [])



    return(
      <main>
        <Carousel />
        <Progress/>
   
        <CartList />
        
        <Goback />

        {/* <SelectOrder/> */}    
         </main> 
    )
}
export default Cart;