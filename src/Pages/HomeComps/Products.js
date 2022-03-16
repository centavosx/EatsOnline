import "../../CSS/home.css";
import "../../CSS/Products.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { decrypt, decryptJSON, encrypt, encryptJSON } from "../EncryptionDecryption";
function Products(props) {
    const [products, setProducts] = useState([]);
    const [itemNum, setItemNum] = useState({});
    const [state, setState] = useState(false);
 
    const [message, setMessage] = useState({ added: false, message: "" });
    const [key, setKey] = useState('');
    React.useEffect(() => {
        let val = {};
        for (let i in props.value) {
            val[props.value[i][0]] = 1;
        }
        setItemNum(val);
        setProducts(props.value);
        props.setLoading(false);
    }, [props.value])

    React.useEffect(() => {
        props.setLoading(true);
        axios.post(process.env.REACT_APP_APIURL + "getData",
            encryptJSON({
                reference: "products",
                sortwhat: props.sortwhat,
                index: props.featured ? [0, props.max] : props.index !== null ? props.index : null
            })).then((resp) => {
                console.log(resp.data)
                resp.data = decryptJSON(resp.data.data)
                if (!resp.data.error) {
                    let val = {};
                    for (let i in resp.data.data) {
                        val[resp.data.data[i][0]] = 1;
                    }
                    setItemNum(val);
                    setProducts(resp.data.data);
                    console.log(resp.data.data)
                    props.setLoading(false)
                }
            })
    }, []);
    React.useEffect(() => {
        if (products.length > 0) {
            const script = document.createElement('script');
            script.src = "./assets/dist/js/glider.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            }
        }
    }, [products])
    const addCart = (id) => {
        if (localStorage.getItem("id") !== null) {
            axios.post(process.env.REACT_APP_APIURL + "addcart", encryptJSON({
                id: localStorage.getItem("id"),
                cartid: id,
                amount: itemNum[id]
            })).then((response) => {
                response.data = decryptJSON(response.data.data)
                console.log(response.data)
                if (!response.data.error) {

                    setKey(id)
                    setMessage(response.data)
                }

            })
        }
    }

    const editQty = (e, id, x) => {
        e.preventDefault();
        if (x < 1) {
            itemNum[id] = 1;
        } else if (x > 100) {
            itemNum[id] = 100;
        } else {
            itemNum[id] = parseInt(x);
        }

        state ? setState(false) : setState(true);
    }

    const showStar = (i) => {
        i == 0 ? i = 1 : i = i
        let proto = []
        for (let v = 0; v < i; v++) {
            proto.push(null);
        }
        return (
            proto.map((data, index) =>
                <label for={"star-" + index + 1} title={index + 1 + " stars"} key={index}>
                    <i className="active fa fa-star" aria-hidden="true">{data}</i>
                </label>
            )

        )
    }

    if (!props.featured) {
        if (props.loading) {
            return (
                <div className="product-container" style={{ height: '100%', padding: '15px', backgroundColor: '#F2F36B', color: '#fff' }}>
                    <h2>Products are loading...</h2>
                </div>)
        } else {
            return (
                <div className="product-container">
                    {/* <!-- Product box --> */}
                    {products.map((data, index) => {
                        return (
                            <div className="product-box" key={index}>
                                {/* <!-- discount --> */}
                                <span className="p-discount">-{data[1].discount}%</span>
                                {/* <!-- img container --> */}
                                <div className="p-img-container">
                                    <div className="p-img">
                                        <img src={data[1].link} className="p-img-front" alt="Front" />
                                        <div className="p-overlay"></div>
                                        <Link class="s-button" to={"/products?id=" + data[0]}>
                                            <a href={void (0)} style={{ color: 'white', cursor: 'pointer' }}> view </a>
                                        </Link>
                                    </div>
                                </div>
                                {/* <!-- text --> */}
                                <div className="p-box-text">
                                    {/* <!-- title --> */}
                                    <a href={void (0)} className="product-title">
                                        {data[1].title}
                                        <div className="rate">
                                             {/* right */}
                                             <div id="div2">
                                                <span className="p-price" >₱ {data[1].price}</span>
                                            </div>
                                            {/* left */}
                                            <div id="div1">
                                                <span>{data[1].seller}</span>
                                            </div>
        

                                        </div>

                                    </a>
                                    <div className="container">
                                        <div className="btn">
                                            <div id="div1">
                                                <div className="star-rating">
                                                    {data[1].comments == 0 ?
                                                        <label for={"star-1"}>
                                                            No Ratings
                                                        </label> :
                                                        showStar(data[1].comments)}
                                                </div>
                                            </div>
                                            <div id="div2">
                                                <span className="total-sold">{data[1].totalsold} Sold</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- price buy --> */}
                                    <div>
                                    </div>
                                    {key.length > 0 && key === data[0] ? <p style={message.added ? { color: 'green' } : { color: 'red' }}>{message.message}</p> : <p></p>}
                                </div>
                                <div className="price-buy">
                                    {/* quantity adjustment experiment*/}

                                    <div id="div1">
                                        <p className="q-btn">
                                            {/* value={"-"} */}
                                            <button className="qtyminus" onClick={(e) => editQty(e, data[0], itemNum[data[0]] -= 1)}>-</button>
                                            <input type="number" className="qty-int" name="qty" value={itemNum[data[0]]} onChange={(e) => editQty(e, data[0], parseInt(e.target.value))} />
                                            {/* value={"+"} */}
                                            <button className="qtyplus" onClick={(e) => editQty(e, data[0], itemNum[data[0]] += 1)}>+</button>
                                        </p>
                                    </div>

                                    {/* right */}
                                    <div id="div2">
                                        <a style={{ cursor: 'pointer' }} className="div2-btn btn-style-one" onClick={() => addCart(data[0])}>
                                            <h6 className="add-to">add to cart</h6>
                                        </a>

                                    </div>
                                </div>
                            </div>


                        )
                    })}
                </div>

            )
        }
    } else {
        return (
            // <div classNameName="album py-5 bg-light">           
            <section className="p-slider">
                {/* <!-- heading --> */}
                <h3 className="product-slider-heading">Featured Products</h3>
                {/* <!-- Btns --> */}
                <div className="slider-btns">
                    <button aria-label="Previous" className="glider-prev">{'<'}
                    </button>
                    <button aria-label="Next" className="glider-next">{'>'}
                    </button>
                </div>
                <div className="glider-contain">
                    <div className="glider">
                        {/* <!-- Product box --> */}
                        {products.map((data, i) => {
                            return (
                                <div key={i} className="product-box">
                                    {/* <!-- discount --> */}
                                    <span className="p-discount">-{data[1].discount}%</span>
                                    {/* <!-- img container --> */}
                                    <div className="f-img-container">
                                        <div className="f-img" >
                                            <Link to={"/products?id=" + data[0]}>
                                                <img src={data[1].link} className="p-img-front" alt={data[1].imgname} />
                                            </Link>
                                        </div>
                                    </div>
                                    {/* <!-- text --> */}
                                    <div className="p-box-text">
                                        {/* <!-- title --> */}
                                        <a href={void (0)} className="product-title">
                                            {data[1].title}
                                        </a>
                                        {/* <!-- category --> */}
                                        <div className="product-category">
                                            <span>{data[1].seller}</span>
                                        </div>
                                        {/* <!-- price buy --> */}
                                        <div>
                                            {key.length > 0 && key === data[0] ? <p style={message.added ? { color: 'green' } : { color: 'red' }}>{message.message}</p> : <p></p>}
                                        </div>
                                        <div className="container">
                                        <div className="btn">
                                            <div id="div1">
                                                <div className="star-rating">
                                                    {data[1].comments == 0 ?
                                                        <label for={"star-1"}>
                                                            No Ratings
                                                        </label> :
                                                        showStar(data[1].comments)}
                                                </div>
                                            </div>
                                            <div id="div2">
                                                <span className="total-sold">{data[1].totalsold}Sold</span>
                                            </div>
                                        </div>
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
            </section>
            // </div>
        )
    }
}
export default Products;