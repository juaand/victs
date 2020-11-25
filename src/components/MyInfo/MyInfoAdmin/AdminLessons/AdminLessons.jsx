import './AdminLessons.css'
import React, {useState} from 'react'
import LessonsItem from './LessonsItem/LessonsItem'

export default function AdminLessons({data, onClick}) {

        const [search, setSearch] = useState('')
    
        const handleChange = (e) => {
            setSearch(e.target.value)
        }

        const filteredLessons = data.filter(guest => {
            console.log(guest?.instructor?.disciplines)
            return (
                (guest?.name?.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (guest?.instructor?.user?.name.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
            )
        })

    
        return (
            <div className="container-fluid instructors-centers AdminLessons">
                <div className="row">
                    <div className="col-12 form-group">
                        <input type="text" className="form-control" placeholder="Search by lesson or instructor name" onChange={handleChange} value={search} /></div>
                </div>
                <div className="row p-0">
                    {filteredLessons.map(el =>
                        <LessonsItem onClick={ (userId) => onClick(userId)} lesson={el} />
                    )}
                </div>
            </div>
        )
    }