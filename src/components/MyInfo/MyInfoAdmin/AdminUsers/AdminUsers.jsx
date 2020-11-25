import React, {useState} from 'react'
import UserItem from './UserItem/UserItem'

export default function AdminUsers({data, onClick}) {

        const [search, setSearch] = useState('')
    
        const handleChange = (e) => {
            setSearch(e.target.value)
        }

        const filteredUsers = data.filter(guest => {
            return (
                (guest?.name?.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
            )
        })
    
        return (
            <div className="container-fluid instructors-centers">
                <div className="row">
                    <div className="col-12 form-group">
                        <input type="text" className="form-control" placeholder="Search by user name" onChange={handleChange} value={search} /></div>
                </div>
                <div className="row p-0">
                    {filteredUsers.map(el =>
                        <UserItem onClick={ (userId) => onClick(userId)} user={el} />
                    )}
                </div>
            </div>
        )
    }