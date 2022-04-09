import React, { useState } from 'react'
import axios from 'axios'
import '../../CSS/Recommended.css'
import { decryptJSON, encryptJSON } from '../EncryptionDecryption'
const Recommended = (props) => {
  const [recommended, setRecommended] = useState([])
  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')
  React.useEffect(async () => {
    let res = await axios.post(
      process.env.REACT_APP_APIURL + 'recommended',
      encryptJSON({
        title: props.title,
        seller: props.seller,
        type: props.type,
      })
    )

    let data = decryptJSON(res.data.data)
    setRecommended(data.data)
  }, [])

  React.useEffect(() => {
    if (recommended.length > 0) {
      const script = document.createElement('script')
      script.src = './assets/dist/js/glider.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [recommended])
  const addCart = (id) => {
    if (localStorage.getItem('id') !== null) {
      axios
        .post(
          process.env.REACT_APP_APIURL + 'addcart',
          encryptJSON({
            id: localStorage.getItem('id'),
            cartid: id,
            amount: 1,
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
  return (
    <>
      <div className="s-recommended">RECOMMENDED ITEMS</div>
      <section className="p-slider">
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
            {recommended.map((data, i) => {
              return (
                <div key={i} className="reco-product-box">
                  <span className="reco-discount">-{data[1].discount}%</span>

                  <div className="reco-img-container">
                    <div className="reco-img">
                      <a href={'/products?id=' + data[0]}>
                        <img
                          src={data[1].link}
                          className="reco-img-front"
                          alt={data[1].imgname}
                        />
                      </a>
                    </div>
                  </div>

                  <div className="reco-box-text">
                    <a href={void 0} className="reco-title">
                      {data[1].title}
                    </a>

                    <div className="reco-product-category">
                      <span>{data[1].seller}</span>
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
                    <div className="reco-price">
                      <span className="reco-price">₱ {data[1].price}</span>
                      <a
                        href={void 0}
                        className="reco-buy-btn"
                        onClick={() => addCart(data[0])}
                      >
                        ADD TO CART
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* </div> */}
    </>
  )
}
export default Recommended
