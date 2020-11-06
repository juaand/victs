import React from 'react'

export default function Footer() {

const year = new Date().getFullYear()

    return (
        <footer>
            All rights reserved ©{year} | Designed and developed by
            <strong> Andrés Martínez & Juan Romero</strong>
        </footer>
    )
}
