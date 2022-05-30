import '../../CSS/home.css'
import '../../CSS/Products.css'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { decrypt, decryptJSON, encryptJSON } from '../EncryptionDecryption'
import socket from '../../socket'
import Popup from '../../Components/Popup.js'
function Products(props) {
  const [products, setProducts] = useState([])
  const [itemNum, setItemNum] = useState({})
  const [state, setState] = useState(false)
  const [message, setMessage] = useState({ added: false, message: '' })
  const [key, setKey] = useState('')
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [dataSent, setDataSent] = useState([])
  const ref = useRef()

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
    if (!props.featured) ref.current.scrollIntoView({ behavior: 'smooth' })

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
        val[decrypt(resp.data.data[i][0])] = {
          adv: null,
          num: 1,
          date: null,
        }
      }
      setItemNum(val)
      setProducts(resp.data.data)

      setLoading(false)
    }

    if (props.featured)
      socket.on('featured', (data) => {
        setDataSent(data)
      })
    else
      socket.on('products', (data) => {
        setDataSent(data)
      })
  }, [])

  React.useEffect(() => {
    if (dataSent.length > 0) {
      let val = Object.keys(itemNum).length > 0 ? { ...itemNum } : {}

      for (let i in dataSent) {
        val[decrypt(dataSent[i][0])] = itemNum[decrypt(dataSent[i][0])]
          ? itemNum[decrypt(dataSent[i][0])]
          : {
              adv: null,
              num: 1,
              date: null,
            }
      }
      setItemNum(val)
      setProducts(dataSent)
      setDataSent([])
    }
  }, [dataSent])

  React.useEffect(async () => {
    if (props.login) {
      const resp2 = await axios.get(
        process.env.REACT_APP_APIURL +
          `cartItem?data=${JSON.stringify(
            encryptJSON({
              id: localStorage.getItem('id'),
            })
          )}`
      )
      resp2.data = decryptJSON(resp2.data.data)
      setCartItems(resp2.data.data)
      socket.emit(`userinfocart`, localStorage.getItem('id'))
      socket.on(`cart/${decrypt(localStorage.getItem('id'))}`, (data) => {
        setCartItems(data)
      })
    }
  }, [props.login])

  React.useEffect(() => {
    if (!props.featured) {
      let val = {}
      for (let i in props.value) {
        val[decrypt(props.value[i][0])] = {
          adv: null,
          num: 1,
          date: null,
        }
      }
      setItemNum(val)
      setProducts(props.value)
    }
  }, [props.value])
  const addCart = (id) => {
    if (localStorage.getItem('id') !== null) {
      if (itemNum[decrypt(id)].date === null && itemNum[decrypt(id)].adv) {
        setKey(id)
        setMessage({ added: false, message: 'Please select a date!' })
      } else {
        axios
          .post(
            process.env.REACT_APP_APIURL + 'newaddcart',
            encryptJSON({
              id: localStorage.getItem('id'),
              cartid: id,
              amount: itemNum[decrypt(id)].num,
              date: itemNum[decrypt(id)].date,
              adv: itemNum[decrypt(id)].adv,
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
  }

  const selectOrder = (e, id, select) => {
    e.preventDefault()
    itemNum[decrypt(id)].num = 1
    itemNum[decrypt(id)].date = null
    itemNum[decrypt(id)].adv = select
    setMessage({ added: false })
    setKey('')
    setState(!state)
  }

  const editQty = (e, id, x) => {
    e.preventDefault()

    if (x < 1) {
      itemNum[decrypt(id)].num = 1
    } else if (x > 100) {
      itemNum[decrypt(id)].num = 100
    } else {
      itemNum[decrypt(id)].num = parseInt(x)
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
          ref={ref}
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
        <section className="p-div-forbg-clr" ref={ref}>
          {products.length ? (
            <div className="product-container">
              {products.map((data, index) => {
                return data[1][props.type]
                  .toLowerCase()
                  .includes(props.search.toLowerCase()) ||
                  props.search.length <= 0 ? (
                  <div className="product-box" key={index}>
                    {/* <!-- discount --> */}
                    {data[1].discount > 0 ? (
                      <span className="p-discount">
                        {data[1].discount}% Off Discount
                      </span>
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
                        {/* <div className="p-overlay"></div> */}
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
                      <div className="p-box-text">
                        <div className="ind-container">
                          <span className="p-adv-indicator">Advanced Cart</span>
                          <span className="p-ord-indicator">
                            Order Now Cart
                          </span>
                        </div>
                      </div>
                      {/* <!-- text --> */}

                      {/* {console.log(data[0], cartItems)} */}
                      {/* <!-- title --> */}
                      {cartItems.includes(decrypt(data[0])) ? (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          In cart
                        </span>
                      ) : null}

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
                    </div>{' '}
                    {itemNum[decrypt(data[0])].adv !== null ? (
                      <>
                        <div className="adv-btn">
                          <a
                            style={{
                              cursor: 'pointer',
                              backgroundColor: 'red',
                              border: 'none',
                              padding: '2px',
                              paddingLeft: '5px',
                              paddingRight: '5px',
                            }}
                            className="advance-btn"
                            onClick={(e) => selectOrder(e, data[0], null)}
                          >
                            Cancel
                          </a>
                        </div>
                        <p
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            width: '100%',
                          }}
                        >
                          Add to{' '}
                          {itemNum[decrypt(data[0])].adv === true
                            ? 'Advance Order'
                            : 'Order Now'}
                        </p>
                      </>
                    ) : null}
                    {itemNum[decrypt(data[0])].adv === true ? (
                      <select
                        className="form-control alterationTypeSelect"
                        style={{
                          width: '90%',
                          height: '35px',
                          marginLeft: '5%',
                          marginRight: '5%',
                        }}
                        onChange={(e) =>
                          e.target.value === 'Select available dates'
                            ? (itemNum[decrypt(data[0])].date = null)
                            : (itemNum[decrypt(data[0])].date = e.target.value)
                        }
                      >
                        <option disabled="" value={null}>
                          Select available dates
                        </option>
                        {data[1].adv
                          ? Object.keys(data[1].adv).map((d, i) => (
                              <option disabled="" key={i}>
                                {new Date(data[1].adv[d].date).toDateString()}
                              </option>
                            ))
                          : null}
                      </select>
                    ) : null}
                    {/* <br /> */}
                    {/* order now and advance order button */}
                    {itemNum[decrypt(data[0])].adv === null ? (
                      <>
                        <p
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            fontWeight: 500,
                          }}
                        >
                          Add to:
                        </p>
                        {data[1].adv ? (
                          Object.keys(data[1].adv).length > 0 ? (
                            <div className="ord-conts">
                              <div className="ord-btn">
                                <a
                                  style={{ cursor: 'pointer' }}
                                  className="order-now-btn"
                                  onClick={(e) =>
                                    selectOrder(e, data[0], false)
                                  }
                                >
                                  Order Now
                                </a>
                              </div>

                              <div className="adv-btn">
                                <a
                                  style={{ cursor: 'pointer' }}
                                  className="advance-btn"
                                  onClick={(e) => selectOrder(e, data[0], true)}
                                >
                                  Advance Order
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="ord-btn">
                              <a
                                style={{ cursor: 'pointer' }}
                                className="order-now-btn"
                                onClick={(e) => selectOrder(e, data[0], false)}
                              >
                                Order Now
                              </a>
                            </div>
                          )
                        ) : (
                          <div className="ord-btn">
                            <a
                              style={{ cursor: 'pointer' }}
                              className="order-now-btn"
                              onClick={(e) => selectOrder(e, data[0], false)}
                            >
                              Order Now
                            </a>
                          </div>
                        )}
                      </>
                    ) : null}
                    {itemNum[decrypt(data[0])].adv !== null ? (
                      <>
                        <div className="price-buy">
                          {/* quantity adjustment experiment*/}

                          <div>
                            <p className="q-btn">
                              {/* value={"-"} */}
                              <button
                                className="qtyminus"
                                onClick={(e) =>
                                  editQty(
                                    e,
                                    data[0],
                                    (itemNum[decrypt(data[0])].num -= 1)
                                  )
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="qty-int"
                                readOnly={true}
                                name="qty"
                                value={itemNum[decrypt(data[0])].num}
                                onChange={(e) =>
                                  editQty(e, data[0], parseInt(e.target.value))
                                }
                              />
                              {/* {console.log(data[0])} */}
                              {/* value={"+"} */}
                              <button
                                className="qtyplus"
                                onClick={(e) =>
                                  editQty(
                                    e,
                                    data[0],
                                    (itemNum[decrypt(data[0])].num += 1)
                                  )
                                }
                              >
                                +
                              </button>
                            </p>
                          </div>

                          {/* right */}

                          <div id="div2">
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
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : null
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
                        <span className="p-discount">
                          {data[1].discount}% Off Discount
                        </span>
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
                      {cartItems.includes(decrypt(data[0])) ? (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          In cart
                        </span>
                      ) : null}
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
                        </div>{' '}
                        <center>
                          {itemNum[decrypt(data[0])].adv !== null ? (
                            <>
                              <div className="adv-btn">
                                <a
                                  style={{
                                    cursor: 'pointer',
                                    backgroundColor: 'red',
                                    border: 'none',
                                    padding: '2px',
                                    paddingLeft: '5px',
                                    paddingRight: '5px',
                                  }}
                                  className="advance-btn"
                                  onClick={(e) => selectOrder(e, data[0], null)}
                                >
                                  Cancel
                                </a>
                              </div>
                              <p
                                style={{
                                  textAlign: 'center',
                                  justifyContent: 'center',
                                  width: '100%',
                                }}
                              >
                                Add to{' '}
                                {itemNum[decrypt(data[0])].adv === true
                                  ? 'Advance Order'
                                  : 'Order Now'}
                              </p>
                            </>
                          ) : null}
                          {itemNum[decrypt(data[0])].adv === true ? (
                            <select
                              className="form-control alterationTypeSelect"
                              style={{
                                width: '90%',
                                height: '35px',
                                marginLeft: '5%',
                                marginRight: '5%',
                              }}
                              onChange={(e) =>
                                e.target.value === 'Select available dates'
                                  ? (itemNum[decrypt(data[0])].date = null)
                                  : (itemNum[decrypt(data[0])].date =
                                      e.target.value)
                              }
                            >
                              <option disabled="" value={null}>
                                Select available dates
                              </option>
                              {data[1].adv
                                ? Object.keys(data[1].adv).map((d, i) => (
                                    <option disabled="" key={i}>
                                      {new Date(
                                        data[1].adv[d].date
                                      ).toDateString()}
                                    </option>
                                  ))
                                : null}
                            </select>
                          ) : null}
                          {/* <br /> */}
                          {/* order now and advance order button */}
                          {itemNum[decrypt(data[0])].adv === null ? (
                            <>
                              <p
                                style={{
                                  textAlign: 'center',
                                  justifyContent: 'center',
                                  width: '100%',
                                  fontWeight: 500,
                                }}
                              >
                                Add to:
                              </p>
                              {data[1].adv ? (
                                Object.keys(data[1].adv).length > 0 ? (
                                  <div className="featured-ord-conts">
                                    <div className="featured-ord-btn">
                                      <a
                                        style={{ cursor: 'pointer' }}
                                        className="featured-order-now-btn"
                                        onClick={(e) =>
                                          selectOrder(e, data[0], false)
                                        }
                                      >
                                        Order Now
                                      </a>
                                    </div>

                                    <div className="featured-adv-btn">
                                      <a
                                        style={{ cursor: 'pointer' }}
                                        className="featured-advance-btn"
                                        onClick={(e) =>
                                          selectOrder(e, data[0], true)
                                        }
                                      >
                                        Advance Order
                                      </a>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="featured-ord-btn">
                                    <a
                                      style={{ cursor: 'pointer' }}
                                      className="featured-order-now-btn"
                                      onClick={(e) =>
                                        selectOrder(e, data[0], false)
                                      }
                                    >
                                      Order Now
                                    </a>
                                  </div>
                                )
                              ) : (
                                <div className="featured-ord-btn">
                                  <a
                                    style={{ cursor: 'pointer' }}
                                    className="featured-order-now-btn"
                                    onClick={(e) =>
                                      selectOrder(e, data[0], false)
                                    }
                                  >
                                    Order Now
                                  </a>
                                </div>
                              )}
                            </>
                          ) : null}
                          {itemNum[decrypt(data[0])].adv !== null ? (
                            <>
                              <div className="price-buy">
                                {/* quantity adjustment experiment*/}

                                <div>
                                  <p className="q-btn">
                                    {/* value={"-"} */}
                                    <button
                                      className="qtyminus"
                                      onClick={(e) =>
                                        editQty(
                                          e,
                                          data[0],
                                          (itemNum[decrypt(data[0])].num -= 1)
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      type="number"
                                      className="qty-int"
                                      readOnly={true}
                                      name="qty"
                                      value={itemNum[decrypt(data[0])].num}
                                      onChange={(e) =>
                                        editQty(
                                          e,
                                          data[0],
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                    {/* {console.log(data[0])} */}
                                    {/* value={"+"} */}
                                    <button
                                      className="qtyplus"
                                      onClick={(e) =>
                                        editQty(
                                          e,
                                          data[0],
                                          (itemNum[decrypt(data[0])].num += 1)
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </p>
                                </div>

                                {/* right */}

                                <div id="div2">
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
                                </div>
                              </div>
                            </>
                          ) : null}
                        </center>
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
