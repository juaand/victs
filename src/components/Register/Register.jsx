import './Register.css'
import React, {useState} from 'react'
import {register} from '../../services/ApiClient'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Form/Button/Button'
import SelectWithLabel from '../Form/SelectWithLabel/SelectWithLabel'
import backImage from '../../images/fondo-login.jpg'
import {useHistory} from 'react-router-dom'

const validations = {
    name: v => v.length,
    email: v => v.length,
    password: v => v.length,
    role: v => v.length
}

const Register = () => {
    const [state, setState] = useState({
        data: {
            name: "",
            email: "",
            password: "",
            role: ""
        },
        error: {
            name: true,
            email: true,
            password: true
        },
        touch: {},
    })

    const history = useHistory();

    const [registerError, setRegisterError] = useState(null)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await register(data)
            history.push('/login')
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleChange = (event) => {
        setRegisterError(null)
        const {name, value} = event.target

        const validationFn = validations[name]

        const isValid = validationFn(value)

        setState(prev => {
            return {
                ...prev,
                data: {
                    ...prev.data,
                    [name]: value,
                },
                error: {
                    ...prev.error,
                    [name]: !isValid,
                }
            }
        })
    }

    const handleBlur = (event) => {
        const {name} = event.target

        setState(prev => {
            return {
                ...prev,
                touch: {
                    ...touch,
                    [name]: true
                }
            }
        })
    }

    const isError = Object.values(error).some(err => err)

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
                        <h1>Register</h1>

                        <form onSubmit={handleSubmit}>

                            <InputWithLabel
                                value={data.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name"
                                type="text"
                                className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                placeholder="Enter your name"

                            />


                            <InputWithLabel
                                value={data.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="email"
                                type="text"
                                className={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                placeholder="Enter email"

                            />

                            <InputWithLabel
                                value={data.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="password"
                                type="password"
                                className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                            />

                            <SelectWithLabel
                                name="role"
                                value={data.role}
                                onChange={handleChange}
                            />

                            {registerError && <div className="alert alert-danger">{registerError}</div>}

                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={isError}
                            >Register</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register