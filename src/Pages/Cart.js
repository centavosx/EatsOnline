import React, { useState } from 'react'
// import styles from "../CSS/CartList.css";
import Carousel from './HomeComps/Carousel.js'
import CartList from './CartComps/CartList.js'
import Goback from './HomeComps/Goback.js'
import Progress from './CartComps/Progress.js'
import axios from 'axios'
import { decryptJSON, encryptJSON } from '../Pages/EncryptionDecryption.js'
const Cart = (props) => {
  const [params, setParams] = useState(null)
  const [what, setWhat] = useState(null)
  const [width, setWidth] = useState({ width: '0%' })
  const [progress, setProgress] = useState([
    'progress-step progress-step-active',
    'progress-step',
    'progress-step',
    'progress-step',
  ])

  const [output, setOutput] = useState({})
  React.useEffect(() => {
    let val = new URLSearchParams(window.location.search).get('id')
    let what = new URLSearchParams(window.location.search).get('what')
    if (val !== null) {
      setParams(val.replaceAll(' ', '+'))
      setWhat(what.replaceAll(' ', '+'))
    } else {
      setParams(null)
      setWhat(null)
    }
  }, [])
  const [loading, setLoading] = useState(false)
  React.useEffect(async () => {
    try {
      setLoading(true)
      if (params !== null && what !== null) {
        let req = await axios.get(
          process.env.REACT_APP_APIURL +
            `opennotif?data=${JSON.stringify(
              encryptJSON({
                id: params,
                uid: localStorage.getItem('id'),
                what: what,
              })
            )}`
        )
        let data = decryptJSON(req.data.data)
        if ('id' in data) {
          setOutput(data)
          setWidth({ width: '100%' })
          setProgress([
            'progress-step progress-step-active',
            'progress-step progress-step-active',
            'progress-step progress-step-active',
            'progress-step progress-step-active',
          ])
        }
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }, [params, what])
  return (
    <main>
      <Carousel />
      <Progress
        width={width}
        progress={progress}
        setProgress={setProgress}
        setWidth={setWidth}
      />
      {!loading ? (
        <CartList
          setWidth={setWidth}
          width={width}
          setProgress={setProgress}
          output={output}
        />
      ) : null}
      <Goback />

      {/* <SelectOrder/> */}
    </main>
  )
}
export default Cart
