import './GymsCenters.css'
import React, {useState, useEffect} from 'react'
import {getGyms} from '../../../services/ApiClient'
import GymItem from './Components/GymItem/GymItem'

export default function GymsCenters() {

    const [gymList, setGymList] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const result = await getGyms()
            setGymList(result)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredGyms = gymList.filter(gym => {
        return (
            (gym.user.name.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (gym.user.city.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    return (
        <div className="container-fluid margin-top gym-centers">
            <div className="row p-0">
                <div className="col-12 gyms-bg"></div>
            </div>
            <div className="row">
                <div className="col-12 form-group">
                    <input type="text" className="form-control" placeholder="Search by gym name or city" onChange={handleChange} value={search} /></div>
            </div>
            <div className="row p-0">
                {filteredGyms.map(el =>
                    <GymItem info={el} />
                )}
            </div>
        </div>
    )
}