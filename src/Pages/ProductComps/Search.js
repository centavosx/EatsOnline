import axios from 'axios'
import { useState } from 'react'
import '../../CSS/Search.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const Search = (props) => {
  return (
    <div className="right-menu inputWithIcon">
      <input
        type="text"
        className="search-click"
        name=""
        onKeyDown={(e) =>
          e.key === 'Enter'
            ? window.location.replace(
                `/menu?search=title&value=${e.target.value}`
              )
            : null
        }
        placeholder="search here..."
        onChange={(e) => {
          props.setSearch('title')
          props.setValues(e.target.value)
        }}
      />
      <i className="fas fa-search"></i>
    </div>
    //     <div className="right-menu">
    //     {/* <div className="s-container"> */}
    //         <div className="search-box">
    //             <input type="text" className="search-input" placeholder="Search.."}/>
    //             <button className="search-button" onClick={()=>search(v)}>
    //                 <i className="fas fa-search"></i>
    //             </button>
    //         </div>
    //     {/* </div> */}
    // </div>
  )
}

export default Search
