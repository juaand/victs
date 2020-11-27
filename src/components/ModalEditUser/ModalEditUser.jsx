import './ModalEditUser.css'
import React, {useState} from 'react'
import {useFormState} from '../../hooks/useFormState'
import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Button/Button'
import {updateUser} from '../../services/ApiClient'


export default function ModalEditUser({onClick, user}) {

  const {state, onBlur, onChange} = useFormState(
    {
      data: {
        id: user.id,
        name: user.name,
        role: user.role,
        packages: user.packages,
        phone: user.phone,
        address: user.address,
        city: user.city,
        zipcode: user.zipcode,

      },
      error: {
        name: true,
        phone: true,
        address: true,
        city: true,
        zipcode: true,
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

    }
  )

  const {data} = state
  const [registerError, setRegisterError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await updateUser(data)

    } catch (err) {
      setRegisterError(err.response?.data?.message)
    }
  }

  const deleteUser = () => {
    console.log('user deleted')
  }

  return (
    <div className="modal ModalEditUser">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-12 modal-body">
            <div className="avatar" style={{background: `url(${user?.avatar}) no-repeat center center / cover`}}></div>
            <span className="close" onClick={onClick}></span>
            <div className="row edit-profile">
              <form className="col-12" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 profile-info">
                    <div className="row content-block">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.name}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder={data.name}
                        />
                      </div>
                    </div>
                    <div className="row content-block">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.phone}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="phone"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.phone
                              ? data.phone
                              : "Insert your phone"
                          }
                        />
                      </div>
                    </div>
                    <div className="row content-block d-flex align-items-start">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.address}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.address
                              ? data.address
                              : "Insert your address"
                          }
                        />
                        <InputWithLabel
                          value={data.city}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="city"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.city
                              ? data.city
                              : "Insert your city"
                          }
                        />
                        <InputWithLabel
                          value={data.zipcode}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="zipcode"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.zipcode
                              ? data.zipcode
                              : "Insert your zipcode"
                          }
                        />
                      </div>

                      {registerError && (
                        <div className="alert alert-danger">{registerError}</div>
                      )}
                      <div className="col-12 col-sm-6">
                        <Button className="button __yellow-btn" onClick={onClick}>
                          Edit Profile
                    </Button>
                      </div>
                      <div className="col-12 col-sm-6 d-flex justify-content-end">
                        <Button className="button __delete-btn" onClick={deleteUser}>Delete user</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
