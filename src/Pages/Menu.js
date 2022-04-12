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
  const [params, setParams] = useState(null)
  const [search, setSearch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [login, setLoggedin] = useState(false)
  const [data, setData] = useState({})
  React.useEffect(() => {
    try {
      if (
        localStorage.getItem('id') !== null &&
        localStorage.getItem('id').length > 0
      ) {
        axios
          .post(
            process.env.REACT_APP_APIURL + 'profileData',
            encryptJSON({
              id: localStorage.getItem('id'),
              data: ['name', 'img'],
            })
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
    let searchv = new URLSearchParams(window.location.search).get('search')
    let value = new URLSearchParams(window.location.search).get('value')

    if (val !== null) {
      setParams([val.replaceAll(' ', '+')])
    } else {
      setParams(null)
    }
    if (searchv !== null && value !== null) {
      setSearch([searchv, value])
    } else {
      setSearch([])
    }
  }, [])
  return (
    <main>
      <Carousel />
      <Category setValues={setValues} setLoading={setLoading} />
      <div style={{ width: '90%', margin: 'auto' }}>
        {params !== null ? (
          <SingleProduct login={login} data={data} />
        ) : search !== null ? (
          <Products
            featured={false}
            sortwhat={'totalsold'}
            value={values}
            setLoading={setLoading}
            loading={loading}
            search={search}
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
