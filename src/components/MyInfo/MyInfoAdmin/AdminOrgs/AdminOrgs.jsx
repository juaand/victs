import './AdminOrgs.css'
import React, {useState} from 'react'
import OrgsItem from './OrgsItem/OrgsItem'

export default function AdminOrgs({data, onClick}) {

    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredOrgs = data.filter(guest => {
        return (
            (guest?.name?.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1 || (guest?.role?.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const addNewOrg = () => {
        console.log('add new')
    }

    return (
        <div className="container-fluid instructors-centers AdminOrgs">
            <div className="row">
                <div className="col-12 form-group">
                    <input type="text" className="form-control" placeholder="Search by user name or role" onChange={handleChange} value={search} /></div>
            </div>
            <div className="row p-0">
                {filteredOrgs.map(el =>
                    <OrgsItem onClick={(userId) => onClick(userId)} org={el} />
                )}

                <div className="org-item col-sm-2 col-6 add-new-org" onClick={() => onClick(addNewOrg)}>
                    <h1>Add new</h1>
                </div>
            </div>
        </div>
    )
}