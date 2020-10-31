import './Button.css'
import React from 'react'

const Button = ({className, onClick, children, row, seat}) => {
    return (
        <button row={row} seat={seat} className={className} onClick={onClick}>{children}</button>
    )
}

export default Button