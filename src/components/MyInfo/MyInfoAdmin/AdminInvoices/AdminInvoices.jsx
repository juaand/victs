import "./AdminInvoices.css"
import React, { useEffect } from 'react'
import Header from './elements/Header/Header';
import Address from './elements/Address/Address';
import List from './elements/List/List';
import SelectWithLabel from "../../../Form/SelectWithLabel/SelectWithLabel";
import { useState } from "react";

export default function AdminInvoices({data}) {

const reservations = data[4]
const gyms = data[1]


console.log(reservations)
console.log(gyms)

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = [2019, 2020]

const [monthSelected, setMonthSelected] = useState('')
const [yearSelected, setYearSelected] = useState('')
const [gymSelected, setGymSelected] = useState('')
const [invoiceNumberSelected, setinvoiceNumberSelected] = useState('')
const [sameGymName, setSameGymName] = useState('')

const filterByMonthAndYear = reservations.filter(
  (reservation) => new Date(reservation?.lesson?.date).getFullYear() == yearSelected 
  )
  
console.log(filterByMonthAndYear)
console.log(sameGymName)

const checkInReservations = filterByMonthAndYear.filter(
  (reservation) => reservation?.lesson?.gym?.user?.id == sameGymName?.user?.id )

console.log(checkInReservations)

const gymsName = gyms.map(el => el.user.name)

const data2 = { 
    date: new Date().toISOString(),
    number: `${invoiceNumberSelected}`,
    recipient: {
      displayName: `${gymSelected}`,
      addressLine: `${sameGymName[0]?.user?.address},\n${sameGymName[0]?.user?.city},\n${sameGymName[0]?.user?.zipcode},\n${sameGymName[0]?.user?.iban}`,
    },
    emitter: {
      displayName: 'VICTS',
      addressLine: 'Matadero Street, 28010\nMadrid, Spain\nB-123123123',
    },
    list: [
      {
        name: `${monthSelected} ${yearSelected} Reservations`,
        quantity: `${checkInReservations?.length}`,
        unitPrice: 150,
      },
    ],
    tax: 0.21,

};

  const changeMonth = (e) => {
    setMonthSelected(e.target.value)
  }

  const changeYear = (e) => {
    setYearSelected(e.target.value)
  }
  
  
  
  const changeGymName = async (e) => {
    setGymSelected(e.target.value)
    const newGym = await gyms.filter(
      (gym) => gym.user.name == gymSelected
    )
    setSameGymName(newGym)
  }

  // useEffect(() => {
  //   const fetchData = () => {
  //     setSameGymName(newGym)
  //   }
  //   fetchData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])  

  console.log(sameGymName[0]?.user?.address)

    return (
        <div className="Invoice">
         <div className="container"> 
         <SelectWithLabel options={months} onChange={changeMonth} />
         <SelectWithLabel options={years} onChange={changeYear} />
         <SelectWithLabel options={gymsName} onChange={changeGymName} />
        <Header date={data2.date} number={data2.number} />
        <Address recipient={data2.recipient} emitter={data2.emitter} />
        <List list={data2.list} tax={data2.tax} />
        </div>
      </div>
    )
}
