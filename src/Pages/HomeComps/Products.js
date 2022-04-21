import '../../CSS/home.css'
import '../../CSS/Products.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
function Products(props) {
  const [products, setProducts] = useState([])
  const [itemNum, setItemNum] = useState({})
  const [state, setState] = useState(false)
  const [message, setMessage] = useState({ added: false, message: '' })
  const [key, setKey] = useState('')
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const search = async (value, what) => {
    const resp = await axios.get(
      process.env.REACT_APP_APIURL +
        `search?data=${JSON.stringify(
          encryptJSON({
            reference: 'products',
            data: what,
            value: value,
          })
        )}`
    )
    resp.data = decryptJSON(resp.data.data)
    if (!resp.data.error) {
      if (resp.data.search) {
        let val = {}
        for (let i in resp.data.data) {
          val[resp.data.data[i][0]] = 1
        }
        setItemNum(val)
        setProducts(resp.data.data)
        setLoading(false)
      }
    }
  }
  React.useEffect(() => {
    if (products.length > 0 && props.featured) {
      const script = document.createElement('script')
      script.src = './assets/dist/js/glider.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [products])
  React.useEffect(async () => {
    if (props.search.length > 0 && !props.featured) {
      await search(props.search[1], props.search[0])
    } else {
      const resp = await axios.get(
        process.env.REACT_APP_APIURL +
          `getData?data=${JSON.stringify(
            encryptJSON({
              reference: 'products',
              sortwhat: props.sortwhat,
              index: props.featured
                ? [0, props.max]
                : props.index !== null
                ? props.index
                : null,
            })
          )}`
      )
      resp.data = decryptJSON(resp.data.data)
      if (!resp.data.error) {
        let val = {}
        for (let i in resp.data.data) {
          val[resp.data.data[i][0]] = 1
        }
        setItemNum(val)
        setProducts(resp.data.data)
        setLoading(false)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!props.featured) {
      let val = {}
      for (let i in props.value) {
        val[props.value[i][0]] = 1
      }
      setItemNum(val)
      setProducts(props.value)
    }
  }, [props.value])
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
      <label
        htmlFor={'star-' + index + 1}
        title={index + 1 + ' stars'}
        key={index}
      >
        <i className="active fa fa-star" aria-hidden="true">
          {data}
        </i>
      </label>
    ))
  }
  // const nextOrBack = (c) => {
  //   c
  // }
  if (!props.featured) {
    if (loading) {
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
          {products.length ? (
            <div className="product-container">
              {products.map((data, index) => {
                return (
                  <div className="product-box" key={index}>
                    {/* <!-- discount --> */}
                    {data[1].discount > 0 ? (
                      <span className="p-discount">{data[1].discount}%</span>
                    ) : null}
                    {/* <!-- img container --> */}
                    <div className="f-img-container">
                      <div className="f-img">
                        <a href={'/menu?id=' + data[0]}>
                          <img
                            src={data[1].link}
                            className="p-img-front"
                            alt={data[1].imgname}
                          />
                        </a>
                        <div className="p-overlay"></div>
                        <a className="s-button" href={'/menu?id=' + data[0]}>
                          <div
                            href={void 0}
                            style={{ color: 'white', cursor: 'pointer' }}
                          >
                            {' '}
                            view{' '}
                          </div>
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
                                <label htmlFor={'star-1'}>No Ratings</label>
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
                            message.added
                              ? {
                                  color: 'green',
                                  marginTop: '10px',
                                  fontWeight: '600',
                                }
                              : {
                                  color: 'red',
                                  marginTop: '10px',
                                  fontWeight: '600',
                                }
                          }
                        >
                          "{message.message}"
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <br />
                    <div className="price-buy">
                      {/* quantity adjustment experiment*/}

                      <div>
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
                            readOnly={true}
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
                              itemNum[data[0]] < data[1].numberofitems
                                ? editQty(e, data[0], (itemNum[data[0]] += 1))
                                : null
                            }
                          >
                            +
                          </button>
                        </p>
                      </div>

                      {/* right */}

                      <div id="div2">
                        {data[1].numberofitems > 0 ? (
                          <a
                            style={{ cursor: 'pointer' }}
                            className="prd-btn"
                            onClick={() =>
                              props.login
                                ? addCart(data[0])
                                : history.push('/login')
                            }
                          >
                            <h6 className="add-to">add to cart</h6>
                          </a>
                        ) : (
                          <p className="out">OUT OF STOCK</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="product-container">No items to display</div>
          )}
        </section>
      )
    }
  } else {
    return (
      // <div classNameName="album py-5 bg-light">
      products.length > 0 ? (
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
                      {data[1].discount > 0 ? (
                        <span className="p-discount">{data[1].discount}%</span>
                      ) : null}
                      {/* <!-- img container --> */}
                      <div
                        className="f-img-container"
                        onClick={() =>
                          (window.location.href = '/menu?id=' + data[0])
                        }
                      >
                        <div className="f-img">
                          <a href={void 0}>
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
                                <label htmlFor={'star-1'}>No Ratings</label>
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
                                  ? {
                                      color: 'green',
                                      marginTop: '10px',
                                      fontWeight: '600',
                                    }
                                  : {
                                      color: 'red',
                                      marginTop: '10px',
                                      fontWeight: '600',
                                    }
                              }
                            >
                              {message.message}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                        <br />
                        <div className="btn-price">
                          {data[1].numberofitems > 0 ? (
                            <a
                              href={void 0}
                              className="p-buy-btn"
                              onClick={() =>
                                props.login
                                  ? addCart(data[0])
                                  : history.push('/login')
                              }
                            >
                              ADD TO CART
                            </a>
                          ) : (
                            <p className="out"> OUT OF STOCK</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      ) : null
      // </div>
    )
  }
}
export default Products
