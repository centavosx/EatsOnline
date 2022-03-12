import React, {useState} from 'react'
import Carousel from './HomeComps/Carousel.js';
import SingleProduct from "./ProductComps/SingleProduct.js";
import Goback from "./HomeComps/Goback.js"

const ProdDetails = () => {
    return (
        <main>
            <Carousel />
            <SingleProduct />
            <Goback />
        </main>
    )
}
export default ProdDetails;