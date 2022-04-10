import '../../CSS/home.css'
import '../../CSS/Products.css'
import React, { useState } from 'react'
import axios from 'axios'
import {
  decrypt,
  decryptJSON,
  encrypt,
  encryptJSON,
} from '../EncryptionDecryption'
function Products(props) {
  const [products, setProducts] = useState([])
  const [itemNum, setItemNum] = useState({})
  const [state, setState] = useState(false)

  const [message, setMessage] = useState({ added: false, message: '' })
  const [key, setKey] = useState('')
  React.useEffect(() => {
    let val = {}
    for (let i in props.value) {
      val[props.value[i][0]] = 1
    }
    setItemNum(val)
    setProducts(props.value)
    if (!props.featured) props.setLoading(false)
  }, [props.value])

  const search = (value, what) => {
    props.setLoading(true)
    axios
      .post(
        process.env.REACT_APP_APIURL + 'search',
        encryptJSON({
          reference: 'products',
          data: what,
          value: value,
        })
      )
      .then((resp) => {
        resp.data = decryptJSON(resp.data.data)
        if (!resp.data.error) {
          if (resp.data.search) {
            let val = {}
            for (let i in resp.data.data) {
              val[resp.data.data[i][0]] = 1
            }
            setItemNum(val)
            setProducts(resp.data.data)
            props.setLoading(false)
          }
        }
      })
  }

  React.useEffect(() => {
    if (!props.featured) props.setLoading(true)
    if (props.search.length > 0) search(props.search[1], props.search[0])
    else
      axios
        .post(
          process.env.REACT_APP_APIURL + 'getData',
          encryptJSON({
            reference: 'products',
            sortwhat: props.sortwhat,
            index: props.featured
              ? [0, props.max]
              : props.index !== null
              ? props.index
              : null,
          })
        )
        .then((resp) => {
          resp.data = decryptJSON(resp.data.data)
          if (!resp.data.error) {
            let val = {}
            for (let i in resp.data.data) {
              val[resp.data.data[i][0]] = 1
            }
            setItemNum(val)
            setProducts(resp.data.data)
            if (!props.featured) props.setLoading(false)
          }
        })
  }, [])
  React.useEffect(() => {
    if (products.length > 0) {
      const script = document.createElement('script')
      script.src = './assets/dist/js/glider.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [products])
  const addCart = (id) => {
    if (localStorage.getItem('id') !== null) {
      axios
        .post(
          process.env.REACT_APP_APIURL + 'addcart',
          encryptJSON({
            id: localStorage.getItem('id'),
            cartid: id,
            amount: itemNum[id],
          })
        )
        .then((response) => {
          response.data = decryptJSON(response.data.data)

          if (!response.data.error) {
            setKey(id)
            setMessage(response.data)
          }
        })
    }
  }

  const editQty = (e, id, x) => {
    e.preventDefault()
    if (x < 1) {
      itemNum[id] = 1
    } else if (x > 100) {
      itemNum[id] = 100
    } else {
      itemNum[id] = parseInt(x)
    }

    state ? setState(false) : setState(true)
  }

  const showStar = (i) => {
    i == 0 ? (i = 1) : (i = i)
    let proto = []
    for (let v = 0; v < i; v++) {
      proto.push(null)
    }
    return proto.map((data, index) => (
      <label for={'star-' + index + 1} title={index + 1 + ' stars'} key={index}>
        <i className="active fa fa-star" aria-hidden="true">
          {data}
        </i>
      </label>
    ))
  }

  if (!props.featured) {
    if (props.loading) {
      return (
        <div
          className="product-container"
          style={{
            height: '100%',
            padding: '15px',
            backgroundColor: '#F2F36B',
            color: '#000',
          }}
        >
          <h2>Products are loading...</h2>
        </div>
      )
    } else {
      return (
        <section className="p-div-forbg-clr">
          <div className="product-container">
            {/* <!-- Product box --> */}
            {products.map((data, index) => {
              return (
                <div className="product-box" key={index}>
                  {/* <!-- discount --> */}
                  <span className="p-discount">{data[1].discount}%</span>
                  {/* <!-- img container --> */}
                  <div className="f-img-container">
                    <div className="f-img">
                      <a href={'/products?id=' + data[0]}>
                        <img
                          src={data[1].link}
                          className="p-img-front"
                          alt={data[1].imgname}
                        />
                      </a>
                      <div className="p-overlay"></div>
                      <a class="s-button" href={'/products?id=' + data[0]}>
                        <a
                          href={void 0}
                          style={{ color: 'white', cursor: 'pointer' }}
                        >
                          {' '}
                          view{' '}
                        </a>
                      </a>
                    </div>
                  </div>
                  {/* <!-- text --> */}
                  <div className="p-box-text">
                    {/* <!-- title --> */}
                    <a href={void 0} className="product-title">
                      {data[1].title}
                    </a>
                    <div className="rate">
                      {/* right */}
                      <div className="menu-price">
                        <span className="p-price">₱ {data[1].price}</span>
                      </div>
                      {/* left */}
                      <div className="menu-seller">
                        <span>{data[1].seller}</span>
                      </div>
                    </div>

                    <div className="container">
                      <div className="products-btn">
                        <div className="menu-star">
                          <div className="star-rating">
                            {data[1].comments == 0 ? (
                              <label for={'star-1'}>No Ratings</label>
                            ) : (
                              showStar(data[1].comments)
                            )}
                          </div>
                        </div>
                        <div className="menu-sold">
                          <span className="total-sold">
                            {data[1].totalsold} Sold
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="items-qty">
                      <div className="itm-q">
                        <span className="quantity-items">
                          Quantity: <strong>{data[1].numberofitems}</strong>
                        </span>
                      </div>
                    </div>
                    {/* <!-- price buy --> */}
                    <div></div>
                    {key.length > 0 && key === data[0] ? (
                      <p
                        style={
                          message.added ? { color: 'green' } : { color: 'red' }
                        }
                      >
                        {message.message}
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  <div className="price-buy">
                    {/* quantity adjustment experiment*/}

                    <div id="div1">
                      <p className="q-btn">
                        {/* value={"-"} */}
                        <button
                          className="qtyminus"
                          onClick={(e) =>
                            editQty(e, data[0], (itemNum[data[0]] -= 1))
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="qty-int"
                          name="qty"
                          value={itemNum[data[0]]}
                          onChange={(e) =>
                            editQty(e, data[0], parseInt(e.target.value))
                          }
                        />
                        {/* value={"+"} */}
                        <button
                          className="qtyplus"
                          onClick={(e) =>
                            editQty(e, data[0], (itemNum[data[0]] += 1))
                          }
                        >
                          +
                        </button>
                      </p>
                    </div>

                    {/* right */}
                    {props.login ? (
                      <div id="div2">
                        <a
                          style={{ cursor: 'pointer' }}
                          className="prd-btn"
                          onClick={() => addCart(data[0])}
                        >
                          <h6 className="add-to">add to cart</h6>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )
    }
  } else {
    return (
      // <div classNameName="album py-5 bg-light">
      <div className="f-div-forbg-clr">
        <section className="p-slider">
          {/* <!-- heading --> */}
          <h3 className="product-slider-heading">Featured Products</h3>
          {/* <!-- Btns --> */}
          <div className="slider-btns">
            <button aria-label="Previous" className="glider-prev">
              {'<'}
            </button>
            <button aria-label="Next" className="glider-next">
              {'>'}
            </button>
          </div>
          <div className="glider-contain">
            <div className="glider">
              {/* <!-- Product box --> */}
              {products.map((data, i) => {
                return (
                  <div key={i} className="featured-box">
                    {/* <!-- discount --> */}
                    <span className="p-discount">{data[1].discount}%</span>
                    {/* <!-- img container --> */}
                    <div className="f-img-container">
                      <div className="f-img">
                        <a href={'/products?id=' + data[0]}>
                          <img
                            src={data[1].link}
                            className="f-img-front"
                            alt={data[1].imgname}
                          />
                        </a>
                      </div>
                    </div>
                    {/* <!-- text --> */}
                    <div className="f-box-text">
                      <a href={void 0} className="product-title1">
                        {data[1].title}
                        <div className="f-rate">
                          {/* right */}
                          <div className="prod-price">
                            <span className="p-price">₱ {data[1].price}</span>
                          </div>
                          {/* left */}
                          <div className="seller-title1">
                            <span>{data[1].seller}</span>
                          </div>
                        </div>
                      </a>
                      {/* <!-- price buy --> */}

                      <div className="featured-container">
                        {/* <div className="btn"> */}
                        <div id="star-rating1">
                          <div className="star-rating1">
                            {data[1].comments == 0 ? (
                              <label for={'star-1'}>No Ratings</label>
                            ) : (
                              showStar(data[1].comments)
                            )}
                          </div>
                        </div>

                        <div id="total-sold1">
                          <span className="total-sold1">
                            {data[1].totalsold}Sold
                          </span>
                        </div>
                        {/* </div> */}
                      </div>
                      <div>
                        {key.length > 0 && key === data[0] ? (
                          <p
                            style={
                              message.added
                                ? { color: 'green' }
                                : { color: 'red' }
                            }
                          >
                            {message.message}
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                      {props.login ? (
                        <div className="btn-price">
                          {/* <span className="p-price" >₱ {data[1].price}</span> */}
                          <a
                            href={void 0}
                            className="p-buy-btn"
                            onClick={() => addCart(data[0])}
                          >
                            ADD TO CART
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      // </div>
    )
  }
}
export default Products
