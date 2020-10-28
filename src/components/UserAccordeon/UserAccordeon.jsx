import React from 'react'

const UserAccordeon = () => {





    return (
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
                                            {role === 'Gym' &&
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
                                                            <CheckBoxWithLabel
                                                                name="services"
                                                                data={disciplinesList}
                                                                value={data.disciplines}
                                                                onChange={getDisciplinesItems}
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
                                    {profileData.role === 'Gym' &&
                                        <div className="row content-block">
                                            <div className="col-4">
                                                <strong>Services</strong>
                                            </div>
                                            <div className="col-8">
                                                <ul>
                                                    {
                                                        console.log(props.user)
                                                    }
                                                </ul>
                                            </div>
                                        </div>
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