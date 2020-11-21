import './UserAccordeon.css'
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../hooks/useFormState'
import {updateUser} from '../../services/ApiClient'
import {updatePassword} from '../../services/ApiClient'
import {updateUserAvatar} from '../../services/ApiClient'
import {getDisciplines} from '../../services/ApiClient'
import {getServices} from '../../services/ApiClient'
import InputFile from '../Form/InputFile/InputFile'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Button/Button'
import CheckBoxWithLabel from '../Form/CheckBoxWithLabel/CheckBoxWithLabel'

const UserAccordeon = (props) => {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: props.user.id,
                name: props.user.name,
                role: props.user.role,
                disciplines: [],
                services: [],
                quote: '',
                iban: props.user?.iban,
                packages: props.user.packages,
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
            disciplines: v => v.length,
            quote: v => v.quote,
            iban: v => v.iban,
            services: v => v.length,
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

    const [edit, setEdit] = useState(false)
    const [passChange, setPassChange] = useState(false)
    const [registerError, setRegisterError] = useState(null)
    const [profileInfo, setProfileInfo] = useState(true)
    const [profileData, setProfileData] = useState(data)
    const [gymData, setGymData] = useState(props.gymInfo)
    const [instructorData, setInstructorData] = useState(props.instructorInfo)
    const [message, setMessage] = useState('')
    const [changeAvatar, setChangeAvatar] = useState(false)
    const [disciplinesList, setDisciplinesList] = useState([])
    const [servicesList, setServicesList] = useState([])

    const hideProfile = () => {
        setEdit(!edit)
        setProfileInfo(false)
    }

    const showProfile = () => {
        setEdit(false)
        setProfileInfo(true)
    }

    const passwordForm = () => {
        setPassChange(true)
        setProfileInfo(false)
    }

    const cancelPasswordForm = () => {
        setPassChange(false)
        setProfileInfo(true)
    }

    const hideUpdateAvatar = () => {
        setChangeAvatar(false)
    }

    const updateAvatar = () => {
        setChangeAvatar(true)
    }

    const cancelAvatarUpdate = () => {
        setChangeAvatar(false)
    }

    const removeDisabled = () => {
        document.querySelector('.disabled').classList.remove('disabled')
    }

    const updatePass = async (event) => {
        event.preventDefault()

        try {
            await updatePassword(data)
            setProfileData(data)
            cancelPasswordForm()
            document.querySelector('.message').classList.remove('d-none')
            setMessage('Password has been update')
            setTimeout(() => {
                document.querySelector('.message').classList.add('d-none')
            }, 3000)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const updateProfile = async (event) => {
        event.preventDefault()

        try {
            await updateUser(data)
                .then(user => {
                    setProfileData(user[0])
                    setGymData(user[1])
                    setInstructorData(user[2])
                })
            showProfile()
            document.querySelector('.message').classList.remove('d-none')
            setMessage('User has been update')
            setTimeout(() => {
                document.querySelector('.message').classList.add('d-none')
            }, 3000)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const postAvatar = async (event) => {
        event.preventDefault()

        try {
            const avatarFile = document.querySelector('.input-file')
            data.avatar = avatarFile.files[0]

            await updateUserAvatar(data.avatar, data.id)
                .then(user => {
                    setProfileData(user)
                })
            hideUpdateAvatar()
            document.querySelector('.message').classList.remove('d-none')
            setMessage('Avatar has been updated')
            setTimeout(() => {
                document.querySelector('.message').classList.add('d-none')
            }, 3000)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const getServicesItems = (e) => {
        let newArray = [...data.services, e.target.id]
        if (data.services.includes(e.target.id)) {
            newArray = newArray.filter(el => el !== e.target.id)
        }
        data.services = newArray
    }

    const getDisciplinesItems = (e) => {
        let newArray = [...data.disciplines, e.target.id]
        if (data.disciplines.includes(e.target.id)) {
            newArray = newArray.filter(el => el !== e.target.id)
        }
        data.disciplines = newArray
    }

    useEffect(() => {
        setProfileData(data)
    }, [data])

    useEffect(() => {
        getDisciplines()
            .then(res => {
                setDisciplinesList(res)
            })
    }, [data.disciplines])

    useEffect(() => {
        getServices()
            .then(res => {
                setServicesList(res[0])
            })
    }, [data.services])

    return (
        <div className="container-fluid acordeon-bar margin-top">
            <a className="acordeon-toggle" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                <h1 className="profile-title">{profileData.name}
                    <span className="role">{profileData.role}</span>
                </h1>
            </a>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <div className="container">
                        <div className="message d-none">{message ? message : ''}</div>
                        <div className="close" data-toggle="collapse" href="#collapseExample" aria-expanded="true" aria-controls="collapseExample"></div>
                        {edit &&
                            <div className="row edit-profile">
                                <form className="col-12" onSubmit={updateProfile}>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 profile-info">
                                            <div className="row content-block">
                                                <div className="col-4">
                                                    <strong>Name</strong>
                                                </div>
                                                <div className="col-8">
                                                    <InputWithLabel
                                                        value={data.name}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="name"
                                                        type="text"
                                                        className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                                        placeholder={props.user.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row content-block">
                                                <div className="col-4">
                                                    <strong>Phone</strong>
                                                </div>
                                                <div className="col-8">
                                                    <InputWithLabel
                                                        value={data.phone}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="phone"
                                                        type="text"
                                                        className={`form-control ${touch.phone && error.phone ? "is-invalid" : ""}`}
                                                        placeholder={props.user.phone ? props.user.phone : 'Insert your phone'}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row content-block d-flex align-items-start">
                                                <div className="col-4">
                                                    <strong>Address</strong>
                                                </div>
                                                <div className="col-8">
                                                    <InputWithLabel
                                                        value={data.address}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="address"
                                                        type="text"
                                                        className={`form-control ${touch.address && error.address ? "is-invalid" : ""}`}
                                                        placeholder={props.user.address ? props.user.address : 'Insert your address'}
                                                    />
                                                    <InputWithLabel
                                                        value={data.city}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="city"
                                                        type="text"
                                                        className={`form-control ${touch.city && error.city ? "is-invalid" : ""}`}
                                                        placeholder={props.user.city ? props.user.city : 'Insert your city'}
                                                    />
                                                    <InputWithLabel
                                                        value={data.zipcode}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="zipcode"
                                                        type="text"
                                                        className={`form-control ${touch.zipcode && error.zipcode ? "is-invalid" : ""}`}
                                                        placeholder={props.user.zipcode ? props.user.zipcode : 'Insert your zipcode'}
                                                    />
                                                </div>
                                            </div>

                                            {registerError && <div className="alert alert-danger">{registerError}</div>}

                                            <Button className="button __yellow-btn" >Edit Profile</Button>

                                            <Button onClick={showProfile} className="button __yellow-btn" >Cancel</Button>

                                        </div>
                                        <div className="col-12 col-sm-6 profile-info">
                                            {(props.user.role === 'Gym') &&
                                                <>
                                                    <div className="row content-block d-flex align-items-start">
                                                        <div className="col-4">
                                                            <strong className="mt-5">Services</strong>
                                                        </div>
                                                        <div className="col-8">
                                                            <CheckBoxWithLabel
                                                                name="services"
                                                                data={servicesList}
                                                                value={data.services}
                                                                onChange={getServicesItems}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row content-block">
                                                        <div className="col-4">
                                                            <strong>IBAN</strong>
                                                        </div>
                                                        <div className="col-8">
                                                            <InputWithLabel
                                                                value={data.iban}
                                                                onBlur={onBlur}
                                                                onChange={onChange}
                                                                name="iban"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder={props.user.iban}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {(props.user.role === 'Instructor') &&
                                                <>
                                                    <div className="row content-block">
                                                        <div className="col-4">
                                                            <strong>Quote</strong>
                                                            <small className="d-block">A phrase you indentify with</small>
                                                        </div>
                                                        <div className="col-8">
                                                            <InputWithLabel
                                                                value={data.quote}
                                                                onBlur={onBlur}
                                                                onChange={onChange}
                                                                name="quote"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder={props.user.quote}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row content-block">
                                                        <div className="col-4">
                                                            <strong>Disciplines</strong>
                                                        </div>
                                                        <div className="col-8">
                                                            <CheckBoxWithLabel
                                                                name="disciplines"
                                                                data={disciplinesList[0]}
                                                                value={data.disciplines}
                                                                onChange={getDisciplinesItems}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row content-block">
                                                        <div className="col-4">
                                                            <strong>IBAN</strong>
                                                        </div>
                                                        <div className="col-8">
                                                            <InputWithLabel
                                                                value={data.iban}
                                                                onBlur={onBlur}
                                                                onChange={onChange}
                                                                name="iban"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder={props.user.iban}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }

                        {passChange &&
                            <div className="row edit-profile">
                                <div className="col-12 col-sm-6 profile-info">
                                    <form onSubmit={updatePass}>
                                        <div className="row content-block">
                                            <div className="col-4">
                                                <strong>Current Password</strong>
                                            </div>
                                            <div className="col-8">
                                                <InputWithLabel
                                                    value={data.password}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    name="password"
                                                    type="password"
                                                    className={`form-control ${touch.password && error.password ? "is-invalid" : ""}`}
                                                    placeholder={props.user.password}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <strong>New Password</strong>
                                            </div>
                                            <div className="col-8">

                                                <InputWithLabel
                                                    value={data.newpassword}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    name="newpassword"
                                                    type="password"
                                                    className={`form-control ${touch.newpassword && error.newpassword ? "is-invalid" : ""}`}
                                                    placeholder={props.user.newpassword}
                                                />
                                            </div>
                                        </div>

                                        {registerError && <div className="alert alert-danger">{registerError}</div>}

                                        <Button className="button __yellow-btn" >Change Password</Button>

                                        <Button onClick={cancelPasswordForm} className="button __yellow-btn" >Cancel</Button>
                                    </form>
                                </div>
                            </div>
                        }


                        {profileInfo &&
                            <div className="row profile-info">
                                <div className="col-12 col-sm-6">
                                    <div className="row content-block">
                                        <div className="col-4">
                                            <strong>Name</strong>
                                        </div>
                                        <div className="col-8">
                                            <span>{profileData.name}</span>
                                        </div>
                                    </div>
                                    {!props.user.role === 'Guest' &&
                                        <div className="row content-block">
                                            <div className="col-4">
                                                <strong>Packages</strong>
                                            </div>
                                            <div className="col-8">
                                                <span>{profileData.packages}</span>
                                            </div>
                                        </div>
                                    }
                                    <div className="row content-block">
                                        <div className="col-4">
                                            <strong>Role</strong>
                                        </div>
                                        <div className="col-8">
                                            <span>{profileData.role}</span>
                                        </div>
                                    </div>
                                    {profileData.role === 'Gym' &&
                                        <div className="row content-block">
                                            <div className="col-4">
                                                <strong>Services</strong>
                                            </div>
                                            <div className="col-8">
                                                {
                                                    gymData &&
                                                    gymData.services.map(el => <p>{el}, </p>)
                                                }
                                            </div>
                                        </div>
                                    }
                                    {profileData.role === 'Instructor' &&
                                        <>
                                            <div className="row content-block">
                                                <div className="col-4">
                                                    <strong>Disciplines</strong>
                                                </div>
                                                <div className="col-8">
                                                    {
                                                        instructorData &&
                                                        instructorData.disciplines.map(el => <p>{el}, </p>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="row content-block">
                                                <div className="col-4">
                                                    <strong>Quote</strong>
                                                </div>
                                                <div className="col-8">
                                                    <p>"{instructorData.quote}"</p>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <div className="row content-block">
                                        <div className="col-4">
                                            <strong>Email</strong>
                                        </div>
                                        <div className="col-8">
                                            <span>{props.user.email}</span>
                                        </div>
                                    </div>
                                    <div className="row content-block">
                                        <div className="col-4">
                                            <strong>Phone</strong>
                                        </div>
                                        <div className="col-8">
                                            <span>{profileData.phone ? profileData.phone : 'No phone provided'}</span>
                                        </div>
                                    </div>
                                    <div className="row content-block">
                                        <div className="col-4">
                                            <strong>Address</strong>
                                        </div>
                                        <div className="col-8">
                                            {profileData.address ?
                                                <>
                                                    <span>{profileData.address}</span>
                                                    <br />
                                                    <span>{profileData.city}</span> - <span>{profileData.zipcode}</span>
                                                </>
                                                : 'No address provided'}
                                        </div>
                                    </div>

                                    <Button className="button __yellow-btn" onClick={hideProfile}>Edit Profile</Button>

                                    <Button className="button __yellow-btn" onClick={passwordForm}>Change password</Button>
                                </div>
                                <div className="col-12 col-sm-6 profile-avatar">
                                    <div className="avatar" style={{background: `url(${profileData.avatar ? profileData.avatar : 'https://res.cloudinary.com/dutvbml2i/image/upload/v1603784830/victs/foto-perfil.jpg'}) no-repeat center center / cover`}}>
                                        {changeAvatar ?
                                            <>
                                                <Button className="button __yellow-btn disabled" onClick={postAvatar}>Update</Button>
                                                <Button className="button cancel __yellow-btn" onClick={cancelAvatarUpdate}>Cancel</Button>
                                            </> :
                                            <Button className="button center __yellow-btn" onClick={updateAvatar}>Change avatar</Button>
                                        }
                                    </div>
                                    {changeAvatar &&
                                        <div className="row content-block">
                                            <div className="col-12">
                                                <InputFile
                                                    onChange={removeDisabled}
                                                    name="avatar"
                                                    type="file"
                                                    className="form-control input-file"
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccordeon