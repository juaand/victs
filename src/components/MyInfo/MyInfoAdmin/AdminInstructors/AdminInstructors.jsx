import './AdminInstructors.css'
import React, {useState} from 'react'
import InstructorsItem from './InstructorsItem/InstructorsItem'

export default function AdminInstructors({data, onClick}) {

        const [search, setSearch] = useState('')
    
        const handleChange = (e) => {
            setSearch(e.target.value)
        }
    
        const filteredInstructors = data.filter(guest => {
            return (
                (guest?.user?.name?.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
            )
        })
    
        return (
            <div className="container-fluid instructors-centers AdminInstructors">
                <div className="row">
                    <div className="col-12 form-group">
                        <input type="text" className="form-control" placeholder="Search by coach name" onChange={handleChange} value={search} /></div>
                </div>
                <div className="row p-0">
                    {filteredInstructors.map(el =>
                        <InstructorsItem onClick={ (userId) => onClick(userId)} instructor={el} />
                    )}
                </div>
            </div>
        )
    }