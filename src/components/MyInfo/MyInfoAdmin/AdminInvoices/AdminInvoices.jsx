import "./AdminInvoices.css"
import React from 'react'

import Header from './elements/Header/Header';
import Address from './elements/Address/Address';
import List from './elements/List/List';

export default function AdminInvoices({data}) {

const reservations = data[4]

const data2 = { 
    date: new Date().toISOString(),
    number: 1,
    recipient: {
      displayName: 'Juan Romero',
      addressLine: 'Calle Andrés de Arteaga, 12\nMadrid, Spain\n48484848-F',
    },
    emitter: {
      displayName: 'VICTS',
      addressLine: 'Matadero Street, 28010\nMadrid, Spain\nB-123123123',
    },
    list: [
      {
        name: 'November 2020 Reservations',
        quantity: 34,
        unitPrice: 150,
      },
    ],
    tax: 0.21,

};



    return (
        <div className="Invoice">
        <Header date={data2.date} number={data2.number} />
        <Address recipient={data2.recipient} emitter={data2.emitter} />
        <List list={data2.list} tax={data2.tax} />
      </div>
    )
}
