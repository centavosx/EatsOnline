import axios from 'axios'
import React, { useState, useRef } from 'react'
import '../../CSS/SingleProduct.css'
import { decrypt, decryptJSON, encryptJSON } from '../EncryptionDecryption'
import Reviews from './Reviews'
import Recommended from './Recommended'
import { useHistory } from 'react-router-dom'
import socket from '../../socket'
import { Redirect } from 'react-router-dom'

const SingleProduct = (props) => {
  const [data, setData] = useState({})
  const [idParam, setParams] = useState(
    new URLSearchParams(window.location.search).get('id')
  )
  const ref = useRef()
  const history = useHistory()
  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState({ added: false, message: '' })
  const [checkB, setCheckB] = useState(false)


  const [adv, setAdv] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  React.useEffect(async () => {
    const resp = await axios.get(
      process.env.REACT_APP_APIURL +
        `singleproduct?data=${JSON.stringify(
          encryptJSON({
            id: idParam,
          })
        )}`
    )
    resp.data = decryptJSON(resp.data.data)
    if (!resp.data.error) {
      setData(resp.data.data)
    }
    socket.on(decrypt(idParam), (data) => {
      setData(data)
    })
  }, [idParam])
  React.useEffect(async () => {
    if (props.login) {
      const resp2 = await axios.get(
        process.env.REACT_APP_APIURL +
          `checkIfBought?data=${JSON.stringify(
            encryptJSON({
              id: localStorage.getItem('id'),
              pid: idParam,
            })
          )}`
      )

      const check = decryptJSON(resp2.data.data)
      setCheckB(check.check)
    }
  }, [data])
  React.useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
    let param = new URLSearchParams(window.location.search).get('id')
    if (param !== null) {
      setParams(param.replaceAll(' ', '+'))
    } else {
      setParams(null)
    }
  }, [])
  const addCart = () => {
    if (localStorage.getItem('id') !== null) {
      axios
        .post(
          process.env.REACT_APP_APIURL + 'newaddcart',
          encryptJSON({
            id: localStorage.getItem('id'),
            cartid: idParam,
            amount: qty,
            adv: adv,
            date: selectedDate,
          })
        )
        .then((response) => {
          response.data = decryptJSON(response.data.data)
          if (!response.data.error) {
            setMessage(response.data)

            // setKey(id)
            // setMessage(response.data)
          }
        })
    }
  }
  const editQty = (x) => {
    if (x < 1) {
      setQty(1)
    } else if (x > 100) {
      setQty(100)
    } else {
      setQty(parseInt(x))
    }
  }

  return (
    <section className="single-sec" ref={ref}>
      <div className="collection-wrapper">
        <div className="Single-container">
          <div className="row">
            {/* <div> */}
            <div>
              <a
                className="ss-btn"
                style={{ cursor: 'pointer' }}
                href={void 0}
                onClick={() => (window.location.href = '/menu')}
              >
                BACK
              </a>
            </div>
            <br />
            {/* </div> */}
            <div className="col-lg-5 col-sm-10 col-xs-12">
              <div className="product-right-slick">
                <div className="img-fluid lazyload image_zoom_cls-0">
                  <img src={data.link} alt="" className="Single-pic" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 rtl-text">
              <div className="product-right">
                <h2>{data.title}</h2>
                <h6>{data.seller}</h6>
                <div className="discount-con">
                  <h4>
                    {' '}
                    {data.discount !== undefined ? (
                      <span className="s-before">P{data.price}</span>
                    ) : null}
                  </h4>
                  <span className="s-current">
                    P
                    {data.discount !== undefined
                      ? (
                          data.price -
                          (data.discount * data.price) / 100
                        ).toFixed(2)
                      : data.price}
                  </span>
                </div>
                <ul className="color-variant s-rate">
                  {data.comments === 0 ? (
                    'No ratings'
                  ) : (
                    <>
                      <input
                        type="radio"
                        name="rating2"
                        value="5"
                        id="1star5"
                        checked={data.comments === 5}
                        style={{ display: 'none' }}
                        readOnly={true}
                      />
                      <label htmlFor="1star5" title="text">
                        ★
                      </label>
                      <input
                        type="radio"
                        name="rating2"
                        value="4"
                        id="1star4"
                        checked={data.comments === 4}
                        style={{ display: 'none' }}
                        readOnly={true}
                      />
                      <label htmlFor="1star4" title="text">
                        ★
                      </label>
                      <input
                        type="radio"
                        name="rating2"
                        value="3"
                        id="1star3"
                        checked={data.comments === 3}
                        style={{ display: 'none' }}
                        readOnly={true}
                      />

                      <label htmlFor="1star3" title="text">
                        ★
                      </label>
                      <input
                        type="radio"
                        name="rating2"
                        value="2"
                        id="1star2"
                        checked={data.comments === 2}
                        style={{ display: 'none' }}
                        readOnly={true}
                      />
                      <label htmlFor="1star2" title="text">
                        ★
                      </label>
                      <input
                        type="radio"
                        name="rating2"
                        value="1"
                        id="1star1"
                        checked={data.comments === 1}
                        style={{ display: 'none' }}
                        readOnly={true}
                      />
                      <label htmlFor="1star1" title="text">
                        ★
                      </label>
                    </>
                  )}
                </ul>
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>{data.description}</p>
                </div>
               
                <div>{message.message}</div>
                <br />{' '}
                {adv !== null ? (
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
                        onClick={(e) => setAdv(null)}
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
                      Add to {adv === true ? 'Advance Order' : 'Order Now'}
                    </p>
                  </>
                ) : null}
                {adv === true ? (
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
                        ? setSelectedDate(null)
                        : setSelectedDate(e.target.value)
                    }
                  >
                    <option disabled="" value={null}>
                      Select available dates
                    </option>
                    {data.adv
                      ? Object.keys(data.adv).map((d, i) => (
                          <option disabled="" key={i}>
                            {new Date(data.adv[d]).toDateString()}
                          </option>
                        ))
                      : null}
                  </select>
                ) : null}
                {/* <br /> */}
                {/* order now and advance order button */}
                {adv === null ? (
                  <>
                    <p
                      style={{
                        justifyContent: 'left',
                        width: '100%',
                        fontWeight: "bold",
                        
                      }}
                    >
                      Add to:
                    </p>
                    <br></br>
                    {data.adv ? (
                      Object.keys(data.adv).length > 0 ? (
                        <div className="single-ord-conts">
                          <div className="single-ord-btn">
                            <a
                              style={{ cursor: 'pointer' }}
                              className="single-order-now-btn"
                              onClick={(e) => setAdv(false)}
                            >
                              Order Now
                            </a>
                            
                            <a
                              style={{ cursor: 'pointer' }}
                              className="single-advance-btn"
                              onClick={(e) => setAdv(true)}
                            >
                              Advance Order
                            </a>
                          </div>

                          
                        </div>
                      ) : (
                        <div className="single-ord-btn">
                          <a
                            style={{ cursor: 'pointer' }}
                            className="single-order-now-btn"
                            onClick={(e) => setAdv(false)}
                          >
                            Order Now
                          </a>
                        </div>
                      )
                    ) : (
                      <div className="single-ord-btn">
                        <a
                          style={{ cursor: 'pointer' }}
                          className="single-order-now-btn"
                          onClick={(e) => setAdv(false)}
                        >
                          Order Now
                        </a>
                      </div>
                    )}
                  </>
                ) : null}
                {adv !== null ? (
                  <>
                    <div className="price-buy">
                      {/* quantity adjustment experiment*/}

                      <div className="qty-cons">
                        <h6 className="product-title">quantity</h6>
                        <p className="q-btn">
                          {/* value={"-"} */}

                          <button
                            className='minusme'
                            onClick={(e) => editQty(qty - 1)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="qty-int"
                            readOnly={true}
                            name="qty"
                            value={qty}
                          />
                          {/* {console.log(data[0])} */}
                          {/* value={"+"} */}
                          <button
                            className="plusme"
                            onClick={(e) => editQty(qty + 1)}
                          >
                            +
                          </button>
                        </p>
                      </div>

                      {/* right */}

                      {adv !== null ? 
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
                      : null}

                      
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {/*comments*/}

          <Reviews
            id={idParam}
            login={props.login}
            check={checkB}
            data={props.data}
          />
          {'title' in data ? (
            <Recommended
              title={data.title}
              seller={data.seller}
              type={data.type}
              login={props.login}
            />
          ) : null}
        </div>
      </div>
      {/* </div> */}
    </section>
  )
}
export default SingleProduct
