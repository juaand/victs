import './InstructorCenter.css'
import React, {useState, useEffect} from 'react'
import {getInstructors} from '../../../services/ApiClient'
import InstructorItem from './InstructorItem/InstructorItem'

export default function InstructorCenter() {

    const [instructorList, setInstructorList] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const result = await getInstructors()
            setInstructorList(result)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredInstructors = instructorList.filter(coach => {
        return (
            (coach.user.name.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    return (
        <div className="container-fluid margin-top instructors-centers">
            <div className="row p-0">
                <div className="col-12 instructor-bg"></div>
            </div>
            <div className="row">
                <div className="col-12 form-group">
                    <input type="text" className="form-control" placeholder="Search by coach name" onChange={handleChange} value={search} /></div>
            </div>
            <div className="row p-0">
                {filteredInstructors.map(el =>
                    <InstructorItem info={el} />
                )}
            </div>
        </div>
    )
}