import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Components/Header.js'
import Footer from './Components/Footer.js'
import Home from './Pages/Home.js'
import Menu from './Pages/Menu'
import Profile from './Pages/Profile.js'
import Login from './Pages/Login'
import React from 'react'
import Cart from './Pages/Cart'
import Chat from './Components/Chat'
import ContactPage from './Pages/ContactPage'
function App() {
  return (
    <div className="App">
      <Router>
        {localStorage.getItem('page') !== 'login' ? <Header /> : null}
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
          {localStorage.getItem('id') === null ? (
            <Route path="/login" render={(props) => <Login {...props} />} />
          ) : null}
          <Route path="/" render={(props) => <Home {...props} />} />
        </Switch>
        <Chat />
        {localStorage.getItem('page') !== 'login' ? <Footer /> : null}
      </Router>
    </div>
  )
}

export default App
