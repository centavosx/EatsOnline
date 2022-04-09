import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Components/Header.js'
import Footer from './Components/Footer.js'
import Home from './Pages/Home.js'
import Menu from './Pages/Menu'
import Profile from './Pages/Profile.js'
import Login from './Pages/Login'
import React, { useState } from 'react'
import Cart from './Pages/Cart'
import Chat from './Components/Chat'
import ContactPage from './Pages/ContactPage'
import axios from 'axios'
import { encryptJSON, decryptJSON } from './Pages/EncryptionDecryption'

function App() {
  const [loggedin, setLoggedin] = useState(null)
  const [page, setPage] = useState('')
  React.useEffect(async () => {
    if (
      localStorage.getItem('id') !== null &&
      localStorage.getItem('id').length > 0
    ) {
      await axios
        .post(
          process.env.REACT_APP_APIURL + 'profileData',
          encryptJSON({
            id: localStorage.getItem('id'),
            data: ['name', 'link'],
          })
        )
        .then((response) => {
          response.data = decryptJSON(response.data.data)
          if (!response.data.error) {
            setLoggedin(response.name.length > 0)
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
  }, [localStorage.getItem('id')])
  return (
    <div className="App">
      <Router>
        {page !== 'login' ? <Header /> : null}
        <Switch>
          <Route path="/products" render={(props) => <Menu {...props} />} />
          <Route
            path="/products?id=:id"
            render={(props) => <Menu {...props} />}
          />
          <Route
            path="/products?search=:search&value=:value"
            render={(props) => <Menu {...props} />}
          />
          {loggedin === null ? null : loggedin === false ? (
            <Route
              path="/login"
              render={(props) => <Login {...props} setPage={setPage} />}
            />
          ) : null}
          <Route
            path="/contactus"
            render={(props) => <ContactPage {...props} />}
          />
          <Route path="/cartlist" render={(props) => <Cart {...props} />} />
          <Route
            path="/cartlist?id=:id&what=:what"
            render={(props) => <Cart {...props} />}
          />
          {localStorage.getItem('id') !== null ? (
            <Route path="/profile" render={(props) => <Profile {...props} />} />
          ) : null}
          <Route
            path="/"
            render={(props) => <Home {...props} setPage={setPage} />}
          />
        </Switch>
        {page !== 'login' ? <Footer /> : null}
      </Router>
    </div>
  )
}

export default App
