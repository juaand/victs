import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import MyInfo from './components/MyInfo/MyInfo'
import Register from './components/Register/Register'
import {useAuthContext} from './contexts/AuthContext'

function App() {

  const {user} = useAuthContext()

  const confirmed = true

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/activate/:token' render={(props) => <Login {...props} confirmed={confirmed} />} />
        <AuthenticatedRoute exact path="/my-info" render={(props) => <MyInfo {...props} user={user} />} />
        <Redirect to='/' />
        {!user && <Redirect to='/' />}
      </Switch>
    </div>
  )
}

export default App
