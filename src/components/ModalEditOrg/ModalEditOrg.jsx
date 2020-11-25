import './ModalEditOrg.css'
import React, {useState} from "react"
import {useFormState} from "../../hooks/useFormState"
import InputWithLabel from "../Form/InputWithLabel/InputWithLabel"
import Button from "../Button/Button"
import {updateOrg} from "../../services/ApiClient"


export default function ModalEditOrg({onClick, user}) {
  const {state, onBlur, onChange} = useFormState(
    {
      data: {
        id: user.id,
        name: user.name,
        role: user.role,
        description: user.description,
        url: user.url,
        avatar: user.avatar,
        points: user.points,
      },
      error: {
        name: true,
        role: true,
        description: true,
        url: true,
        avatar: true,
        points: true,
      },
      touch: {},
    },
    {
      name: (v) => v.length,
      role: (v) => v.length,
      description: (v) => v.length,
      url: (v) => v.length,
      avatar: (v) => v.length,
      points: (v) => v.length,
    }
  )

  const {data} = state
  const [registerError, setRegisterError] = useState(null)


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await updateOrg(data)
    } catch (err) {
      setRegisterError(err.response?.data?.message)
    }
  }

  return (
    <div className="modal ModalEditOrg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-12 modal-body">
            <div className="avatar" style={{background: `url(${data?.avatar}) no-repeat center center / cover`}}></div>
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
                          value={data.role}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="role"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.role
                              ? data.role
                              : "Insert your role: Pyme or ONG"
                          }
                        />
                      </div>
                    </div>
                    <div className="row content-block d-flex align-items-start">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.description}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="description"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.description
                              ? data.description
                              : "Insert your description"
                          }
                        />
                        <InputWithLabel
                          value={data.url}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="url"
                          type="text"
                          className="form-control"
                          placeholder={data.url ? data.url : "Insert your url"}
                        />
                        <InputWithLabel
                          value={data.points}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="points"
                          type="text"
                          className="form-control"
                          placeholder={data.points ? data.points : "Insert the points"}
                        />
                        <InputWithLabel
                          value={data.avatar}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="avatar"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.avatar ? data.avatar : "Insert your avatar"
                          }
                        />
                      </div>

                      {registerError && (
                        <div className="alert alert-danger">
                          {registerError}
                        </div>
                      )}
                      <div className="col-12 col-sm-6">
                        <Button
                          className="button __yellow-btn"
                          onClick={onClick}
                        >
                          Edit Org
                        </Button>
                      </div>
                      <div className="col-12 col-sm-6 d-flex justify-content-end">
                        <Button className="button __delete-btn">Delete org</Button>
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
