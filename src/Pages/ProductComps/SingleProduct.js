import axios from 'axios'
import React, { useState, useRef } from 'react'
import '../../CSS/SingleProduct.css'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
import Reviews from './Reviews'
import Recommended from './Recommended'
import { useHistory } from 'react-router-dom'

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
          process.env.REACT_APP_APIURL + 'addcart',
          encryptJSON({
            id: localStorage.getItem('id'),
            cartid: idParam,
            amount: qty,
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
                <h4>
                  {' '}
                  {data.discount !== undefined ? (
                    <span className="s-before">P{data.price}</span>
                  ) : null}
                </h4>
                <span className="s-current">
                  P
                  {data.discount !== undefined
                    ? (data.price - (data.discount * data.price) / 100).toFixed(
                        2
                      )
                    : data.price}
                </span>
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
                <div className="border-product">
                  <h6 className="product-title">quantity</h6>
                  <div className="qty-box">
                    <button
                      className="m-btn"
                      type="button"
                      onClick={() => editQty(parseInt(qty) - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="s-option"
                      value={qty}
                      readOnly={true}
                    />
                    <button
                      className="p-btn"
                      type="button"
                      onClick={() =>
                        qty < data.numberofitems
                          ? editQty(parseInt(qty) + 1)
                          : null
                      }
                    >
                      +
                    </button>
                  </div>
                  <div>{message.message}</div>
                  <br />
                  <div id="single-add">
                    <a
                      style={{ cursor: 'pointer' }}
                      className="single-add-btn"
                      onClick={() =>
                        props.login ? addCart(data[0]) : history.push('/login')
                      }
                    >
                      <span style={{ color: 'white' }}>Add to cart</span>
                    </a>
                  </div>
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
      </div>
    </section>
  )
}
export default SingleProduct
