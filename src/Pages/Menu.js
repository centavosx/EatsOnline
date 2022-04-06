import React, { useState } from 'react'

import Carousel from './HomeComps/Carousel.js'
import Products from './HomeComps/Products.js'
import Category from './ProductComps/Category.js'
import Goback from './HomeComps/Goback.js'
import SingleProduct from './ProductComps/SingleProduct.js'
const Menu = (props) => {
  const [values, setValues] = useState([])
  const [params, setParams] = useState(null)
  const [search, setSearch] = useState(null)
  const [loading, setLoading] = useState(false)
  React.useEffect(() => {
    let val = new URLSearchParams(window.location.search).get('id')
    let searchv = new URLSearchParams(window.location.search).get('search')
    let value = new URLSearchParams(window.location.search).get('value')
    console.log(searchv, value)
    if (val !== null) {
      setParams(val.replaceAll(' ', '+'))
    } else {
      setParams(null)
    }
    if (searchv !== null && value !== null) {
      setSearch([searchv, value])
    } else {
      setSearch([])
    }
    localStorage.setItem('page', 'menu')
  }, [])
  return (
    <main>
      <Carousel />
      <Category setValues={setValues} setLoading={setLoading} />
      <div style={{ width: '90%', margin: 'auto' }}>
        {params !== null ? (
          <SingleProduct />
        ) : search !== null ? (
          <Products
            featured={false}
            sortwhat={'totalsold'}
            value={values}
            setLoading={setLoading}
            loading={loading}
            search={search}
            setValues={setValues}
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
