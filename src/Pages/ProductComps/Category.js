import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import '../../CSS/Category.css'
import '../../CSS/Search.css'
import Search from '../ProductComps/Search.js'
import { decryptJSON } from '../EncryptionDecryption'
function Category(props) {
  const [cat, setCat] = useState([])

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_APIURL + 'category').then((resp) => {
      resp.data = decryptJSON(resp.data.data)
      setCat(resp.data.data)
    })
  }, [])

  return (
    <nav>
      {/* <!-- heading --> */}
      <div className="heading">
        <h3>MENU</h3>
      </div>
      <nav>
        <div className="category">
          <div
            className="toggle"
            onClick={(e) =>
              e.target.className === 'toggle'
                ? (e.target.className += ' active')
                : (e.target.className = 'toggle')
            }
          ></div>
          <ul className="category-list">
            <li
              className="shop"
              onClick={() => {
                props.setSearch('type')
                props.setValues('')
              }}
            >
              <a href={void 0}>All</a>
            </li>
            {cat.map((data, index) => (
              <li
                className="shop"
                key={index}
                onClick={() => {
                  props.setSearch('type')
                  props.setValues(data)
                }}
                style={{ cursor: 'pointer' }}
              >
                <a href={void 0}>{data}</a>
              </li>
            ))}
          </ul>
          <Search
            setValues={(v) => props.setValues(v)}
            setSearch={(v) => props.setSearch(v)}
          />
        </div>
      </nav>
    </nav>
  )
}
export default Category
