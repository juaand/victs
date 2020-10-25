import './MyInfo.css'
import React, {useState, useEffect} from 'react'
import InputFile from '../Form/InputFile/InputFile'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../hooks/useFormState'
import Button from '../Button/Button'
import SelectWithLabel from '../Form/SelectWithLabel/SelectWithLabel'
import {updateUser} from '../../services/ApiClient'
import {updatePassword} from '../../services/ApiClient'
// import {updateUserAvatar} from '../../services/ApiClient'


const MyInfo = (props) => {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: props.user.id,
                name: props.user.name,
                role: props.user.role,
                phone: props.user.phone,
                address: props.user.address,
                city: props.user.city,
                avatar: props.user.avatar,
                zipcode: props.user.zipcode,
                password: props.user.password,
                newpassword: ''
            },
            error: {
                name: true,
                phone: true,
                address: true,
                city: true,
                zipcode: true,
                password: true,
                newpassword: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            role: v => v.length,
            phone: v => v.length,
            address: v => v.length,
            city: v => v.length,
            zipcode: v => v.length,
            avatar: v => v.length,
            password: v => v.length,
            newpassword: v => v.length
        }
    )

    const {data, error, touch} = state

    const getGymName = (arr) => {
        return arr.filter((ele, ind) => ind === arr.findIndex(elem => elem.gym.user.name === ele.gym.user.name))
    }

    const byLessons = props.user.lessons.reduce((acc, e) => {
        acc[e.gym.id] = (acc[e.gym.id] || [])
        acc[e.gym.id].push(e)
        return acc
    }, {})

    const [edit, setEdit] = useState(false)
    const [passChange, setPassChange] = useState(false)
    const [registerError, setRegisterError] = useState(null)
    const [profileData, setProfileData] = useState(props.user)

    const editProfile = () => {
        setEdit(true)
    }

    const passwordForm = () => {
        setPassChange(true)
    }

    const updateProfile = async (event) => {
        console.log('UPDATE PROFILE ')
        console.log(data)

        setEdit(false)
        event.preventDefault()

        try {
            await updateUser(data)
            console.log(data)
            setProfileData(data)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    // const updateAvatar = async (event) => {
    //     console.log('UPDATE PICTURE ')
    //     setEdit(false)
    //     event.preventDefault()

    //     try {
    //         await updateUserAvatar(data)
    //     } catch (err) {
    //         setRegisterError(err.response?.data?.message)
    //     }
    // }

    const updateAvatar = () => {
        console.log('hola')
    }

    const updatePass = async (event) => {
        console.log(`UPDATE PASSWORD ${JSON.stringify(data)}`)

        setPassChange(false)
        event.preventDefault()

        try {
            await updatePassword(data)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    useEffect(() => {
        document.querySelector('.navbar').classList.add('__grayHeader')
    }, [])


    return (
        <>
            <div className="container-fluid acordeon-bar">
                <a className="acordeon-toggle" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <h1>{profileData.name}
                        <span className="role">{profileData.role}</span>
                    </h1>
                </a>


                <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                        <div className="container">
                            {edit ?
                                <>
                                    <form onSubmit={updateProfile}>

                                        <InputWithLabel
                                            value={data.name}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="name"
                                            type="text"
                                            className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                            placeholder={props.user.name}
                                        />


                                        <SelectWithLabel
                                            name="role"
                                            value={data.role}
                                            onChange={onChange}
                                        />

                                        <InputWithLabel
                                            value={data.phone}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="phone"
                                            type="text"
                                            className={`form-control ${touch.phone && error.phone ? "is-invalid" : ""}`}
                                            placeholder={props.user.phone}
                                        />
                                        <InputWithLabel
                                            value={data.address}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="address"
                                            type="text"
                                            className={`form-control ${touch.address && error.address ? "is-invalid" : ""}`}
                                            placeholder={props.user.address}
                                        />
                                        <InputWithLabel
                                            value={data.city}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="city"
                                            type="text"
                                            className={`form-control ${touch.city && error.city ? "is-invalid" : ""}`}
                                            placeholder={props.user.city}
                                        />
                                        <InputWithLabel
                                            value={data.zipcode}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="zipcode"
                                            type="text"
                                            className={`form-control ${touch.zipcode && error.zipcode ? "is-invalid" : ""}`}
                                            placeholder={props.user.zipcode}
                                        />

                                        <InputFile
                                            onChange={onChange}
                                            name="avatar"
                                            type="file"
                                            className="form-control"
                                        />

                                        {registerError && <div className="alert alert-danger">{registerError}</div>}

                                        <Button
                                            type="submit"
                                            className="Button Button__enter"
                                        >Update</Button>
                                    </form>
                                    <form onSubmit={updateAvatar}>
                                        <div className="avatar" style={{background: `url(${props.user.avatar}) no-repeat center center / cover`}}>
                                            <Button
                                                type="submit"
                                                className="Button Button__enter"
                                            >Update</Button></div>
                                    </form>
                                </>
                                :
                                <div className="row">
                                    <div className="col-12 col-sm-6 profile-info">
                                        <p><strong>Name</strong> {profileData.name}</p>
                                        <p><strong>Packages</strong> {profileData.packages}</p>
                                        <p><strong>Role</strong> {profileData.role}
                                        </p>
                                        <p><strong>Email</strong> {props.user.email}</p>
                                        <p><strong>Phone</strong> {profileData.phone}</p>
                                        <p><strong>Address</strong> {profileData.address} - {profileData.city} - {profileData.zipcode}</p>

                                        <Button className="button __yellow-btn" onClick={editProfile}>Edit Profile</Button>

                                        <Button className="button __yellow-btn" onClick={passwordForm}>Change password</Button>
                                    </div>
                                    <div className="col-12 col-sm-6 profile-avatar">
                                        <div className="avatar" style={{background: `url(${props.user.avatar}) no-repeat center center / cover`}}>
                                            <Button className="button __yellow-btn __avatar-upd" onClick={updateAvatar}>update avatar</Button>
                                        </div>
                                    </div>
                                </div>
                            }

                            {passChange ?
                                <>
                                    <form onSubmit={updatePass}>

                                        <InputWithLabel
                                            value={data.password}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="password"
                                            type="password"
                                            className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                            placeholder={props.user.password}
                                        />

                                        <InputWithLabel
                                            value={data.newpassword}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="newpassword"
                                            type="password"
                                            className={`form-control ${touch.newpassword && error.newpassword ? "is-invalid" : ""}`}
                                            placeholder={props.user.newpassword}
                                        />

                                        <Button
                                            type="submit"
                                            className="Button Button__enter"
                                        >Update password</Button>
                                    </form>
                                </>
                                :
                                ''
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-info" >
                <div className="row">
                    <div className="col-12">
                        {getGymName(props.user.lessons).map(el =>
                            <div className="row gym-name">
                                <div className="col-4">
                                    {el.gym.user.name}
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        {Object.keys(byLessons).map(key =>
                                            key === el.gym.id ?
                                                byLessons[key].map(el =>
                                                    <div className="col-3">
                                                        {el.name}
                                                    </div>
                                                ) : ''
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyInfo

