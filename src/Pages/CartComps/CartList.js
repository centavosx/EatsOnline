import axios from 'axios'
import React, { useState } from 'react'
import '../../CSS/CartList.css'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
import SelectOrder from './SelectOrder'
import CartConfirmation from './CartConfirmation'
import Modal from '../../Components/Modal'
import Checkout from './Checkout'
const CartList = (props) => {
  const [cart, setCart] = useState([])
  const [select, setSelect] = useState({})
  const [totalamount, setTotalAmount] = useState(0)
  const [dataAmt, setdataAmt] = useState({})
  const [state, setState] = useState(false)
  const [chA, setChA] = useState(false)
  const [use, setUse] = useState(false)
  // modal
  const [openModal, setOpenModal] = useState(false)

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
    if (!('id' in props.output))
      axios
        .get(
          process.env.REACT_APP_APIURL +
            `cart?data=${JSON.stringify(
              encryptJSON({
                id: localStorage.getItem('id'),
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
              setdataAmt(obj)
              setCart(resp.data.data)
            }
          }
        })
  }, [])

  const toContinue = () => {
    if (chA) {
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
    for (let x of cart) {
      x[1].amount = dataAmt[x[0]]
      if (x[0] in select && x[1].numberofitems > 0) {
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
    const timer = setTimeout(async () => {
      sendreq()
    }, 1000)
    return () => clearTimeout(timer)
  }

  const sendreq = () => {
    setState(true)
    const timer = setTimeout(async () => {
      if (state) {
        let obj = {}
        for (let x of cart) {
          obj[x[0]] = {}
          obj[x[0]].amount = dataAmt[x[0]]
          obj[x[0]].date = x[1].date
          obj[x[0]].key = x[1].key
        }
        axios.patch(
          process.env.REACT_APP_APIURL + 'cart',
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
    if (data.numberofitems > 0)
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
    for (let x of cart) {
      if (x[0] in select && x[1].numberofitems > 0) {
        //
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
    setSelect(select)
    setTotalAmount(totalvalue)
  }

  const selectAll = (e) => {
    let inputs = document.getElementsByTagName('input')
    let index = 0
    let totalvalue = 0
    let arr = {}
    for (let v of inputs) {
      if (v.type === 'checkbox') {
        if (index > 0) {
          v.checked = e.target.checked
          if (v.checked && cart[index - 1][1].numberofitems > 0) {
            //
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

    setTotalAmount(totalvalue)
    setSelect(arr)
  }

  const checkOut = () => {
    axios
      .post(
        process.env.REACT_APP_APIURL + 'transact',
        encryptJSON({
          data: data,
          advance: chA,
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
    let x = []
    x.push(id)
    let data = await deleteReq(x)
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
    <form action={void 0} className="form">
      {/* <!-- Steps --> */}
      {props.width.width === '0%' ? (
        <div className="form-step form-step-active">
          <div className="main_cart">
            {/* {openModal && <Modal closeModal={setOpenModal} />} */}
            <label>
              <input
                type="checkbox"
                className="allcheckbox"
                id="allcheck"
                onClick={(e) => selectAll(e)}
              />{' '}
              <strong className="check1">ALL ITEMS</strong>
            </label>
          </div>
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
                        {data[1].numberofitems < 1 ? (
                          <p style={{ marginLeft: '5px' }}>
                            This item is out of stock{' '}
                          </p>
                        ) : null}
                      </div>
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
                            <span className="p-price">
                              ₱{data[1].price.toFixed(2)}
                            </span>
                            <span className="cart-discount">
                              {data[1].discount}%
                            </span>
                          </div>
                          {/* end 2 div */}
                        </div>
                        {/* rating */}
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
                                value={
                                  data[1].numberofitems > 0
                                    ? dataAmt[data[0]]
                                    : 0
                                }
                                readOnly={true}
                              />
                              {/* value={"+"} */}
                              <button
                                className="qtyplus"
                                onClick={(e) =>
                                  data[1].numberofitems > dataAmt[data[0]]
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
                                  <button
                                    className="cartDel"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      deleteItem(data[0])
                                    }}
                                  >
                                    <i className="fa fa-trash"></i>
                                    Delete
                                  </button>
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
                setOpenModal(true)
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
            chA={chA}
            setChA={setChA}
          />
        </div>
      ) : props.width.width === '66.66%' ? ( //{  }
        <div className="form-step form-step-active">
          {/* <CartConfirmation/> */}
          <CartConfirmation
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
