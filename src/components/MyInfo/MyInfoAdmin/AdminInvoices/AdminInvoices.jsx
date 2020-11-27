import "./AdminInvoices.css"
import React from 'react'
import Header from './elements/Header/Header'
import Address from './elements/Address/Address'
import List from './elements/List/List'
import SelectWithLabel from "../../../Form/SelectWithLabel/SelectWithLabel"
import {useState} from "react"

export default function AdminInvoices({data}) {

  const reservations = data[4]
  const gyms = data[1]

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const years = [2019, 2020]

  const [monthSelected, setMonthSelected] = useState('')
  const [yearSelected, setYearSelected] = useState('')
  const [gymSelected, setGymSelected] = useState('')
  const [sameGymName, setSameGymName] = useState([])

  const filterByMonthAndYear = reservations.filter(
    (reservation) => new Date(reservation?.lesson?.date).getFullYear() === yearSelected
  )

  const checkInReservations = filterByMonthAndYear.filter(
    (reservation) => reservation?.lesson?.gym?.user?.id === sameGymName?.user?.id)

  const gymsName = gyms.map(el => el.user.name)

  const data2 = {
    date: new Date().toISOString(),
    number: `${4}`,
    recipient: {
      displayName: `${gymSelected}`,
      // addressLine: `${sameGymName && sameGymName[0]?.user?.address} \n${sameGymName && sameGymName[0]?.user?.city} \n${sameGymName && sameGymName[0]?.user?.zipcode}`,
    },
    emitter: {
      displayName: 'VICTS',
      addressLine: 'Matadero Street, 28010\nMadrid, Spain\nB-123123123',
    },
    list: [
      {
        name: `${monthSelected} ${yearSelected} Reservations`,
        quantity: `${filterByMonthAndYear?.length}`,
        unitPrice: 150,
      },
    ],
    tax: 0.21,

  }

  const changeMonth = (e) => {
    setMonthSelected(e.target.value)
  }

  const changeYear = (e) => {
    setYearSelected(e.target.value)
  }

  const changeGymName = (e) => {
    setGymSelected(e.target.value)
    setSameGymName(gyms.filter(
      (gym) => gym.user.name === gymSelected))
  }

  return (
    <div className="Invoice AdminInvoices">
      <div className="container">
        <h4>Select gym, month & year</h4>
        <div className="row">
          <div className="col-12 col-sm-4">
            <SelectWithLabel options={months} name="Month" onChange={changeMonth} />
          </div>
          <div className="col-12 col-sm-4">
            <SelectWithLabel options={years} name="Year" onChange={changeYear} />
          </div>
          <div className="col-12 col-sm-4">
            <SelectWithLabel options={gymsName} name="Gym" onChange={changeGymName} />
          </div>
        </div>
      </div>
      <div className="container-fluid header-info">
        <div className="container">
          <Header date={data2.date} number={data2.number} />
        </div>
      </div>
      <div className="container-fluid address-info">
        <div className="container">
          <Address recipient={data2.recipient} emitter={data2.emitter} />
        </div>
      </div>
      <div className="container">
        <List list={data2.list} tax={data2.tax} />
      </div>
    </div>
  )
}
