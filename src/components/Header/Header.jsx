import './Header.css'
import React  from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useAuthContext} from '../../contexts/AuthContext'


const Header = () => {

    const {user} = useAuthContext()

    const {logout} = useAuthContext()

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="header-user">
                            <Link className="navbar-brand" to="/">
                                <div className="victs-logo"></div>
                            </Link>
                            {user && user.role === 'Guest' && <div className="user-hi">Hi {user.name}</div>}
                            {user && user.role === 'Gym' && <div className="user-hi">Hi {user.user.name}</div>}
                            {user && user.role === 'Instructor' && <div className="user-hi">Hi {user.user.name}</div>}
                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarToggle"
                            aria-controls="navbarToggle"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="far"
                                data-icon="bars"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
                                ></path>
                            </svg>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarToggle">
                            <ul className="navbar-nav col-12 col-sm-10 p-0">
                                {user && user.role === 'Guest' &&
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                                        </li>
                                    </> }

                                {user && user.user && user.user.role === 'Gym' &&
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/lessons">Add lesson</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/instructors">My Instructors</NavLink>
                                        </li>
                                    </>}

                                {user && user.user && user.user.role === 'Instructor' &&
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/lessons">Add lesson</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/history">History</NavLink>
                                        </li>
                                    </>}

                                {user &&
                                    <span className="user-logs">
                                        <li>
                                            <NavLink to="/" className="nav-link login" onClick={logout}>Logout</NavLink>
                                        </li>
                                    </span> }


                                {!user &&
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/trainers">Trainers & Centers</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/features">Features</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/manifiesto">Manifiesto</NavLink>
                                        </li>
                                        <span className="user-logs">
                                            <li className="nav-item">
                                                <NavLink className="nav-link login" to="/login">Login</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/register">Register</NavLink>
                                            </li>
                                        </span>
                                    </>
                                }

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header