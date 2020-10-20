import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import User from './components/User/User'
import AuthenticatedRoute from './AuthenticatedRoute'


function App() {

  return (
    <div className="App container p-5">
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthenticatedRoute exact path="/user" component={User} />
      </Switch>
    </div>
  )
}

export default App
