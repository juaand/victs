import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import GymsCenters from './components/Layouts/GymsCenters/GymsCenters'
import GymSingle from './components/Layouts/GymSingle/GymSingle'
import Login from './components/Login/Login'
import MyInfo from './components/MyInfo/MyInfoGuest/MyInfo'
import MyInfoGym from './components/MyInfo/MyInfoGym/MyInfoGym'
import MyInfoInstructor from './components/MyInfo/MyInfoInstructor/MyInfoInstructor'
import Register from './components/Register/Register'
import {useAuthContext} from './contexts/AuthContext'

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      {<Header />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/activate/:token' render={(props) => <Login {...props} confirmed />} />
        <AuthenticatedRoute exact path="/gyms" render={(props) => <GymsCenters {...props} user={user} />} />
        <AuthenticatedRoute exact path="/my-info" render={(props) => <MyInfo {...props} user={user} />} />
        <AuthenticatedRoute exact path="/my-info-gym" render={(props) => <MyInfoGym {...props} user={user.user} gym={user} />} />
        <AuthenticatedRoute exact path="/my-info-instructor" render={(props) => <MyInfoInstructor {...props} user={user.user} instructor={user} />} />
        <AuthenticatedRoute path='/gym-detail' render={(props) => <GymSingle {...props} user={user} />} />
        {user && <Redirect to='/my-info'/>}
        {!user && <Redirect to='/' />}
      </Switch>
    </div>
  )
}

export default App
