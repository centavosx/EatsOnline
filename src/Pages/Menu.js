import React, { useState } from 'react'

import Carousel from './HomeComps/Carousel.js'
import Products from './HomeComps/Products.js'
import Category from './ProductComps/Category.js'
import Goback from './HomeComps/Goback.js'
import SingleProduct from './ProductComps/SingleProduct.js'
import axios from 'axios'
import { encryptJSON, decryptJSON } from './EncryptionDecryption.js'
const Menu = (props) => {
  const [values, setValues] = useState([])
  const [type, setType] = useState('type')
  const [params, setParams] = useState(null)
  const [search, setSearch] = useState('')
  const [what, setWhat] = useState(false)

  const [login, setLoggedin] = useState(false)
  const [data, setData] = useState({})
  React.useEffect(() => {
    try {
      if (
        localStorage.getItem('id') !== null &&
        localStorage.getItem('id').length > 0
      ) {
        axios
          .get(
            process.env.REACT_APP_APIURL +
              `profileData?data=${JSON.stringify(
                encryptJSON({
                  id: localStorage.getItem('id'),
                  data: ['name', 'img'],
                })
              )}`
          )
          .then((response) => {
            response.data = decryptJSON(response.data.data)
            if (!response.data.error) {
              setLoggedin(response.data.name.length > 0)
              setData(response.data)
            } else {
              setLoggedin(false)
            }
          })
          .catch(() => {
            setLoggedin(false)
          })
      } else {
        setLoggedin(false)
      }
    } catch {
      setLoggedin(false)
    }
  }, [localStorage.getItem('id')])

  React.useEffect(() => {
    let val = new URLSearchParams(window.location.search).get('id')

    if (val !== null) {
      setParams([val.replaceAll(' ', '+')])
    } else {
      setParams(null)
    }
  }, [])
  return (
    <main>
      {/* <Carousel /> */}
      <img
        className="menu-img"
        title=""
        src="../assets/BANNER SIZES/Product Banner_1900x723.png"
        alt=""
      />
      <Category setValues={(v) => setSearch(v)} setSearch={(v) => setType(v)} />
      <div
        className="menu-ord-cols"
        style={{
          display: 'grid',
          gridTemplateRows: '50% 50%',
          paddingRight: 10,
          float: 'right',
        }}
      >
        <h1
          className="menu-method"
          style={{
            marginTop: '30px',
            marginBottom: '35px',
            fontSize: '20px',
            color: '#fff',
            padding: '1px',
            display: 'inlineBlock',
            float: 'right',
          }}
        >
          Order Method
        </h1>
        <select
          className="menu-OrderMethod"
          style={{ width: 'fitContent', height: '35px', float: 'right' }}
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
      <div style={{ width: '90%', margin: 'auto' }}>
        {params !== null ? (
          <SingleProduct login={login} data={data} />
        ) : search !== null ? (
          <Products
            featured={false}
            sortwhat={'totalsold'}
            value={values}
            search={search}
            type={type}
            setValues={setValues}
            login={login}
          />
        ) : null}

        {/* <Router>
                <Switch>
                    <Route path="/products?id=:id" render={(props) => (<SingleProduct {...props}/>)} />
                    <Route path="/products" render={(props) => (<Products {...props} featured={false} sortwhat={"totalsold"} value={values}/>)} />
                </Switch>
            </Router> */}
        {/* <Products featured={false} sortwhat={"totalsold"} value={values} set={props.setSingle}/>
            <SingleProduct set={props.setSingle}/> */}
      </div>
      <Goback />
    </main>
  )
}
export default Menu
