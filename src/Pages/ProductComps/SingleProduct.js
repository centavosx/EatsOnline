import axios from 'axios'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../../CSS/SingleProduct.css'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
import Reviews from './Reviews'
import Recommended from './Recommended'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const SingleProduct = (props) => {
  const [data, setData] = useState({})
  const [idParam, setParams] = useState(
    new URLSearchParams(window.location.search).get('id')
  )
  const history = useHistory()
  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState({ added: false, message: '' })

  React.useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_APIURL + 'singleproduct',
        encryptJSON({
          id: idParam,
        })
      )
      .then((resp) => {
        resp.data = decryptJSON(resp.data.data)
        if (!resp.data.error) {
          // console.log(resp.data)
          setData(resp.data.data)
          console.log(resp.data.data)
        }
      })
  }, [idParam])
  React.useEffect(() => {
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
    <section className="single-sec">
      <div class="collection-wrapper">
        <div class="Single-container">
          <div class="row">
            {/* <div> */}
            <div>
              <a
                className="ss-btn"
                style={{ cursor: 'pointer' }}
                href={void 0}
                onClick={() => (window.location.href = '/products')}
              >
                BACK
              </a>
            </div>
            {/* </div> */}
            <div className="col-lg-5 col-sm-10 col-xs-12">
              <div class="product-right-slick">
                <div className="img-fluid lazyload image_zoom_cls-0">
                  <img src={data.link} alt="" className="Single-pic" />
                </div>
              </div>
            </div>
            <div class="col-lg-6 rtl-text">
              <div class="product-right">
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
                    ? (data.discount / 100) * data.price
                    : data.price}
                </span>
                <ul class="color-variant s-rate">
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
                      />
                      <label htmlFor="1star1" title="text">
                        ★
                      </label>
                    </>
                  )}
                </ul>
                <div class="border-product">
                  <h6 class="product-title">product details</h6>
                  <p>{data.description}</p>
                </div>
                <div class="product-description border-product">
                  <h6 class="product-title">quantity</h6>
                  <div class="qty-box">
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
                      onChange={(e) =>
                        e.target.value <= 0
                          ? setQty(1)
                          : e.target.value > 100
                          ? 100
                          : setQty(parseInt(e.target.value))
                      }
                    />
                    <button
                      className="p-btn"
                      type="button"
                      onClick={() => editQty(parseInt(qty) + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>{message.message}</div>
                  {props.login ? (
                    <div id="single-add">
                      <a
                        style={{ cursor: 'pointer' }}
                        className="single-add-btn"
                        onClick={() => addCart(data[0])}
                      >
                        <h6 className="single-add-to">add to cart</h6>
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {/*comments*/}

            <Reviews id={idParam} login={props.login} />
            {'title' in data ? (
              <Recommended
                title={data.title}
                seller={data.seller}
                type={data.type}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
export default SingleProduct
