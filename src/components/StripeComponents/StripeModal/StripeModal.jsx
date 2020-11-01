import './StripeModal.css'
import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import CheckoutForm from "../../StripeComponents/CheckoutForm/CheckoutForm"


const stripePromise = loadStripe("pk_test_51HQGSzAht42ulJLICiMtO9fDINNmtf44YOqX7XKBoh7JStN8sNnYuIFAZHfMsYnux5ms4F02OJ2qomTIOnrkOob700aMj5mGjw")

export default function StripeModal({onClick, plan, onCloseModal}) {
    return (

        <div className="AppWrapper CheckoutModal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-4 creditcard">
                        <span className="close" onClick={onCloseModal}></span>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm plan={plan} onClick={onClick} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    )
}
