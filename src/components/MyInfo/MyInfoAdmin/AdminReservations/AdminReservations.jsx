import React, {useState} from 'react'
import ReservationsItem from './ReservationsItem/ReservationsItem'

export default function AdminReservations({data, onClick}) {

        const [search, setSearch] = useState('')
    
        const handleChange = (e) => {
            setSearch(e.target.value)
        }

        const filteredReservations = data.filter(guest => {
            return (
                (guest?.user?.name?.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
            )
        })
    
        return (
            <div className="container-fluid margin-top instructors-centers">
                <div className="row p-0">
                    <div className="col-12 instructor-bg"></div>
                </div>
                <div className="row">
                    <div className="col-12 form-group">
                        <input type="text" className="form-control" placeholder="Search by user name" onChange={handleChange} value={search} /></div>
                </div>
                <div className="row p-0">
                    {filteredReservations.map(el =>
                        <ReservationsItem onClick={ (userId) => onClick(userId)} reservation={el} />
                    )}
                </div>
            </div>
        )
    }