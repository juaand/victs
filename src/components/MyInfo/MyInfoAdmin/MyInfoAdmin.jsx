import React, { useEffect, useState } from "react";
import { getAllData } from "../../../services/ApiClient";
import { Link, NavLink } from "react-router-dom";
import AdminUsers from "./AdminUsers/AdminUsers";
import AdminInstructors from "./AdminInstructors/AdminInstructors";
import AdminGyms from "./AdminGyms/AdminGyms";
import AdminReservations from "./AdminReservations/AdminReservations";
import AdminLessons from "./AdminLessons/AdminLessons";
import AdminOrgs from "./AdminOrgs/AdminOrgs";
import ModalEditUser from "../../ModalEditUser/ModalEditUser";
import ModalEditInstructor from "../../ModalEditInstructor/ModalEditInstructor";
import ModalEditGym from "../../ModalEditGym/ModalEditGym";
import ModalEditLesson from "../../ModalEditLesson/ModalEditLesson";
import ModalEditReservation from "../../ModalEditReservation/ModalEditReservation";
import ModalEditOrg from "../../ModalEditOrg/ModalEditOrg";

export default function MyInfoAdmin() {
  const [allData, setAllData] = useState([]);
  const [userBool, setUserBool] = useState(false);
  const [instructorsBool, setInstructorsBool] = useState(false);
  const [gymsBool, setGymsBool] = useState(false);
  const [reservationsBool, setReservationsBool] = useState(false);
  const [lessonsBool, setLessonsBool] = useState(false);
  const [orgsBool, setOrgsBool] = useState(false);
  const [bool, setBool] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [instructorInfo, setInstructorInfo] = useState([]);
  const [gymInfo, setGymInfo] = useState([]);
  const [lessonInfo, setLessonInfo] = useState([]);
  const [reservationInfo, setReservationInfo] = useState([]);
  const [orgInfo, setOrgInfo] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllData();
      setAllData(result);
      console.log(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllData();
      setAllData(result);
      console.log(result);
    };
    fetchData();
  }, [!bool]);

  const showModal = (userId) => {
    setBool(!bool);
    setUserInfo(userId);
  };

  const showModalInstructor = (userId) => {
    setBool(!bool);
    setInstructorInfo(userId);
  };

  const showModalGym = (userId) => {
    setBool(!bool);
    setGymInfo(userId);
  };

  const showModalLesson = (userId) => {
    setBool(!bool);
    setLessonInfo(userId);
  };

  const showModalReservation = (userId) => {
    setBool(!bool);
    setReservationInfo(userId);
  };

  const showModalOrg = (userId) => {
    setBool(!bool);
    setOrgInfo(userId);
  };

  const hideModal = async () => {
    const result = await getAllData();
    setAllData(result);
    setBool(!bool);
  };

  const showUsers = () => {
    setUserBool(!userBool);
    setInstructorsBool(false);
    setGymsBool(false);
    setReservationsBool(false);
    setLessonsBool(false);
    setOrgsBool(false);
  };
  const showInstructors = () => {
    setInstructorsBool(!instructorsBool);
    setUserBool(false);
    setGymsBool(false);
    setReservationsBool(false);
    setLessonsBool(false);
    setOrgsBool(false);
  };
  const showGyms = () => {
    setGymsBool(!gymsBool);
    setUserBool(false);
    setInstructorsBool(false);
    setReservationsBool(false);
    setLessonsBool(false);
    setOrgsBool(false);
  };

  const showReservations = () => {
    setReservationsBool(!reservationsBool);
    setUserBool(false);
    setInstructorsBool(false);
    setGymsBool(false);
    setLessonsBool(false);
    setOrgsBool(false);
  };

  const showLessons = () => {
    setLessonsBool(!lessonsBool);
    setUserBool(false);
    setInstructorsBool(false);
    setGymsBool(false);
    setReservationsBool(false);
    setOrgsBool(false);
  };

  const showOrgs = () => {
    setOrgsBool(!orgsBool);
    setUserBool(false);
    setInstructorsBool(false);
    setGymsBool(false);
    setReservationsBool(false);
    setLessonsBool(false);
  };

  return (
    <>
      {bool && userBool && (
        <ModalEditUser user={userInfo} onClick={hideModal} />
      )}
      {bool && instructorsBool && (
        <ModalEditInstructor user={instructorInfo} onClick={hideModal} />
      )}
      {bool && gymsBool && <ModalEditGym user={gymInfo} onClick={hideModal} />}
      {bool && lessonsBool && (
        <ModalEditLesson user={lessonInfo} onClick={hideModal} />
      )}
      {bool && reservationsBool && (
        <ModalEditReservation user={reservationInfo} onClick={hideModal} />
      )}

      {bool && orgsBool && <ModalEditOrg user={orgInfo} onClick={hideModal} />}

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
              <Link className="nav-link" onClick={showUsers}>
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showInstructors}>
                Instructors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showGyms}>
                Gyms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showReservations}>
                Reservations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showLessons}>
                Lessons
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={showOrgs}>
                ORG's
              </Link>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/admin-statistics"
              >
                Statistics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/admin-invoices"
              >
                Invoices
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {userBool && (
        <AdminUsers onClick={(userId) => showModal(userId)} data={allData[0]} />
      )}
      {instructorsBool && (
        <AdminInstructors
          onClick={(userId) => showModalInstructor(userId)}
          data={allData[2]}
        />
      )}
      {gymsBool && (
        <AdminGyms
          onClick={(userId) => showModalGym(userId)}
          data={allData[1]}
        />
      )}
      {reservationsBool && (
        <AdminReservations
          onClick={(userId) => showModalReservation(userId)}
          data={allData[4]}
        />
      )}
      {lessonsBool && (
        <AdminLessons
          onClick={(userId) => showModalLesson(userId)}
          data={allData[3]}
        />
      )}
      {orgsBool && (
        <AdminOrgs
          onClick={(userId) => showModalOrg(userId)}
          data={allData[5]}
        />
      )}
    </>
  );
}
