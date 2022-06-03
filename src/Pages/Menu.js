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
