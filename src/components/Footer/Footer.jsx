import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className="container-fluid">
            <div className="row">
                <div className="col-12">
                    All rights reserved ©{year} | Designed and developed by
            <strong> Andrés Martínez & Juan Romero</strong></div>
            </div>
        </footer>
    )
}
