import axios from 'axios';
import React, {useState} from 'react'
import { withRouter } from "react-router-dom"
import "../../CSS/SingleProduct.css";
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
import Reviews from './Reviews';
import Recommended from './Recommended';
const SingleProduct = (props) => {
    const [data, setData] = useState({});
    const [idParam, setParams] = useState(new URLSearchParams(window.location.search).get("id"))
    const [qty, setQty] = useState(1);
    const [message, setMessage] = useState({added:false, message:''})
    React.useEffect(()=>{
      axios.post(process.env.REACT_APP_APIURL+"singleproduct",
      encryptJSON({
          id: idParam
      })).then((resp)=>{
          resp.data = decryptJSON(resp.data.data)
          if(!resp.data.error){
            // console.log(resp.data)
              setData(resp.data.data)
              console.log(resp.data.data)
          }
      })
    }, [idParam]);
    React.useEffect(()=>{
      let param = new URLSearchParams(window.location.search).get("id");
      if(param!==null){
        setParams(param.replaceAll(" ", "+"))
      }else{
          setParams(null)
      }
    }, [])
    const addCart = () =>{
      if(localStorage.getItem("id")!==null){
          axios.post(process.env.REACT_APP_APIURL+"addcart", encryptJSON({
              id: localStorage.getItem("id"),
              cartid: idParam,
              amount: qty
          })).then((response)=>{
              response.data = decryptJSON(response.data.data)
              if(!response.data.error){
                  setMessage(response.data)
              }

          })
      }
  }
  const editQty = (x) =>{
    if(x<1){
      setQty(1)
    }else if(x>100){
      setQty(100)
    }else{
      setQty(parseInt(x));
    }
  }
    return(
        <div className="Single-container">
          <header className="s-header">
          <div className="Single-image">
                <img src={data.link} alt="" className="Single-pic"/>
            </div>  
            
          <div className="Single-details">      
              <h1 className="s-title">{data.title}</h1>
              <div className="s-rate">
                {data.comments===0?"No ratings"
                :
                <>
                <input type="radio" name="rating2" value="5" id="1star5" checked={data.comments===5} style={{display:'none'}} />
                <label htmlFor="1star5" title="text">★</label>
                <input type="radio" name="rating2" value="4" id="1star4" checked={data.comments===4} style={{display:'none'}}/>
                <label htmlFor="1star4" title="text">★</label>
                <input type="radio" name="rating2" value="3" id="1star3" checked={data.comments===3} style={{display:'none'}} />
                <label htmlFor="1star3" title="text">★</label>
                <input type="radio" name="rating2" value="2" id="1star2" checked={data.comments===2} style={{display:'none'}}/>
                <label htmlFor="1star2" title="text">★</label>
                <input type="radio" name="rating2" value="1" id="1star1" checked={data.comments===1} style={{display:'none'}} />
                <label htmlFor="1star1" title="text">★</label>
                </>
                }
              </div>
              <span className="s-colorCat">{data.seller}</span>
              <div className="s-price">
                {data.discount!==undefined?<span className="s-before">P{data.price}</span>:null}
                <span className="s-current">P{data.discount!==undefined?((data.discount/100 ) * data.price):data.price}</span>
              </div>

            <article>
              <h5>DESCRIPTION</h5>
              <p>{data.description}</p>
            </article>
            <div className="s-controls">
              {/*   <div className="s-size">
                    <h5>ORDER TYPE</h5>
                <a href="#!" className="s-option">Choose one</a>
                </div> */}
              <div className="s-qty">
                <h5>QTY</h5>
                <button className="p-btn" type="button" onClick={()=>editQty(parseInt(qty)+1)}>+</button>
                <input type='number' className="s-option" value={qty} style={{width: '50px'}} onChange={(e)=>e.target.value<=0?setQty(1):e.target.value>100?100:setQty(parseInt(e.target.value))}/>
                
                
                <button className="m-btn" type="button" onClick={()=>editQty(parseInt(qty)-1)}>-</button>
                
                {/* quantity adjustment */}
                  {/* <input type="button" className="minusBtn" value={"-"} onClick={()=>editQty(data[0], itemNum[data[0]]-=1)} />
                  <input type="number" className="input" value={itemNum[data[0]]} onChange={(e)=>editQty(data[0], e.target.value)} />
                  <input type="button" className="plusBtn" value={"+"}  onClick={()=>editQty(data[0], itemNum[data[0]]+=1)}/> */}
              {message.message.length>0?<p style={message.added?{color:'green'}:{color:'red'}}>{message.message}</p>:null}
              <button className="s-btn" type="button" onClick={()=>addCart()}>ADD TO CART</button>
              </div>
            </div>
          {/* recommended items */}
          <br/>
            
            {/*comments*/}
            <Reviews id={idParam}/>
            <Recommended/>
            {/* <section className="p-slider">
                <h3 className="product-slider-heading">Featured Products</h3>
            <div className="slider-btns">
                    <button aria-label="Previous" className="glider-prev">{'<'}
                    </button>
                    <button aria-label="Next" className="glider-next">{'>'}
                    </button>
                    
            </div>
                <div className="glider-contain">
                    <div className="glider">
                    {products.map((data, i)=>{
                        return(
                            <div key={i} className="product-box">
                            <span className="p-discount">-{data[1].discount}%</span>
                            <div className="p-img-container">
                                <div className="p-img" >
                                    <a href="javascript:void(0)" onClick={()=>{history.push("/products?id="+data[0]); props.set(true)}}>
                                        <img src={data[1].link} className="p-img-front" alt={data[1].imgname} />
                                    </a>
                                </div>
                            </div>
                            <div className="p-box-text">
                                <a href="javascript:void(0)" className="product-title">
                                    {data[1].title}
                                </a>
                                <div className="product-category">
                                    <span>{data[1].seller}</span>
                                </div>
                                <div className="price">   
                                    <span className="p-price" >₱ {data[1].price}</span>
                                    <a href="" className="p-buy-btn">ADD TO CART</a>
                                </div>
                            </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </section> */}
          </div>
          </header>
        </div>

    )
}
export default SingleProduct;