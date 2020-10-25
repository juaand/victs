import './InputFile.css'
import React from 'react'

export default function InputFile({value, name, type, className}) {
    return (
        <div className="form-group file-group">
            <label className="label" htmlFor={name}>{name}</label>
            <div className="custom-file">
                <input type={type} className="custom-file-input" id={name}
                    name={name} defaultValue={value} />
                <label className={`custom-file-label ${className}`} htmlFor="avatar">Choose avatar</label>
            </div>
        </div>
    )
}