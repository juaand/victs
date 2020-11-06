import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className="module banner">
                <span className="welcome-text text-center">
                    <h1>THE FUTURE FOR ACTIVE, HEALTHY PEOPLE IS HERE</h1>
                    <p>
                        A platform that brings together<br />
          trainers and workout centers closer to everyone, get to know
        </p>
                    <div className="victs-logo"></div>
                </span>
            </div>
            <div className="module accordeon">
                <div className="accordion" id="accordionExample" aria-multiselectable="true">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                data-parent="#accordionExample"
                            >
                                Learn more
              <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="far"
                                    data-icon="plus-circle"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M384 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm120 16c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-48 0c0-110.5-89.5-200-200-200S56 145.5 56 256s89.5 200 200 200 200-89.5 200-200z"
                                        className=""
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <div
                            id="collapseOne"
                            className="collapse"
                            aria-labelledby="headingOne"
                            data-parent="#accordionExample"
                        >
                            <div className="card-body">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-sm-8 text-center">
                                            <button
                                                className="btn btn-link btn-block"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                                data-parent="#accordionExample"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    data-prefix="fal"
                                                    data-icon="times-circle"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    className="svg-inline--fa fa-times-circle fa-w-16 fa-2x"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"
                                                        className=""
                                                    ></path>
                                                </svg>
                                            </button>
                                            <h1>SIMPLE MANAGEMENT</h1>
                                            <p>
                                                Victorius is a platform that simplifies the management of
                                                your workout sessions with a digital agenda, className
                                                bookings, payment tracking and so much more. Manage your
                                                full business cycle with a moderm software platform, and
                                                never miss a thing again.
                    </p>

                                            <h1>GROWTH OPPORTUNITIES</h1>
                                            <p>
                                                Post your activities and sessions, and allow your customer
                                                to find out what you are up to at their covenience. Build
                                                your comunity in a digital space and be more active than
                                                ever.
                    </p>

                                            <Link to="/trainers" className="outline">Trainers & Centers</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="module bg shape-your-way">
                <h1>lives <br /><strong>everywhere</strong></h1>
            </div>
            <div className="module dark">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 col-12 text-center">
                            <h1>TRAINER OR WORKOUT CENTER?</h1>
                            <p>
                                Wanna take a look to our demo? <br />Please contact us and we will
              send you an invitation.
            </p>

                            <h1>ARE YOU AND ACTIVE PERSON?</h1>
                            <p>Share the love. Notify your trainer or workout center.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="module accordeon">
                <div
                    className="accordion"
                    id="accordionManifiesto"
                    aria-multiselectable="true"
                >
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#manifiesto"
                                aria-expanded="true"
                                aria-controls="manifiesto"
                                data-parent="#accordionManifiesto"
                            >
                                Learn more
              <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="far"
                                    data-icon="plus-circle"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M384 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm120 16c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-48 0c0-110.5-89.5-200-200-200S56 145.5 56 256s89.5 200 200 200 200-89.5 200-200z"
                                        className=""
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <div
                            id="manifiesto"
                            className="collapse"
                            aria-labelledby="headingOne"
                            data-parent="#accordionManifiesto"
                        >
                            <div className="card-body">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-12 text-center">
                                            <button
                                                className="btn btn-link btn-block"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#manifiesto"
                                                aria-expanded="true"
                                                aria-controls="manifiesto"
                                                data-parent="#accordionManifiesto"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    data-prefix="fal"
                                                    data-icon="times-circle"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    className="svg-inline--fa fa-times-circle fa-w-16 fa-2x"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"
                                                        className=""
                                                    ></path>
                                                </svg>
                                            </button>
                                            <h1>
                                                CONNECT, SO YOU CAN MANAGE YOUR ACTIVE & ENERGETIC
                                                LIFESTYLE
                    </h1>
                                            <h3>ENERGETIC & ACTIVE PEOPLE</h3>
                                            <div className="row">
                                                <div className="col-12 col-sm-4 block">
                                                    <h1>EXPLORE</h1>
                                                    <p>
                                                        Look for the activities calendar, and find out what
                                                        you are interested in, checkout the details, and book.
                        </p>
                                                </div>
                                                <div className="col-12 col-sm-4 block">
                                                    <h1>BOOK & CHECK-IN</h1>
                                                    <p>
                                                        Make your booking through a personalized profile and
                                                        make sure your spot is yours. Don’t ever miss anything
                                                        again.
                        </p>
                                                </div>
                                                <div className="col-12 col-sm-4 block">
                                                    <h1>PAY & TRACK</h1>
                                                    <p>
                                                        Buy credits or pay for a plan and track everything.
                                                        Your payments, balance, training history and more.
                        </p>
                                                </div>
                                            </div>
                                            <Link to="/manifiesto" className="outline">Manifiesto</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="module bg scroll">
                <h1><strong>shapes</strong> <br />your way</h1>
                <div className="overlay"></div>
            </div>
        </>
    )
}

export default Home