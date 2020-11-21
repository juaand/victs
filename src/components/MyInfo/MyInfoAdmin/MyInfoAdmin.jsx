import React, { useEffect, useState } from "react";
import { getAllData } from "../../../services/ApiClient";
import {Link, NavLink} from 'react-router-dom'
import AdminUsers from "./AdminUsers/AdminUsers";
import AdminInstructors from "./AdminInstructors/AdminInstructors";
import AdminGyms from "./AdminGyms/AdminGyms";
import ModalEditUser from "../../ModalEditUser/ModalEditUser";



export default function MyInfoAdmin() {
  const [allData, setAllData] = useState([]);
  const [userBool, setUserBool] = useState(false)
  const [instructorsBool, setInstructorsBool] = useState(false)
  const [gymsBool, setGymsBool] = useState(false)
  const [bool, setBool] = useState(false)
  const [userInfo, setUserInfo] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllData();
      setAllData(result);
      console.log(result);
    };
    fetchData();
  }, []);

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
  }
  const showInstructors = () => {
    setInstructorsBool(!instructorsBool)
    setUserBool(false)
    setGymsBool(false)
  }
  const showGyms = () => {
    setGymsBool(!gymsBool)
    setInstructorsBool(false)
    setUserBool(false)
  }

  return (
    <>
    {bool && <ModalEditUser user={userInfo} onClick={hideModal} />}
      <nav class="navbar navbar-expand-lg navbar-light bg-light margin-top">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
          VICTS Control
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Admin <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
            <Link className="nav-link" onClick={showUsers} >Users</Link>
            </li>
            <li class="nav-item">
            <Link className="nav-link" onClick={showInstructors} >Instructors</Link>
            </li>
            <li class="nav-item">
            <Link className="nav-link" onClick={showGyms} >Gyms</Link>
            </li>
            <li class="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/admin-reservations">Reservations</NavLink>
            </li>
            <li class="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/admin-orgs">ORG's</NavLink>
            </li>
            <li class="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/admin-statistics">Statistics</NavLink>
            </li>
            <li class="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/admin-invoices">Invoices</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      { userBool && <AdminUsers onClick={(userId) => showModal(userId)} data={allData[0]}/>}
      { instructorsBool && <AdminInstructors data={allData[2]} />}
      { gymsBool && <AdminGyms data={allData[1]} />}

    </>
  );
}
