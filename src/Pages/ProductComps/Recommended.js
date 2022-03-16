import React, { useState } from 'react'

const Recommended = (props) => {
    return (
        <div className="s-recommended">
            RECOMMENDED ITEMS
            {/* <section className="p-slider">
                {/* <!-- heading --> 
                <h3 className="product-slider-heading">Featured Products</h3>
                {/* <!-- Btns -->
                <div className="slider-btns">
                    <button aria-label="Previous" className="glider-prev">{'<'}
                    </button>
                    <button aria-label="Next" className="glider-next">{'>'}
                    </button>
                </div>
                <div className="glider-contain">
                    <div className="glider">
                        {/* <!-- Product box --> 
                        {products.map((data, i) => {
                            return (
                                <div key={i} className="product-box">
                                    {/* <!-- discount --> 
                                    <span className="p-discount">-{data[1].discount}%</span>
                                    {/* <!-- img container --> 
                                    <div className="p-img-container">
                                        <div className="p-img" >
                                            <Link to={"/products?id=" + data[0]}>
                                                <img src={data[1].link} className="p-img-front" alt={data[1].imgname} />
                                            </Link>
                                        </div>
                                    </div>
                                    {/* <!-- text --> 
                                    <div className="p-box-text">
                                        {/* <!-- title --> 
                                        <a href={void (0)} className="product-title">
                                            {data[1].title}
                                        </a>
                                        {/* <!-- category -->
                                        <div className="product-category">
                                            <span>{data[1].seller}</span>
                                        </div>
                                        {/* <!-- price buy --> 
                                        <div>
                                            {key.length > 0 && key === data[0] ? <p style={message.added ? { color: 'green' } : { color: 'red' }}>{message.message}</p> : <p></p>}
                                        </div>
                                        <div className="price">
                                            <span className="p-price" >₱ {data[1].price}</span>
                                            <a href={void (0)} className="p-buy-btn" onClick={() => addCart(data[0])}>ADD TO CART</a>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}

                    </div>
                </div>
            </section> */}
        </div >
    );
}
export default Recommended;