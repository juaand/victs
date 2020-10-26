import './MyInfo.css'
import React, {useState, useEffect} from 'react'
import InputFile from '../Form/InputFile/InputFile'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../hooks/useFormState'
import Button from '../Button/Button'
import SelectWithLabel from '../Form/SelectWithLabel/SelectWithLabel'
import {updateUser} from '../../services/ApiClient'
import {updatePassword} from '../../services/ApiClient'
import {updateUserAvatar} from '../../services/ApiClient'
import disciplines from '../../data/disciplines'
import services from '../../data/services'
import CalendarItem from '../Calendar/CalendarItem/CalendarItem'

const MyInfo = (props) => {

    const {state, onBlur, onChange, role} = useFormState(
        {
            data: {
                id: props.user.id,
                name: props.user.name,
                role: props.user.role,
                disciplines: '',
                services: '',
                quote: '',
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
    const [profileInfo, setProfileInfo] = useState(true)
    const [profileData, setProfileData] = useState(props.user)
    const [message, setMessage] = useState('')
    const [changeAvatar, setChangeAvatar] = useState(false)

    const hideProfile = () => {
        setEdit(true)
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

    const updateAvatar = () => {
        setChangeAvatar(true)
    }

    const cancelAvatarUpdate = () => {
        setChangeAvatar(false)
    }

    const updateProfile = async (event) => {
        event.preventDefault()

        try {
            await updateUser(data)
            setProfileData(data)
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

    const postUpdateAvatar = async (event) => {
        event.preventDefault()

        try {
            const avatarFile = document.querySelector('.input-file').files[0].name
            await updateUserAvatar(avatarFile, data.id)
            // setProfileData(data)
            // cancelPasswordForm()
            // document.querySelector('.message').classList.remove('d-none')
            // setMessage('Password has been update')
            // setTimeout(() => {
            //     document.querySelector('.message').classList.add('d-none')
            // }, 3000)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    useEffect(() => {
        document.querySelector('.navbar').classList.add('__grayHeader')
    }, [data])


    return (
        <>
            <div className="container-fluid acordeon-bar">
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
                                    <div className="col-12 col-sm-6 profile-info">
                                        <form onSubmit={updateProfile}>
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
                                                    <strong>Role</strong>
                                                </div>
                                                <div className="col-8">
                                                    <SelectWithLabel
                                                        name="role"
                                                        value={data.role}
                                                        onChange={onChange}
                                                        options={['Guest', 'Gym', 'Instructor']}
                                                    />
                                                </div>
                                            </div>
                                            {role === 'Gym' &&
                                                <div className="row content-block">
                                                    <div className="col-4">
                                                        <strong>Services</strong>
                                                    </div>
                                                    <div className="col-8">
                                                        <SelectWithLabel
                                                            name="services"
                                                            value={data.services}
                                                            onChange={onChange}
                                                            options={services}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                            {role === 'Instructor' &&
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
                                                                className={`form-control ${touch.quote && error.quote ? "is-invalid" : ""}`}
                                                                placeholder={props.user.quote}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row content-block">
                                                        <div className="col-4">
                                                            <strong>Disciplines</strong>
                                                        </div>
                                                        <div className="col-8">
                                                            <SelectWithLabel
                                                                name="disciplines"
                                                                value={data.disciplines}
                                                                onChange={onChange}
                                                                options={disciplines}
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            }
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
                                                        placeholder={props.user.phone}
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
                                                </div>
                                            </div>

                                            {registerError && <div className="alert alert-danger">{registerError}</div>}

                                            <Button className="button __yellow-btn" >Edit Profile</Button>

                                            <Button onClick={showProfile} className="button __yellow-btn" >Cancel</Button>
                                        </form>
                                    </div>
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
                                        <div className="row content-block">
                                            <div className="col-4">
                                                <strong>Packages</strong>
                                            </div>
                                            <div className="col-8">
                                                <span>{profileData.packages}</span>
                                            </div>
                                        </div>
                                        <div className="row content-block">
                                            <div className="col-4">
                                                <strong>Role</strong>
                                            </div>
                                            <div className="col-8">
                                                <span>{profileData.role}</span>
                                            </div>
                                        </div>
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
                                                <span>{profileData.phone}</span>
                                            </div>
                                        </div>
                                        <div className="row content-block">
                                            <div className="col-4">
                                                <strong>Address</strong>
                                            </div>
                                            <div className="col-8">
                                                <span>{profileData.address}</span> - <span>{profileData.city}</span> -
                                            <span>{profileData.zipcode}</span>
                                            </div>
                                        </div>

                                        <Button className="button __yellow-btn" onClick={hideProfile}>Edit Profile</Button>

                                        <Button className="button __yellow-btn" onClick={passwordForm}>Change password</Button>
                                    </div>
                                    <div className="col-12 col-sm-6 profile-avatar">
                                        <div className="avatar" style={{background: `url(${props.user.avatar}) no-repeat center center / cover`}}>
                                            {changeAvatar ?
                                                <>
                                                    <Button className="button __yellow-btn" onClick={postUpdateAvatar}>Update</Button>
                                                    <Button className="button cancel __yellow-btn" onClick={cancelAvatarUpdate}>Cancel</Button>
                                                </> :
                                                <Button className="button __yellow-btn" onClick={updateAvatar}>Change avatar</Button>
                                            }
                                        </div>
                                        {changeAvatar &&
                                            <div className="row content-block">
                                                <div className="col-12">
                                                    <InputFile
                                                        onChange={onChange}
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
            <div className="container my-info" >
                <div className="row">
                    <div className="col-12">
                        {getGymName(props.user.lessons).map(el =>
                            <div className="row gym-name">
                                <div className="col-4">
                                    <h1 className="big-yellow">Upcoming classes scheduled in <span>{el.gym.user.name}</span></h1>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        {Object.keys(byLessons).map(key =>
                                            key === el.gym.id ?
                                                byLessons[key].map(el =>
                                                    <CalendarItem
                                                        lessonInstructor={el.instructor.user.name}
                                                        lessonDate={el.inithour}
                                                        lessonHour={el.inithour}
                                                        lessonDiscipline={el.discipline}
                                                    />
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

