import axios from 'axios';
import React, { useState } from 'react'
import "../../CSS/CartList.css";
import { decryptJSON, encryptJSON } from '../EncryptionDecryption';
import SelectOrder from './SelectOrder';
import CartConfirmation from './CartConfirmation';
const CartList = (props) => {

  const [cart, setCart] = useState([]);
  const [select, setSelect] = useState({});
  const [totalamount, setTotalAmount] = useState(0);
  const [dataAmt, setdataAmt] = useState({});
  const [state, setState] = useState(false);
  const [chA, setChA] = useState(false);
  const [use, setUse] = useState(false);

  const [data, setData] = useState({
    address: '',
    items: [],
    payment: '',
    totalprice: '',
    userid: localStorage.getItem("id")
  });

  const [output, setOutput] = useState({});

  React.useEffect(() => {
    axios.post(process.env.REACT_APP_APIURL + "cart",
      encryptJSON({
        id: localStorage.getItem("id")
      })).then((resp) => {
        resp.data = decryptJSON(resp.data.data)
        if (!resp.data.error) {
          if (resp.data.success) {
            let obj = {}
            for (let x of resp.data.data) {
              obj[x[0]] = x[1].amount
            }
            setdataAmt(obj);
            setCart(resp.data.data)
          }
        }
      })
  }, []);


  const toContinue = () => {
    console.log(data);
    if (chA) {
      let pass = [];
      for (let x of data.items) {
        pass.push("date" in x[1] ? x[1].date.length > 0 : false);
      }
      return !pass.includes(false);
    } else {
      return true;
    }
  }
  React.useEffect(() => {
    if (cart.length > 0) {
      const script = document.createElement('script');
      script.src = "./assets/dist/js/script.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      }
    }
  }, [cart])


  const showStar = (i) => {
    i === 0 ? i = 1 : i = i
    let proto = []
    for (let v = 0; v < i; v++) {
      proto.push(null);
    }
    return (
      proto.map((data, index) =>
        <label htmlFor={"star-" + index + 1} title={index + 1 + " stars"} key={index}>
          <i className="active fa fa-star" aria-hidden="true">{data}</i>
        </label>
      )
    )
  }
  React.useEffect(() => {
    setUse(!use)
  }, [props.width])
  const update = (key2, amt) => {
    setState(false);
    if (amt < 1) {
      dataAmt[key2] = 1;
    } else if (amt > 100) {
      dataAmt[key2] = 100;
    } else {
      dataAmt[key2] = parseInt(amt);
    }
    let totalvalue = 0;
    let f = {}
    let obj = {}
    for (let x of cart) {
      x[1].amount = dataAmt[x[0]];
      if (x[0] in select && x[1].numberofitems > 0) {
        totalvalue += "discount" in x[1] ? ((x[1].discount / 100) * x[1].price) * dataAmt[x[0]] : x[1].price * dataAmt[x[0]];
        f[x[0]] = x[1];
      }
      obj[x[0]] = dataAmt[x[0]];
    }
    setSelect(f);
    setdataAmt(obj);
    setTotalAmount(totalvalue);
    const timer = setTimeout(async () => {
      sendreq();
    }, 1000)
    return () => clearTimeout(timer);
  }

  const sendreq = () => {
    setState(true);
    const timer = setTimeout(async () => {
      if (state) {
        let obj = {}
        for (let x of cart) {
          obj[x[0]] = {}
          obj[x[0]].amount = dataAmt[x[0]]
          obj[x[0]].date = x[1].date
          obj[x[0]].key = x[1].key
        }
        axios.patch(process.env.REACT_APP_APIURL + "cart", encryptJSON({
          id: localStorage.getItem("id"),
          data: obj
        }))
      }
    }, 1000)
    return () => clearTimeout(timer);
  }

  const check = (e, id, data) => {
    if (e.target.checked) {
      select[id] = data
      setTotalAmount(totalamount + "discount" in data ? ((data.discount / 100) * data.price) * data.amount : data.price * data.amount);
    } else {
      delete select[id]
      setTotalAmount(totalamount - "discount" in data ? ((data.discount / 100) * data.price) * data.amount : data.price * data.amount);
    }
    let totalvalue = 0;
    for (let x of cart) {
      if (x[0] in select && x[1].numberofitems > 0) {
        totalvalue += "discount" in x[1] ? ((x[1].discount / 100) * x[1].price) * dataAmt[x[0]] : x[1].price * dataAmt[x[0]];
      }
    }
    setSelect(select);
    setTotalAmount(totalvalue);
  }

  const selectAll = (e) => {
    let inputs = document.getElementsByTagName('input');
    let index = 0;
    let totalvalue = 0;
    let arr = {};
    for (let v of inputs) {
      if (v.type === "checkbox") {
        if (index > 0) {
          v.checked = e.target.checked;
          if (v.checked && cart[index - 1][1].numberofitems > 0) {
            arr[cart[index - 1][0]] = cart[index - 1][1]
            totalvalue += "discount" in cart[index - 1][1] ? ((cart[index - 1][1].discount / 100) * cart[index - 1][1].price) * dataAmt[cart[index - 1][0]] : cart[index - 1][1].price * dataAmt[cart[index - 1][0]];
          }
        }
        index += 1;
      }
    }
    setTotalAmount(totalvalue);
    setSelect(arr);
  }

  const checkOut = () => {
    axios.post("http://localhost:8001/api/v1/transact",
      encryptJSON(data)).then((resp) => {
        resp.data = decryptJSON(resp.data.data)
        if (!resp.data.error) {
          if (resp.data.completed) {
            setOutput(resp.data.data);
            props.setWidth({ width: '100%' });
            props.setProgress(["progress-step progress-step-active", "progress-step progress-step-active", "progress-step progress-step-active"])
          }
        }
      })
  }

  return (
    <form action={void (0)} className="form">
      {/* <!-- Steps --> */}
      {props.width.width === "0%" ?
        <div className="form-step form-step-active">
          <div className="main_cart">
            <label>
              <input type="checkbox" className="allcheckbox" id="allcheck" onClick={(e) => selectAll(e)} /> All Items
            </label>
          </div>
          {/* <!-- <div class="scroll-bg"> --> */}
          <div className="scroll-div" id="style-4">
            <div className="scroll-object">
              <div className="cart-container">
                {cart.map((data, index) =>
                  <div className="cart-box" key={index}>
                    <input type="checkbox" className="checkbox" onClick={(e) => check(e, data[0], data[1])} checked={data[0] in select} />
                    {/* <!-- img container --> */}
                    <div className="p-img-container">
                      <div className="p-img">
                        <a href={void (0)}>
                          <img src={data[1].link} className="p-img-front" alt="Front" />
                        </a>
                      </div>
                    </div>
                    {/* <!-- text --> */}
                    <div className="p-box-text">
                      {/* <!-- title --> */}
                      <a href={void (0)} className="product-title">
                        {data[1].title}
                      </a>
                      <div className="rate">
                        {/* left */}
                        <div id="div1">
                          <span>{data[1].seller}</span>
                        </div>
                        {/* right */}
                        <div id="div2">
                          <div className="star-rating">

                            {data[1].comments === 0 ?
                              <label htmlFor={"star-2"}>
                                No Ratings
                              </label> :
                              showStar(data[1].comments)}
                          </div>
                          <span>{data[1].totalsold} {data[1].numberofitems}</span>
                        </div>
                        {/* <div id="div3">
                                    
                                </div> */}

                      </div>


                      {/* quantity adjustment */}
                      <div className="btn">
                        <input type="button" className="minusBtn" value={"-"} onClick={() => update(data[0], dataAmt[data[0]] - 1, data[1].numberofitems)} />
                        <input type="number" className="input-cart" value={data[1].numberofitems > 0 ? dataAmt[data[0]] : 0} onChange={(e) => update(data[0], parseInt(e.target.value))} />
                        <input type="button" className="plusBtn" value={"+"} onClick={() => data[1].numberofitems >= dataAmt[data[0]] ? update(data[0], dataAmt[data[0]] + 1, data[1].numberofitems) : null} />
                      </div>
                      {/* <!-- price buy --> */}
                      <div className="price-buy">
                        {/* <!-- discount --> */}
                        <span className="cart-discount">{data[1].discount}%</span>
                        <span className="p-price">₱{data[1].price.toFixed(2)}</span>

                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
          <hr size="5" width="100%" color="black" />
          <p className="total">Total: PHP <span id="price">{totalamount.toFixed(2)}</span></p>
          <div className="">
            <a href={void (0)} className="cart-btn" onClick={() => { props.setWidth({ width: '50%' }); props.setProgress(["progress-step progress-step-active", "progress-step progress-step-active", "progress-step"]) }}>NEXT</a>
          </div>
        </div> : props.width.width === "50%" ?
          <div className="form-step form-step-active">
            {/* <SelectOrder /> */}
            <SelectOrder data={select} totalamount={totalamount} t_data={data} setData={setData} setUse={setUse} use={use} chA={chA} setChA={setChA} />
            <div className="btns-group">
              <a href={void (0)} className="prev-btn" onClick={() => { props.setWidth({ width: '0%' }); props.setProgress(["progress-step progress-step-active", "progress-step", "progress-step"]) }}>PREVIOUS</a>
              {toContinue() && data.address.length > 0 && data.payment.length > 0 && data.items.length > 0 ? <a href={void (0)} className="next-btn" onClick={() => checkOut()}>CHECKOUT</a> : null}
            </div>
          </div>
          ://{  }
          <div className="form-step form-step-active">
            {/* <CartConfirmation/> */}
            <CartConfirmation output={output} />
            <div className="btn-group">
              <input type="submit" value="Submit" className="cart-btn" />
            </div>
          </div>}
    </form>
  )
}
export default CartList;