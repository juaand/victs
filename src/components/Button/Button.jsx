import './Button.css'
import React from 'react'

const Button = ({className, onClick, children}) => {
    return (
        <button className={className} onClick={onClick}>{children}</button>
    )
}

export default Button