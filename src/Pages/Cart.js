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

    const [width, setWidth] = useState({width: '0%'});
    const [progress, setProgress ]= useState(["progress-step progress-step-active", "progress-step","progress-step"]);

    return(
      <main>
        <Carousel />
        <Progress width={width} progress={progress}/>
   
        <CartList setWidth={setWidth} width={width} setProgress={setProgress}/>
        
        <Goback />

        {/* <SelectOrder/> */}    
         </main> 
    )
}
export default Cart;