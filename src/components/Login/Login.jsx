import './Login.css'
import React, {useState, useEffect} from 'react'
import {useAuthContext} from '../../contexts/AuthContext'
import {login} from '../../services/ApiClient'
import {activateUser} from '../../services/ApiClient'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Form/Button/Button'
import {Link, Redirect} from 'react-router-dom'
import backImage from '../../images/fondo-login.jpg'
import {useFormState} from '../../hooks/useFormState'


const Login = (props) => {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                email: "",
                password: ""
            },
            error: {
                email: true,
                password: true
            },
            touch: {},
        },
        {
            email: v => v.length,
            password: v => v.length
        }
    )

    const [activate, setActivate] = useState(false)

    useEffect(() => {
        if (props.confirmed) {
            const token = props.match.params.token
            activateUser(token)
                .then(() => setActivate(true))
        }
    }, [])

    const {user} = useAuthContext()

    const [loginError, setLoginError] = useState(null)

    const authContext = useAuthContext()

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const user = await login(data)
            authContext.login(user)
        } catch (err) {
            setLoginError(err.response?.data?.message)
        }
    }


    const isError = Object.values(error).some(err => err)

    if (user) {
        return <Redirect to="/my-info" />
    }

    return (
        <>
            <style>
                {`
                body {
                    background: url(${backImage}) no-repeat top center / cover;
                }
                `}
            </style>
            <div className="container-fluid my-info">
                <div className="row center">
                    <div className="col-sm-6 col-xl-4 col-11 login-block">
                        <h1>log in</h1>

                        {activate && <div className="message">User has been activated succesfully, please log in</div>}

                        <form onSubmit={handleSubmit}>

                            <InputWithLabel
                                value={data.email}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="email"
                                type="text"
                                className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                placeholder="Enter email"

                            />

                            <InputWithLabel
                                value={data.password}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="password"
                                type="password"
                                className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                            />

                            {loginError && <div className="alert alert-danger">{loginError}</div>}


                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={isError}
                            >Log in</Button>
                        </form>
                        <div className="col-12 d-flex justify-content-center options">
                            <Link to="/register"><strong>Register here</strong></Link>
                            <Link to="/forgot-password">forgot your password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login