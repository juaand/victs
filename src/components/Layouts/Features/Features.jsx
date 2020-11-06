import './Features.css'
import React from 'react'

export default function Features() {
    return (
        <main role="main" className="Features">
            <div className="module banner manifiesto features-top">
                <span className="welcome-text text-center">
                    <h1>THIS IS YOUR CORE</h1>
                    <p>Features to power your succes</p>
                </span>
            </div>
            <section className="container-fluid" id="power-block">
                <div className="container text-center d-flex justify-content-center">
                    <div className="col-sm-10 col-12">
                        <h2>Your Digital Workout Agenda.<br />The core of your business.</h2>
                        <p>Your sessions at their fingertips. Post your classes and information and have your team, customers and potential members stay up to date on your activities.</p>

                        <p>With a fresh and moderm calendar interface, specifically developed with users in mind, you can easily post your workput sessions and get the most bang for your buck. The calendar is a powerful dashboard tool that lets you and your members stay on top of sessions, instructors, class status, reservations and check-ins with easy to manage options.</p>
                        <br />
                        <div className="calendar" ></div>


                        <h2>TRX, Pilates, Yoga, Bootcamp, Crossfit, and others.</h2>
                    </div>
                </div>
            </section>
            <section className="container-fluid" id="features-section">
                <div className="container no-padding">
                    <div className="row">
                        <div className="details col-sm-6 col-12"></div>
                        <div className="col-sm-6 col-12 d-flex align-items-start justify-content-center flex-column">
                            <h2>Booking Engine</h2>
                            <p>Powerful Booking Engine That Rules And Governs The Core</p>

                            <p>The booking engine is the brain that handles the complexities and logistics of your agenda. Because sessions are more than activities listed in a calendar, the calendar is the responsable to brain power the activity to manage and avoid collision betwen rooms, instructors and asistance, session ocurrencies, class status and manage booking quee as per session. </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-12 d-flex align-items-start justify-content-center flex-column">
                            <h2>Payments & Payment Engine</h2>
                            <p>Payments Recolecction Made Easy And Versatile
                            Sessions are ment to reward the work as per users booking & check-in.
The payments engine is all you need to be able to collect and manage upfront the sales according to the business rules for each customer that wants to jump into. </p>
                            <p>Improve your cash flow.</p>
                        </div>
                        <div className="payment col-sm-6 col-12"></div>
                    </div>
                </div>
            </section>
            <section className="container-fluid no-padding" id="core-block">
                <div className="col-12 col-sm-8 text-center">
                    <h1>And many others that build on top of the CORE</h1>
                    <p>Redefine your service and customer workouts and provide a great experience with a powerfull platform that helps you maintain
            everyone active and healthy life. </p>

                    <p>Our features are equiped to take on even the most robust centers.</p>

                    <p>Administrative<br />
Staff Management<br />
Business Rules & Personalization<br />
Analytics<br />
Support</p>
                    <h1 className="top">There is more than convinience</h1>
                    <h2>The is Strengh in your business.</h2>
                    <h2>Suitable</h2>

                    <p>Reliable platform that allows training professionals to manage their business in a ubiquitous and professional manner. From anywhere and from any device, web desktop, tablet or smartphone, you can connect to coordinate classes, assistance, costs and metrics.</p>


                    <h2>Connect</h2>

                    <p>The tool is the meeting point between your business and your customers. All communication management takes place in a digital environment with a super simple, professional experience that promotes the commitment through social aspects that generate a community environment that boosts compromises one day at a time.</p>


                    <h2>Stand Out</h2>

                    <p>Challenge your customers and encourage them to go the extra mile in each training, and over time, help each coach stand out and inspire their clients to achieve their personal goals.</p>

                    <h3>READY?</h3>
                </div>
            </section>
            <section className="container-fluid no-padding" id="blue-core-block">
                <div className="col-12 col-sm-8 text-center">
                    <h2>How is the usual setup ?</h2>

                    <p>Setup is simple. Register yourself or brand. Setup your instructors. Setup your sessions schedule. Add or import your customers. Invite them to register. Define your suscription model & prices. Add plans to customers based on their requests. Start booking and chek-in. Start tracking and managing beatifully. </p>

                    <h2>How to book & check-in customers?</h2>

                    <p>Either you are a solo trainer, a community of trainers or workout center you can manage your booking & check-in on a daily basis at your covience. Booking & Check-in is restricted to users plan suscriptions and credits to keep track of the sales & purchase path. Free passes are alowed and also tracked. </p>

                    <h2>Adding a customer for the first time</h2>

                    <p>Simple as a phone directory. Featured as a Customer Relationship Managament (CRM). Customers can be added from your user view or they can register at your business profile. And inmediatly they have access to your session schedulle. </p>

                    <h2>How does Community works?</h2>

                    <p>Thinking ahead. Activite people wants freedom and it is more about them than about you.</p>

                    <p>Through Victorius Community activist users uses their accounts as single sigon to access multiple trainers or workout centers to have a unify digital agenda. And access the comunity services.  </p>

                    <h2>Plan suscription setup</h2>

                    <p>Victorius Platform is meant for a digital agenda of activities, management booking, services plans, customers and full business cycle ready to suit your custom needs.</p>

                    <p>If you are a brand with a business setup and requirements that need customized platform and services to satify custom business and brand requests you can access Victorius Platform throug Victorius Customization Services (CS). </p>
                </div>
            </section>
        </main>
    )
}
