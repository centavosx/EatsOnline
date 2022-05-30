import axios from 'axios'
import React, { useState, useRef } from 'react'
import '../../CSS/CartList.css'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
import SelectOrder from './SelectOrder'
import CartConfirmation from './CartConfirmation'
import Checkout from './Checkout'
const CartList = (props) => {
  const [cart, setCart] = useState([])
  const [select, setSelect] = useState({})
  const [totalamount, setTotalAmount] = useState(0)
  const [dataAmt, setdataAmt] = useState({})
  const [state, setState] = useState(false)
  const [use, setUse] = useState(false)
  const [itemsToDelete, setItemsToDelete] = useState([])
  const [what, setWhat] = useState(false)
  const ref = useRef()

  const [data, setData] = useState({
    name: '',
    address: '',
    items: [],
    payment: '',
    totalprice: '',
    userid: localStorage.getItem('id'),
  })

  const [output, setOutput] = useState(props.output)

  React.useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
    setCart([])
    getData(what)
  }, [what])

  const getData = (adv) => {
    if (!('id' in props.output))
      axios
        .get(
          process.env.REACT_APP_APIURL +
            `newcart?data=${JSON.stringify(
              encryptJSON({
                id: localStorage.getItem('id'),
                adv: adv,
              })
            )}`
        )
        .then((resp) => {
          resp.data = decryptJSON(resp.data.data)
          if (!resp.data.error) {
            if (resp.data.success) {
              let obj = {}
              for (let x of resp.data.data) {
                obj[x[0]] = x[1].amount
              }
              document.getElementById('allcheck').checked = false
              setTotalAmount(0)
              setSelect({})
              console.log(resp.data.data)
              setdataAmt(obj)
              setCart(resp.data.data)
            }
          }
        })
  }

  const toContinue = () => {
    if (what) {
      let pass = []
      for (let x of data.items) {
        pass.push('date' in x[1] ? x[1].date.length > 0 : false)
      }
      return !pass.includes(false)
    } else {
      return true
    }
  }
  React.useEffect(() => {
    if (cart.length > 0) {
      const script = document.createElement('script')
      script.src = './assets/dist/js/script.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [cart])

  const showStar = (i) => {
    i === 0 ? (i = 1) : (i = i)
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
  React.useEffect(() => {
    setUse(!use)
  }, [props.width])
  const updateDate = (e, index, date) => {
    e.preventDefault()
    cart[index][1].date = new Date(date).toString()
    fastUpd(cart)
  }
  const update = (e, key2, amt) => {
    e.preventDefault()
    setState(false)
    if (amt < 1) {
      dataAmt[key2] = 1
    } else if (amt > 100) {
      dataAmt[key2] = 100
    } else {
      dataAmt[key2] = parseInt(amt)
    }
    let totalvalue = 0
    let f = {}
    let obj = {}
    let deleteItems = []
    for (let x of cart) {
      x[1].amount = dataAmt[x[0]]
      if (x[0] in select) {
        deleteItems.push(x[0])
        totalvalue +=
          'discount' in x[1]
            ? (x[1].price - (x[1].discount * x[1].price) / 100) * dataAmt[x[0]]
            : x[1].price * dataAmt[x[0]]
        f[x[0]] = x[1]
      }
      obj[x[0]] = dataAmt[x[0]]
    }
    setSelect(f)
    setdataAmt(obj)
    setTotalAmount(totalvalue)
    setItemsToDelete(deleteItems)
    const timer = setTimeout(async () => {
      sendreq(cart)
    }, 1000)
    return () => clearTimeout(timer)
  }
  const fastUpd = (c) => {
    let obj = {}
    for (let x of c) {
      obj[x[0]] = {}
      obj[x[0]].amount = dataAmt[x[0]]
      obj[x[0]].date = x[1].date
      obj[x[0]].key = x[1].key
      obj[x[0]].advance = what
      obj[x[0]].advdate = x[1].date ?? null
    }
    axios.patch(
      process.env.REACT_APP_APIURL + 'newcart',
      encryptJSON({
        id: localStorage.getItem('id'),
        data: obj,
      })
    )
  }
  const sendreq = (c) => {
    setState(true)
    const timer = setTimeout(async () => {
      if (state) {
        let obj = {}
        for (let x of c) {
          obj[x[0]] = {}
          obj[x[0]].amount = dataAmt[x[0]]
          obj[x[0]].date = x[1].date
          obj[x[0]].key = x[1].key
          obj[x[0]].advance = what
          obj[x[0]].advdate = x[1].date ?? null
        }
        axios.patch(
          process.env.REACT_APP_APIURL + 'newcart',
          encryptJSON({
            id: localStorage.getItem('id'),
            data: obj,
          })
        )
      }
    }, 1000)
    return () => clearTimeout(timer)
  }

  const check = (e, id, data) => {
    if (e.target.checked) {
      select[id] = data
      setTotalAmount(
        totalamount +
          ('discount' in data
            ? data.price - (data.discount * data.price) / 100
            : data.price * data.amount)
      )
    } else {
      delete select[id]
      setTotalAmount(
        totalamount -
          ('discount' in data
            ? data.price - (data.discount * data.price) / 100
            : data.price * data.amount)
      )
    }
    let totalvalue = 0
    let count = 0
    let deleteItems = []
    for (let x of cart) {
      if (x[0] in select) {
        deleteItems.push(x[0])
        totalvalue +=
          'discount' in x[1]
            ? (x[1].price - (x[1].discount * x[1].price) / 100) * dataAmt[x[0]]
            : x[1].price * dataAmt[x[0]]
        count++
      }
    }

    if (count >= cart.length) {
      document.getElementById('allcheck').checked = true
    } else {
      document.getElementById('allcheck').checked = false
    }
    setItemsToDelete(deleteItems)
    setSelect(select)
    setTotalAmount(totalvalue)
  }

  const selectAll = (e) => {
    let inputs = document.getElementsByTagName('input')
    let index = 0
    let totalvalue = 0
    let arr = {}
    let deleteItems = []
    for (let v of inputs) {
      if (v.type === 'checkbox') {
        if (index > 0) {
          v.checked = e.target.checked
          if (v.checked) {
            deleteItems.push(cart[index - 1][0])
            arr[cart[index - 1][0]] = cart[index - 1][1]
            totalvalue +=
              'discount' in cart[index - 1][1]
                ? (cart[index - 1][1].price -
                    (cart[index - 1][1].discount * cart[index - 1][1].price) /
                      100) *
                  dataAmt[cart[index - 1][0]]
                : cart[index - 1][1].price * dataAmt[cart[index - 1][0]]
          }
        }
        index += 1
      }
    }
    setItemsToDelete(deleteItems)
    setTotalAmount(totalvalue)
    setSelect(arr)
  }

  const checkOut = () => {
    axios
      .post(
        process.env.REACT_APP_APIURL + 'transact',
        encryptJSON({
          data: data,
          advance: what,
        })
      )
      .then((resp) => {
        resp.data = decryptJSON(resp.data.data)
        if (!resp.data.error) {
          if (resp.data.completed) {
            setOutput(resp.data.data)
            props.setWidth({ width: '100%' })
            props.setProgress([
              'progress-step progress-step-active',
              'progress-step progress-step-active',
              'progress-step progress-step-active',
              'progress-step progress-step-active',
            ])
          } else {
            alert(resp.data.message.map((data) => data + '\n'))
          }
        }
      })
  }
  const deleteReq = async (keys) => {
    let resp = await axios.delete(
      process.env.REACT_APP_APIURL +
        `cart?data=${JSON.stringify(
          encryptJSON({
            id: localStorage.getItem('id'),
            keys,
          })
        )}`
    )
    const val = decryptJSON(resp.data.data)
    if (val.success) return val.data
    else return []
  }
  const deleteItem = async (id) => {
    let data = await deleteReq(id)
    let obj = {}
    for (let x of data) {
      obj[x[0]] = x[1].amount
    }
    setSelect({})
    setTotalAmount(0)
    setdataAmt(obj)
    setCart(data)
    document.getElementById('allcheck').checked = false
  }
  return (
    <form action={void 0} className="form" ref={ref}>
      {/* <!-- Steps --> */}
      {props.width.width === '0%' ? (
        <div className="form-step form-step-active">
          <div>
            {/* {openModal && <Modal closeModal={setOpenModal} />} */}
            <label className="main_cart">
              <div className="all-items-cols">
                <input
                  type="checkbox"
                  className="allcheckbox"
                  id="allcheck"
                  onClick={(e) => selectAll(e)}
                />{' '}
                <strong className="check1">ALL ITEMS</strong>
                &nbsp;
                <button
                  className="cartDel"
                  onClick={(e) => {
                    e.preventDefault()
                    deleteItem(itemsToDelete)
                  }}
                >
                  <i className="fa fa-trash"></i>
                  Delete
                </button>
              </div>
              {/* <br /> */}
              <div className="ord-cols">
                <h1
                  className="method"
                  style={{ width: '100%', margin: 0, marginTop: 10 }}
                >
                  Order Method
                </h1>
                <select
                  className="OrderMethod"
                  style={{ width: 'auto' }}
                  onChange={(e) => setWhat(e.target.value === 'Advance Order')}
                >
                  <option disabled="" selected={!what}>
                    Order Now
                  </option>
                  <option disabled="" selected={what}>
                    Advance Order
                  </option>
                </select>
              </div>
            </label>
          </div>
          <br />
          {/* <!-- <div className="scroll-bg"> --> */}
          <div className="scroll-div" id="style-4">
            <div className="scroll-object">
              {cart.length > 0 ? (
                <div className="cart-container">
                  {cart.map((data, index) => (
                    <div className="cart-box" key={index}>
                      <div style={{ display: 'flex' }}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onClick={(e) => check(e, data[0], data[1])}
                          checked={data[0] in select}
                        />
                      </div>
                      {data[1].discount ? (
                        <span className="cart-discount">
                          {data[1].discount}% Off
                        </span>
                      ) : null}
                      {/* <!-- img container --> */}
                      <div className="c-img-container">
                        <div className="cart-img">
                          <a href={void 0}>
                            <img
                              src={data[1].link}
                              className="p-img-front"
                              alt="Front"
                            />
                          </a>
                        </div>
                      </div>
                      {/* <!-- text --> */}
                      <div className="p-box-text">
                        {/* <!-- title --> */}
                        {/* <span className="cart-discount">
                          {data[1].discount}% Off
                        </span> */}
                        <a href={void 0} className="product-title">
                          {data[1].title}
                        </a>
                        {/* fist 2 div */}
                        <div className="rate">
                          {/* left */}
                          <div className="div-sell">
                            <span>{data[1].seller}</span>
                          </div>
                          {/* right */}
                          <div className="div-price">
                            <span className="d-price">
                              ₱{data[1].price.toFixed(2)}
                            </span>
                            <br />
                            <span className="p-price">
                              ₱{data[1].price.toFixed(2)}
                            </span>
                          </div>
                          {/* end 2 div */}
                        </div>
                        {/* rating */}
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
                        {what ? (
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
                                ? updateDate(e, index, null)
                                : updateDate(e, index, e.target.value)
                            }
                          >
                            <option disabled="" value={null}>
                              Select available dates
                            </option>
                            {data[1].adv
                              ? Object.keys(data[1].adv).map((d, i) => (
                                  <option
                                    disabled=""
                                    key={i}
                                    selected={
                                      new Date(data[1].date).toDateString() ===
                                      new Date(data[1].adv[d]).toDateString()
                                    }
                                  >
                                    {new Date(data[1].adv[d]).toDateString()}
                                  </option>
                                ))
                              : null}
                          </select>
                        ) : null}
                        <div className="price-buy">
                          {/* quantity adjustment experiment*/}

                          <div>
                            <p className="q-btn">
                              {/* value={"-"} */}
                              <button
                                className="qtyminus"
                                onClick={(e) =>
                                  update(e, data[0], dataAmt[data[0]] - 1)
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="qty-int"
                                name="qty"
                                value={dataAmt[data[0]]}
                                readOnly={true}
                              />
                              {/* value={"+"} */}
                              <button
                                className="qtyplus"
                                onClick={(e) =>
                                  what
                                    ? update(e, data[0], dataAmt[data[0]] + 1)
                                    : dataAmt[data[0]] + 1 <=
                                      data[1].numberofitems
                                    ? update(e, data[0], dataAmt[data[0]] + 1)
                                    : e.preventDefault()
                                }
                              >
                                +
                              </button>
                            </p>
                          </div>

                          {/* right */}
                          <div id="div2">
                            <div className="items-qty">
                              <div className="itm-q">
                                <span className="quantity-items">
                                  Quantity:{' '}
                                  <strong>{data[1].numberofitems}</strong>
                                  <br />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* delete */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h3>NO ITEMS</h3>
              )}
            </div>
          </div>
          <hr size="5" width="100%" color="black" />
          <p className="total">
            <strong>Total: </strong>PHP{' '}
            <span id="price">{totalamount.toFixed(2)}</span>
          </p>
          <div className="">
            <a
              href={void 0}
              className="cart1-btn"
              style={
                !Object.keys(select).length > 0
                  ? { backgroundColor: '#10505e' }
                  : {}
              }
              onClick={() => {
                props.setWidth({ width: '33.33%' })
                props.setProgress([
                  'progress-step progress-step-active',
                  'progress-step progress-step-active',
                  'progress-step',
                  'progress-step',
                ])
              }}
            >
              NEXT
            </a>
          </div>
        </div>
      ) : props.width.width === '33.33%' ? (
        <div className="form-step form-step-active">
          {/* <SelectOrder /> */}
          <SelectOrder
            data={select}
            totalamount={totalamount}
            t_data={data}
            toContinue={toContinue}
            checkOut={checkOut}
            setWidth={props.setWidth}
            setProgress={props.setProgress}
            setData={setData}
            setUse={setUse}
            use={use}
            chA={what}
          />
        </div>
      ) : props.width.width === '66.66%' ? ( //{  }
        <div className="form-step form-step-active">
          {/* <CartConfirmation/> */}
          <CartConfirmation
            advance={what}
            output={data}
            toContinue={toContinue}
            checkOut={checkOut}
            setWidth={props.setWidth}
            setProgress={props.setProgress}
          />
          {/* <div className="btn-group">
              <input type="submit" value="Submit" className="cart-btn" />
            </div> */}
        </div>
      ) : (
        <Checkout output={output} />
      )}
    </form>
  )
}

export default CartList
