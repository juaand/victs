import React, {useEffect, useState} from "react"
import {getAllData} from "../../../services/ApiClient"
import {Link, NavLink} from 'react-router-dom'
import AdminUsers from "./AdminUsers/AdminUsers"
import AdminInstructors from "./AdminInstructors/AdminInstructors"
import AdminGyms from "./AdminGyms/AdminGyms"
import ModalEditUser from "../../ModalEditUser/ModalEditUser"
import AdminReservations from "./AdminReservations/AdminReservations"
import AdminLessons from "./AdminLessons/AdminLessons"



export default function MyInfoAdmin() {
  const [allData, setAllData] = useState([])
  const [userBool, setUserBool] = useState(false)
  const [instructorsBool, setInstructorsBool] = useState(false)
  const [gymsBool, setGymsBool] = useState(false)
  const [reservationsBool, setReservationsBool] = useState(false)
  const [lessonsBool, setLessonsBool] = useState(false)
  const [bool, setBool] = useState(false)
  const [userInfo, setUserInfo] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllData()
      setAllData(result)
      console.log(result)
    }
    fetchData()
  }, [])

  const showModal = (userId) => {
    setBool(!bool)
    setUserInfo(userId)
  }

  const hideModal = () => {
    setBool(!bool)
  }

  const showUsers = () => {
    setUserBool(!userBool)
    setInstructorsBool(false)
    setGymsBool(false)
    setReservationsBool(false)
    setLessonsBool(false)
  }
  const showInstructors = () => {
    setInstructorsBool(!instructorsBool)
    setUserBool(false)
    setGymsBool(false)
    setReservationsBool(false)
    setLessonsBool(false)
  }
  const showGyms = () => {
    setGymsBool(!gymsBool)
    setUserBool(false)
    setInstructorsBool(false)
    setReservationsBool(false)
    setLessonsBool(false)
  }

  const showReservations = () => {
    setReservationsBool(!reservationsBool)
    setUserBool(false)
    setInstructorsBool(false)
    setGymsBool(false)
    setLessonsBool(false)
  }

  const showLessons = () => {
    setLessonsBool(!lessonsBool)
    setUserBool(false)
    setInstructorsBool(false)
    setGymsBool(false)
    setReservationsBool(false)
  }

  return (
    <>
      {bool && <ModalEditUser user={userInfo} onClick={hideModal} />}
      <nav className="navbar navbar-expand-lg navbar-light bg-light margin-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          VICTS Control
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Admin <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showUsers} >Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showInstructors} >Instructors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showGyms} >Gyms</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showReservations} >Reservations</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" onClick={showLessons} >Lessons</Link>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/admin-invoices">ORG's</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/admin-statistics">Statistics</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/admin-invoices">Invoices</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      { userBool && <AdminUsers onClick={(userId) => showModal(userId)} data={allData[0]} />}
      { instructorsBool && <AdminInstructors data={allData[2]} />}
      { gymsBool && <AdminGyms data={allData[1]} />}
      { reservationsBool && <AdminReservations data={allData[4]} />}
      { lessonsBool && <AdminLessons data={allData[3]} />}
    </>
  )
}
