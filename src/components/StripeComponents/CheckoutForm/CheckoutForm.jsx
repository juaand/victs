import './CheckoutForm.css'
import React, {useState} from 'react'
import {useStripe, CardElement, useElements} from "@stripe/react-stripe-js"
import {stripeInfo} from "../../../services/ApiClient"
import {useAuthContext} from '../../../contexts/AuthContext'


const CardField = ({onChange}) => (
    <div className="FormRow">
        <CardElement onChange={onChange} />
    </div>
)

const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange,
    className
}) => (
        <div className={className}>
            <label htmlFor={id} className="FormRowLabel">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
            />
        </div>
    )

const ResetButton = ({onClick}) => (
    <button type="button" className="ResetButton btn" onClick={onClick}>
        Make another payment
    </button>
)

const SubmitButton = ({processing, error, children, disabled, onClick}) => (
    <button
        className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
        type="submit"
        disabled={processing || disabled}
        onClick={onClick}
    >
        {processing ? "Processing..." : children}
    </button>
)

const ErrorMessage = ({children}) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
)

const CheckoutForm =
    ({plan}) => {
        const stripe = useStripe()
        const elements = useElements()
        const [error, setError] = useState(null)
        const [cardComplete, setCardComplete] = useState(false)
        const [processing, setProcessing] = useState(false)
        const [paymentMethod, setPaymentMethod] = useState(null)
        const [billingDetails, setBillingDetails] = useState({
            email: "",
            phone: "",
            name: "",
        })

        const {login} = useAuthContext()


        const handleSubmit = async (event) => {
            event.preventDefault()

            if (!stripe || !elements) {
                // Stripe.js has not loaded yet. Make sure to disable
                // form submission until Stripe.js has loaded.
                return
            }

            if (error) {
                elements.getElement("card").focus()
                return
            }

            if (cardComplete) {
                setProcessing(true)
            }

            const payload = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: billingDetails,
            })

            setProcessing(false)

            if (!payload.error) {
                const {id} = payload.paymentMethod
                const data = await stripeInfo({
                    id,
                    plan,
                })
                login(data)
                setPaymentMethod(payload.paymentMethod)
            } else {
                setError(payload.error)
            }
        }

        const reset = () => {
            setError(null)
            setProcessing(false)
            setPaymentMethod(null)
            setBillingDetails({
                email: "",
                phone: "",
                name: "",
            })
        }

        return paymentMethod ? (
            <div className="Result">
                <div className="ResultTitle" role="alert">
                    Payment successful
        </div>
                <div className="ResultMessage">
                    Thanks for trying Stripe Elements. No money was charged, but we
          generated a PaymentMethod: {paymentMethod.id}

                </div>
                <ResetButton onClick={reset} />
            </div>
        ) : (

                <form className="Form" onSubmit={handleSubmit}>
                    <div className="cc">
                        <fieldset className="FormGroup">
                            <CardField
                                onChange={(e) => {
                                    setError(e.error)
                                    setCardComplete(e.complete)
                                }}
                            />
                        </fieldset>
                        <fieldset className="FormGroup __name">
                            <Field
                                className="FormRowInput"
                                label="Name"
                                id="name"
                                type="text"
                                placeholder="Insert your name here"
                                required
                                autoComplete="name"
                                value={billingDetails.name}
                                onChange={(e) => {
                                    setBillingDetails({...billingDetails, name: e.target.value})
                                }}
                            />
                        </fieldset>
                    </div>
                    <fieldset className="FormGroup row">
                        <Field
                            className="FormRowInput col-12"
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="janedoe@gmail.com"
                            required
                            autoComplete="email"
                            value={billingDetails.email}
                            onChange={(e) => {
                                setBillingDetails({...billingDetails, email: e.target.value})
                            }}
                        />
                        <Field
                            className="FormRowInput col-12"
                            label="Phone"
                            id="phone"
                            type="tel"
                            placeholder="(941) 555-0123"
                            required
                            autoComplete="tel"
                            value={billingDetails.phone}
                            onChange={(e) => {
                                setBillingDetails({...billingDetails, phone: e.target.value})
                            }}
                        />
                    </fieldset>

                    {error && <ErrorMessage>{error.message}</ErrorMessage>}

                    <div className="d-flex justify-content-center">
                        <SubmitButton processing={processing} error={error} disabled={!stripe} onClick={handleSubmit}>
                            Pay € {plan.price}
                        </SubmitButton>
                    </div>

                </form>
            )
    }

export default CheckoutForm