import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import Classroom from './components/Layouts/Classrooms/Classroom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import GymsCenters from './components/Layouts/GymsCenters/GymsCenters'
import GymSingle from './components/Layouts/GymSingle/GymSingle'
import Lessons from './components/Layouts/Lessons/Lessons'
import Login from './components/Login/Login'
import MyInfo from './components/MyInfo/MyInfoGuest/MyInfo'
import MyInfoAdmin from './components/MyInfo/MyInfoAdmin/MyInfoAdmin'
import MyInfoGym from './components/MyInfo/MyInfoGym/MyInfoGym'
import MyInfoInstructor from './components/MyInfo/MyInfoInstructor/MyInfoInstructor'
import Register from './components/Register/Register'
import {useAuthContext} from './contexts/AuthContext'
import EditLesson from './components/Layouts/EditLesson/EditLesson'
import EditClassroom from './components/Layouts/EditClassroom/EditClassroom'
import Footer from './components/Footer/Footer'
import Manifiesto from './components/Layouts/Manifiesto/Manifiesto'
import Trainers from './components/Layouts/Trainers/Trainers'
import Features from './components/Layouts/Features/Features'
import InstructorCenter from './components/Layouts/InstructorCenter/InstructorCenter'
import InstructorSingle from './components/Layouts/InstructorSingle/InstructorSingle'
import Calendar from './components/Layouts/Calendar/Calendar'

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      {<Header addLesson />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" login component={Login} />
        <Route exact path="/register" login component={Register} />
        <Route exact path="/manifiesto" component={Manifiesto} />
        <Route exact path="/trainers" component={Trainers} />
        <Route exact path="/features" component={Features} />
        <Route exact path='/activate/:token' render={(props) => <Login {...props} confirmed />} />
        <AuthenticatedRoute exact path="/gyms" render={(props) => <GymsCenters {...props} user={user} />} />
        <AuthenticatedRoute exact path="/instructors" render={(props) => <InstructorCenter {...props} user={user} />} />
        <AuthenticatedRoute exact path="/my-info" render={(props) => <MyInfo {...props} user={user} />} />
        <AuthenticatedRoute exact path="/my-info-admin" render={(props) => <MyInfoAdmin {...props} user={user} />} />
        <AuthenticatedRoute exact path="/my-info-gym" render={(props) => <MyInfoGym {...props} user={user.user} gym={user} />} />
        <AuthenticatedRoute exact path="/my-info-instructor" render={(props) => <MyInfoInstructor {...props} user={user.user} instructor={user} />} />
        <AuthenticatedRoute path='/gym-detail' render={(props) => <GymSingle {...props} user={user} />} />
        <AuthenticatedRoute path='/instructor-detail' render={(props) => <InstructorSingle {...props} user={user} />} />
        <AuthenticatedRoute path='/edit-lesson' render={(props) => <EditLesson {...props} user={user} />} />
        <AuthenticatedRoute path='/lessons' render={(props) => <Lessons {...props} user={user} />} />
        <AuthenticatedRoute path='/edit-classroom' render={(props) => <EditClassroom {...props} user={user} />} />
        <AuthenticatedRoute path='/calendar' render={(props) => <Calendar {...props} user={user} />} />
        <AuthenticatedRoute path='/classrooms' render={(props) => <Classroom {...props} user={user} />} />
        {user && <Redirect to='/my-info' />}
        {/* if user && user.role admin, gym, guest or instructor redirect to something different */}
        {!user && <Redirect to='/' />}
      </Switch>
      <Footer />
    </div>
  )
}

export default App
