import './Trainers.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Trainers() {
    return (
        <main role="main" className="Trainers">
            <div className="module banner manifiesto trainers-top">
                <span className="welcome-text text-center">
                    <h1>BUILT FOR WORKOUT COACHES <br />WHO LOVE TO SEE YOU STRIVE</h1>
                    <p>Add value to customers, wherever you go.<br />
                    Satisfy user needs with their experiences in mind.
        </p>
                </span>
            </div>
            <section className="container only-text">
                <div className="col-12 text-center">
                    <h1 className="yellow-color">power your workout with</h1>
                    <h2>A full digital agenda</h2>
                    <p>Each workout session requires logistics and coordination, with the proper amount of resources. Be able to plan your suscriptions, booings, credits, and management tasks ahead of time and dedicate more time to your people.</p>
                    <h2>Customer experience</h2>
                    <p>Provide workouts with great experience.<br />
          Deliver on your customer service promise hassle free, and add more comfort and convenience to your customer. Everytime.</p>
                    <h2>Your business moments</h2>
                    <p>Now you can truly relax. Stay on top of your business with real time data and cloud business tools that allow you to track and manage everything. Plan suscriptions, bookings, check-ins, sales and seasonal assistance to get your business back.</p>
                    <h2>great expectations</h2>
                    <p>Now you can focus on your customer goals, and track their progress to better fit their expectations. Offer a more personalized experience and cater to everyone individually. Get them back.</p>
                    <hr />
                    <h2>Beautiful, simple and easy to use</h2>
                    <p>Workout Easily. Manage Beautifully.<br />
          No software needed.<br />
          Quick to operate.</p>
                    <div className="victorious-visuals"></div>
                </div>
            </section>
            <section className="container-fluid gradient text-center" id="features-block">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8">
                        <h1>Spend more time training. less managing.</h1>
                        <p> Power your workouts and provide a service with a full digital experience.</p>
                        <p>We are the tecnology partner that will help you make the most of your classes and stay ahead of the competition.</p>
                        <br />
                        <Link to="/features">Meet the features</Link>
                    </div>
                </div>
            </section>
            <section className="container-fluid text-center" id="reserve">
                    <div className="col-12 col-sm-6">
                        <h1>Work with us</h1>
                        <p>We were built to fit any workout agenda.</p>
                        <h1 className="top">Are you and active person?</h1>
                        <p className="distancia">Share the love. Notify your trainer or workout center</p>
                    </div>
            </section>
        </main>
    )
}
