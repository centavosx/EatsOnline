import React, { useState } from 'react'

import Carousel from './HomeComps/Carousel.js'
import Products from './HomeComps/Products.js'
import Category from './ProductComps/Category.js'
import Goback from './HomeComps/Goback.js'
import SingleProduct from './ProductComps/SingleProduct.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
const Menu = (props) =>{
    const [values, setValues] = useState([]);
    const [params, setParams] = useState(null)
    const [loading, setLoading] = useState(false);
    React.useEffect(()=>{
        
        let val = new URLSearchParams(window.location.search).get("id");
        if(val!==null){
            setParams(val.replaceAll(" ", "+"))
        }else{
            setParams(null)
        }
        localStorage.setItem("page", "menu");
    })
    return(
    <main>
        <Carousel />
        <Category setValues={setValues} setLoading={setLoading}/>
        <div style={{width: '100%', margin: 'auto'}}>
        {
            params!==null?
                <SingleProduct/>
            :
                <Products afeatured={false} sortwhat={"totalsold"} value={values} setLoading={setLoading} loading={loading}/>
        }
       
            {/* <Router>
                <Switch>
                    <Route path="/products?id=:id" render={(props) => (<SingleProduct {...props}/>)} />
                    <Route path="/products" render={(props) => (<Products {...props} featured={false} sortwhat={"totalsold"} value={values}/>)} />
                </Switch>
            </Router> */}
            {/* <Products featured={false} sortwhat={"totalsold"} value={values} set={props.setSingle}/>
            <SingleProduct set={props.setSingle}/> */}
        </div>
        <Goback />
    </main>
    );
}
export default Menu;